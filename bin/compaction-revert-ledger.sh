#!/bin/bash
if [ "$#" -ne 2 ]; then
    echo "usage: $0 index node-list"
    exit 1
fi

source $(dirname "$0")/env.sh

index=$1
exec 4<$2
while read -u4 m; do
    echo $m
    echo "mv /opt/${APP_NAME}/journals/ledger.$index /opt/${APP_NAME}/journals/ledger"
    ssh -o ConnectTimeout=5 $m "sudo mv /opt/${APP_NAME}/journals/ledger.$index /opt/${APP_NAME}/journals/ledger"
done
