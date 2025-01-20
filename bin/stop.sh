#!/bin/bash

source $(dirname "$0")/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    ssh $m 'touch /tmp/OFFLINE'
    # pause for few seconds for the cluster to detect OFFLINE request and process
    sleep 5
    ssh $m 'rm /tmp/OFFLINE'
    ssh $m 'sudo systemctl stop '${APP_NAME}
done
