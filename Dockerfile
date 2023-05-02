FROM node:14-alpine
RUN apk add --no-cache sqlite
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4520
CMD [ "npm", "run", "deploy" ]
