FROM ubuntu:kinetic

RUN apt update -y
RUN apt upgrade -y
RUN apt install -y curl

RUN curl -fsSL http://deb.nodesource.com/setup_19.x | bash - &&\
apt install -y nodejs

RUN npm i yarn -g
RUN yarn install

RUN mkdir xap
WORKDIR /xap

COPY . /xap

EXPOSE 3000

CMD ["node", "app.js"]
