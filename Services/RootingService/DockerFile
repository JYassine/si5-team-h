FROM keymetrics/pm2:latest-alpine

COPY . ./
COPY package.json .
COPY pm2.json .

RUN npm install --production

COPY . ./

CMD [ "pm2-runtime", "start", "pm2.json"]