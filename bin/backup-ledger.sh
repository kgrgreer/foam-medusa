#!/bin/bash
if [ "$#" -ne 2 ]; then
    echo "usage: $0 name node-list"
    exit 1
fi

APP_NAME=$1
d=$(date +%Y%m%d%H%M%S)

exec 4<$2
while read -u4 m; do
    echo "backing up ledger on $m, with timestamp $d"
    ssh -o ConnectTimeout=5 $m "sudo cp /opt/${APP_NAME}/journals/ledger ledger-${d}" &
done
