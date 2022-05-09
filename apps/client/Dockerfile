FROM nginx:stable-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY ./dist/apps/client .

EXPOSE 80
