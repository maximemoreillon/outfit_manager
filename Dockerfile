FROM node:16
WORKDIR /usr/src/app
COPY . .
RUN ls -al
RUN npm install
EXPOSE 80
CMD [ "node", "index.js" ]
