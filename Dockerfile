FROM node:10.15

RUN mkdir /app
COPY package.json /app
RUN cd /app && npm i

COPY * /app/

ENTRYPOINT node