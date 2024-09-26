# syntax=docker/dockerfile:1.4
FROM node:20-alpine
#RUN npm install -g serve
WORKDIR /app
COPY package*.json ./
RUN npm install
#RUN export NODE_OPTIONS=--openssl-legacy-provider
COPY . .
#RUN npm run build
CMD [ "npm", "start" ]