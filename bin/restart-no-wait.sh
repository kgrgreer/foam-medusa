#!/bin/bash

source $(dirname "$0")/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "touch /tmp/OFFLINE; sleep 5; sudo systemctl stop ${APP_NAME}; rm /tmp/OFFLINE; sudo systemctl start ${APP_NAME}"
done
