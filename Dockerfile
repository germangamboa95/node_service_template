FROM node:12-alpine AS BUILD_IMAGE

RUN apk update && apk add yarn curl bash python g++ make && rm -rf /var/cache/apk/*

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build 

RUN npm prune --production

RUN /usr/local/bin/node-prune


FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/package.json ./package.json 
COPY --from=BUILD_IMAGE /usr/src/app/build ./build
COPY --from=BUILD_IMAGE /usr/src/app/src ./src
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules

