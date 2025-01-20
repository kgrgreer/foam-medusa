#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "usage: $0 node-list"
    exit 1
fi

source $(dirname "$0")/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "sudo grep -v hash: /opt/${APP_NAME}/journals/ledger"
done
