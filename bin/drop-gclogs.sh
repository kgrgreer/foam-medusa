#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "usage: $0 node-list|mediator-list"
    exit 1
fi

source $(dirname "$0")/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m sudo bash -c "cd /opt/${APP_NAME}/logs; find . -maxdepth 1 -mindepth 1 -type f -name "gc-*" -delete"
done
