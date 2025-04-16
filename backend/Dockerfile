FROM node:22-alpine
WORKDIR /app-backend

COPY package*.json .
RUN npm i

COPY . .

CMD [ "npm", "start" ]