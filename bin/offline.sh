#!/bin/bash
# sinlge entity use: echo "kraken" | bin/offline.sh /dev/stdin

source $(dirname "$0")/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    ssh $m "sudo -u ${APP_NAME} -g ${APP_NAME} touch /tmp/OFFLINE"
done
