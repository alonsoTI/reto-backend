FROM node
WORKDIR /app
COPY . .
CMD [ "npm", "start" ]