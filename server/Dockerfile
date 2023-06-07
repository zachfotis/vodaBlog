FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev

RUN npm run build

COPY ./build .

EXPOSE 3001

CMD ["node",  "index.js"]