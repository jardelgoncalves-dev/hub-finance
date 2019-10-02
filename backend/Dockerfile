FROM node:10

ADD . src
WORKDIR /src

RUN npm i --silent
CMD ["yarn", "dev"]
EXPOSE 3333