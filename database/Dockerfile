FROM postgres:11-alpine as dumper

COPY database.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

VOLUME ["/backup/"]