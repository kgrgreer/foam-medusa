#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "usage: $0 name file"
    exit 1
fi

APP_NAME=$1

exec 4<$2
while read -u4 m; do
    echo $m
    ssh $m 'touch /tmp/OFFLINE'
    # pause for few seconds for the cluster to detect OFFLINE request and process
    sleep 5
    ssh $m 'rm /tmp/OFFLINE'
    ssh $m 'sudo systemctl stop '${APP_NAME}
done
