#!/bin/bash
if [ "$#" -ne 3 ]; then
    echo "usage: $0 name id node-list"
    exit 1
fi

APP_NAME=$1
ID=$2

exec 4<$3
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "sudo grep id:${ID}, /opt/${APP_NAME}/journals/ledger"
done
