FROM node:22-alpine

WORKDIR /usr/src/front-app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npm run postinstall

EXPOSE 9000

CMD ["sh", "./docker-entrypoint.sh"]
