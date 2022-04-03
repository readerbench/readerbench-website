# Stage 1 => Build
FROM node:10.22-alpine AS build

ARG NPM_TOKEN
ARG ENV

# Configure build directory
RUN mkdir -p /usr/src/app

# Copy the files
COPY . /usr/src/app/

# Build
WORKDIR /usr/src/app
RUN npm install
RUN npm run build

# Stage 2 => Run
FROM nginx:1.21

# Copy project to container
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html/

# copy client nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY ./docker/docker-nginx.conf /etc/nginx/conf.d

EXPOSE 80
