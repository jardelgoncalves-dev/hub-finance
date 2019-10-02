FROM node:10

ADD . src
WORKDIR /src

RUN npm i --silent
CMD ["yarn", "start"]
EXPOSE 3000