FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev

COPY ./build .

EXPOSE 3001

CMD ["node",  "index.js"]