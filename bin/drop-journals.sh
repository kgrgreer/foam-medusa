#!/bin/bash
if [ "$#" -ne 2 ]; then
    echo "usage: $0 name node-list|mediator-list"
    exit 1
fi

APP_NAME=$1

exec 4<$2
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "sudo rm /opt/${APP_NAME}/journals/*"
done
