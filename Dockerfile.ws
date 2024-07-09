FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4000

CMD ["node", "src/service/real-time.js"]
