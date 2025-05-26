#!/bin/bash
if [ "$#" -ne 3, ]; then
    echo "usage: $0 name text node-list"
    exit 1
fi

APP_NAME=$1
text=$2

source $(dirname $0)/env.sh

exec 4<$3
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "sudo grep ${text} /opt/${APP_NAME}/journals/ledger"
done
