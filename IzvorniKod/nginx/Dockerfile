FROM nginx:1.15.8

COPY build /usr/share/nginx/html
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/
RUN rm /etc/nginx/conf.d/default.conf
COPY project.conf /etc/nginx/conf.d/

RUN mkdir /etc/nginx/certs

COPY ./certs ./etc/nginx/certs
