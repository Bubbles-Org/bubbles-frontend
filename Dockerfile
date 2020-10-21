FROM node:8

WORKDIR /bubbles-frontend

COPY . /bubbles-frontend

RUN \
    apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y curl htop man unzip vim nano wget net-tools && \
    apt-get update

EXPOSE 3000

CMD ["sh","-c","npm install && npm start"]
