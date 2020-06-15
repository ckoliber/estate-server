FROM node:alpine

WORKDIR /opt/app

COPY ./package.json .
COPY ./npm-shrinkwrap.json .

RUN npm ci

COPY ./dist ./dist
COPY ./test ./test
COPY ./public ./public
COPY ./index.js ./index.js
COPY ./.env.example ./.env
COPY ./.env.test ./.env.test
COPY ./.env.example ./.env.example

CMD npm run migrate

ENTRYPOINT [ "/usr/local/bin/npm", "start" ]