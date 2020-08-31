FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
