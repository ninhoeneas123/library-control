
FROM node  

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm

COPY . .

EXPOSE 3001

CMD ["npm", "start"]