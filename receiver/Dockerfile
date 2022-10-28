FROM node:16
WORKDIR /urs/src/app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 4002
CMD ["node", "dist/app.js"]