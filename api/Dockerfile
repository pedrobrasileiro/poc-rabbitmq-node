FROM node:18.17.1-alpine

COPY package*.json ./
RUN npm install
# If you are building your code for production
RUN npm ci --omit=dev
# Bundle app source
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]