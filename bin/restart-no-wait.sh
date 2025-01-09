#!/bin/bash

source build/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "touch /tmp/OFFLINE; sleep 5; sudo systemctl stop ${SYSTEM_NAME}; rm /tmp/OFFLINE; sudo systemctl start ${SYSTEM_NAME}"
done
