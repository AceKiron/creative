FROM node:22-alpine
WORKDIR /app-frontend

COPY package*.json .
RUN npm i

COPY . .

RUN npm run build

CMD [ "npx", "serve", "-s", "dist" ]