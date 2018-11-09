FROM node:10.13.0-alpine

ADD . /aws-s3-node-server

WORKDIR /aws-s3-node-server

RUN npm config set unsafe-perm true && npm i yarn -g && yarn

EXPOSE 8080

CMD ["npm", "run", "docker"]
