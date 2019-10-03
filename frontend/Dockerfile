FROM node:10

ADD . src
WORKDIR /src

RUN yarn install
CMD ["yarn", "start"]
EXPOSE 3000