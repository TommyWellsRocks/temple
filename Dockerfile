FROM node:22.2

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY ./src ./src

CMD [ "node", "app.js" ]