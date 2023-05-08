# Dockerfile for the inQuiry portal setup
FROM node:14.21.3-slim
WORKDIR /app
COPY . .
RUN npm i
RUN npm run deploy
WORKDIR /app/server
RUN npm i
EXPOSE 3000
CMD [ "node", "index.js" ]
