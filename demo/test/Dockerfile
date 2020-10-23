FROM node:12-alpine
WORKDIR /src
EXPOSE 3010
COPY . /src

RUN npm install

CMD ["npm", "test"]
