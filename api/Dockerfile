FROM node:18.17.1-alpine

COPY package*.json ./

RUN apk add --no-cache bash
RUN wget -O ./bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x ./bin/wait-for-it.sh

RUN npm install

# If you are building your code for production
# RUN npm ci --omit=dev

COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]