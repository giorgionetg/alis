FROM node:22

WORKDIR /home/node

COPY package.json /home/node/

RUN yarn install

COPY . .

EXPOSE 4321

CMD ["yarn", "dev", "--host"]

#CMD ["tail", "-f", "/dev/null"] 