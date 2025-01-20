#!/bin/bash
if [ "$#" -ne 2 ]; then
    echo "usage: $0 text node-list"
    exit 1
fi
text=$1

source $(dirname $0)/env.sh

exec 4<$2
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "sudo grep ${text} /opt/${APP_NAME}/journals/ledger"
done
