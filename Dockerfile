FROM node:18-alpine as dev
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY pages ./pages
#npm run dev
#CMD ["npx","next","dev"]
CMD ["npm","run","dev"]
#CMD ["ls"]

