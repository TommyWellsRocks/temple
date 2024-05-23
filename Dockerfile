FROM node:22.2

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY ./src ./src

EXPOSE 3000

CMD [ "node", "app.js" ]