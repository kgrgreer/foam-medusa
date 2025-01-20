#!/bin/bash

source $(dirname "$0")/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "sudo rm /opt/${APP_NAME}/journals/clusterConfig"
done
