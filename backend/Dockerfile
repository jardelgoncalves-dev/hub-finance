FROM node:10

ADD . src
WORKDIR /src

RUN yarn install
CMD ["yarn", "dev"]
EXPOSE 3333