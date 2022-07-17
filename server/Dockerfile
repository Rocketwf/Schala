FROM node:16-alpine3.15 as build
RUN mkdir -p /schala/server
RUN npm i --loglevel=error --location=global typescript

WORKDIR /schala/server
COPY server/ .
RUN yarn
RUN tsc

EXPOSE $NODE_PORT
CMD ["node", "dist/index.js"]