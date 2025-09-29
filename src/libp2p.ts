import { createLibp2p, type Libp2p } from 'libp2p';
import { webRTC } from '@libp2p/webrtc';
import { webSockets } from '@libp2p/websockets';
import { yamux } from '@libp2p/yamux';
import { multiaddr } from '@multiformats/multiaddr';
import { noise } from '@libp2p/noise';
import { peerIdFromString } from '@libp2p/peer-id';
import { identify } from '@libp2p/identify';
import { pipe } from 'it-pipe'
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2';

import type { Stream } from '@libp2p/interface-connection'

declare global {
  interface Window {
    callBackend: typeof callBackend;
  }
}

function normalizeStream(streamLike: any) {
  if (!streamLike) throw new Error("❌ Stream non valido")

  // Caso moderno (il tuo: libp2p >= 0.40)
  if (typeof streamLike.sink === "function" && streamLike.source) {
    console.log("👉 Stream moderno rilevato (sink/source diretti)")
    return streamLike
  }

  // Caso legacy (vecchie versioni libp2p <= 0.39)
  if (streamLike.duplex &&
      typeof streamLike.duplex.sink === "function" &&
      streamLike.duplex.source) {
    console.log("👉 Stream legacy rilevato (duplex)")
    return streamLike.duplex
  }

  console.error("⚠️ Stream shape sconosciuta:", streamLike)
  throw new Error("Unsupported stream shape")
}

function getDuplex(s: any) {
  if (!s) throw new Error("Stream undefined/null")

  // Caso classico
  if (typeof s.sink === "function" && s.source) return s

  // Caso con .stream o .duplex
  if (s.stream?.sink && s.stream?.source) return s.stream
  if (s.duplex?.sink && s.duplex?.source) return s.duplex

  // Caso con write/read
  if (typeof s.write === "function" && typeof s.read === "function") {
    return {
      sink: async (src: AsyncIterable<Uint8Array>) => {
        for await (const chunk of src) await s.write(chunk)
      },
      source: (async function* () {
        let msg
        while ((msg = await s.read()) != null) yield msg
      })()
    }
  }

  console.error("🔎 Stream shape sconosciuta:", s)
  throw new Error("❌ Stream non valido")
}



function unwrapStream(ret: any) {
  // { stream, protocol } oppure direttamente lo stream
  const s = ret?.stream ?? ret
  // alcune versioni espongono .duplex; altre direttamente sink/source
  return s?.duplex ?? s
}

// Invia un Uint8Array e ricevi la risposta come stringa (gestisce sink/source o write/read)
async function sendAndRecv(streamLike: any, data: Uint8Array): Promise<string> {
  const s = unwrapStream(streamLike)
  const dec = new TextDecoder()

  // Caso classico: sink/source
  if (typeof s?.sink === 'function' && s?.source) {
    await s.sink((async function* () { yield data })())
    let res = ''
    for await (const chunk of s.source) res += dec.decode(chunk)
    return res
  }

  // Alcune build espongono write/read
  if (typeof s?.write === 'function' && typeof s?.read === 'function') {
    await s.write(data)
    const out = await s.read()
    return dec.decode(out)
  }

  console.log('🔎 Stream shape sconosciuta:', Object.keys(s ?? {}))
  throw new Error('Unsupported stream shape')
}

let node: Libp2p | null = null

const pRelay = '12D3KooWG7mXyDbBxkFDF8218RwR6yV44jCAmWNYKaUtxB7kdyEN';
const pDest = '12D3KooWJWdPv8zJVrpYShjFbovHpHDCZUo4CYCXZnM5gsChxiRU';

export async function initLibp2p() {
  node = await createLibp2p({
    transports: [
      circuitRelayTransport(),
      webRTC(),
      webSockets() 
    ],
    connectionEncrypters: [noise()],
    streamMuxers: [yamux()],
    /*addresses: {
      announce: [
        //'/dns4/relay.libp2p.io/tcp/443/wss/p2p/QmRelay/p2p-circuit/p2p/QmDestPeer',
        `/dns4/localhost/tcp/4003/ws/p2p/${pRelay}/p2p-circuit/p2p/${pDest}`
      ]
    },*/
    services: {
      identify: identify()
    }
  })

  await node.start();
  console.log("✅ Peer browser avviato:", node.peerId.toString());
  const relayAddr = `/dns4/localhost/tcp/4003/ws/p2p/${pRelay}`; ///p2p-circuit/p2p/${pDest}`
  //await node.dial(multiaddr('/ip4/127.0.0.1/tcp/4003/ws/p2p/12D3KooWG7mXyDbBxkFDF8218RwR6yV44jCAmWNYKaUtxB7kdyEN'))
  


  return node;
}

export async function callBackend (peerAddr: string, payload: any = { ping: 'ping' }) {

  if (!node) throw new Error("❌ Libp2p non inizializzato")

  const addr = multiaddr(peerAddr)

  const { stream, protocol } = await node.dialProtocol(addr, '/ping/1.0.0') as any

if (stream) {
  throw new Error("❌ Il peer non supporta il protocollo /ping/1.0.0")
}

console.log("✅ Stream aperto con protocollo:", protocol)


console.log("✅ Stream aperto")

  console.log('✅ Connessione stabilita con protocollo:', protocol ?? '/ping/1.0.0')

const encoder = new TextEncoder()
const decoder = new TextDecoder()

let response = ''

await pipe(
  [encoder.encode('ping')],   // sorgente: array → async iterable
  stream,                     // duplex stream { source, sink }
  async function (source) {   // consumer
    for await (const chunk of source) {
      response += decoder.decode(chunk)
    }
  }
)

console.log('📩 Risposta dal server:', response)


}

window.callBackend = callBackend