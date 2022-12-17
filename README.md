# Flight Log Service

This flight log service is a larger part of an application created to make to
process easier for pilots to log their flight hours and to create an easy
platform from which pilots can extract their flight data to summarise their
flight data for personal and/or professional use.

## Build
```bash
export NAME=flight-log-service
export IP_NETWORK=172.18.1.5
export VERSION=0.0.2
export PORT=3050
# build local version
docker build -f Dockerfile.local -t $NAME:$VERSION .
# build development version
docker build -f Dockerfile.development -t johannesscr/$NAME:$VERSION .
```

## Deployment Local
```bash
# Flight Log Service
docker run --name $NAME --net dottics-network --ip $IP_NETWORK -d $NAME:$VERSION
# Security Service Local
docker run --name $NAME --net dottics-network --ip $IP_NETWORK -dp $PORT:$PORT $NAME:$VERSION
# also maps to port 3010 on local machine for development
```

## Deployment Development
```bash
# Security Service
docker run --name $NAME --net dottics-network --ip $IP_NETWORK -d johannesscr/$NAME:$VERSION
# Security Service Local
docker run --name $NAME --net dottics-network --ip $IP_NETWORK -dp $PORT:$PORT johannesscr/$NAME:$VERSION
# also maps to port 3010 on local machine for development
```
