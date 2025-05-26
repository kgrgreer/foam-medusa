#!/bin/bash
if [ "$#" -ne 3 ]; then
    echo "usage: $0 name index node-list"
    exit 1
fi

APP_NAME=$1

index=$2
exec 4<$3
while read -u4 m; do
    echo $m
    echo "mv /opt/${APP_NAME}/journals/ledger.$index /opt/${APP_NAME}/journals/ledger"
    ssh -o ConnectTimeout=5 $m "sudo mv /opt/${APP_NAME}/journals/ledger.$index /opt/${APP_NAME}/journals/ledger"
done
