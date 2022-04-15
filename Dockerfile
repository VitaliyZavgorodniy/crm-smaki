FROM node:14.4.0

WORKDIR /app

COPY . .

RUN npm cache clean --force

RUN npm ci

# RUN npm run build
