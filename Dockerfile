FROM node:8

WORKDIR /bubbles-frontend

COPY . /bubbles-frontend

EXPOSE 3000

CMD ["sh","-c","npm install && npm start"]
