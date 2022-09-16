FROM node:12-alpine

ARG NODE_ENV=production
ARG PORT=80

ENV PORT=${PORT}
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE ${PORT}
CMD [ "npm", "run", "start" ]