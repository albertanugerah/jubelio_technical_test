FROM node:16-alpine

WORKDIR /app
COPY package.json /app

RUN npm install
RUN npm run test
COPY . .
EXPOSE 5000
CMD ["nodemon", "src/app.js"]
