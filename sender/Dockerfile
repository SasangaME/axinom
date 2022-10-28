FROM node:16
WORKDIR /urs/src/app
COPY . .
RUN npm install
EXPOSE 4001
CMD ["node", "dist/app.js"]