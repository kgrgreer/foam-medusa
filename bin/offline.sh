#!/bin/bash
# sinlge entity use: echo "kraken" | bin/offline.sh /dev/stdin
if [ "$#" -ne 2 ]; then
    echo "usage: $0 name file"
    exit 1
fi

APP_NAME=$1

exec 4<$2
while read -u4 m; do
    echo $m
    ssh $m "sudo -u ${APP_NAME} -g ${APP_NAME} touch /tmp/OFFLINE"
done
