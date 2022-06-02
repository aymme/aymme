FROM nginx:stable-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY ./dist/apps/client .

EXPOSE 80

CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/assets/config.template.json > /usr/share/nginx/html/assets/config.json && exec nginx -g 'daemon off;' "]
