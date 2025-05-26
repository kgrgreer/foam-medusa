#!/bin/bash
if [ "$#" -ne 3 ]; then
    echo "usage: $0 name entry node-list"
    exit 1
fi

APP_NAME=$1
entry=$2

exec 4<$3
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "sudo grep index:${entry}, /opt/${APP_NAME}/journals/ledger"
done
