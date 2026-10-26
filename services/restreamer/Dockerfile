FROM node:20-alpine

RUN apk add --no-cache ffmpeg

WORKDIR /app
COPY package.json server.js ./

ENV NODE_ENV=production \
    DATA_DIR=/data \
    PORT=8080

VOLUME ["/data"]
EXPOSE 8080

USER node
CMD ["node", "server.js"]
