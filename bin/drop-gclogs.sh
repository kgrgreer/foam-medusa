#!/bin/bash
if [ "$#" -ne 2 ]; then
    echo "usage: $0 name node-list|mediator-list"
    exit 1
fi
APP_NAME=$1

exec 4<$2
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m sudo bash -c "cd /opt/${APP_NAME}/logs; find . -maxdepth 1 -mindepth 1 -type f -name "gc-*" -delete"
done
