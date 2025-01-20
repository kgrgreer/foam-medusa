#!/bin/bash
if [ "$#" -ne 2 ]; then
    echo "usage: $0 entry node-list"
    exit 1
fi

source $(dirname "$0")/env.sh

entry=$1

exec 4<$2
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "sudo grep index:${entry}, /opt/${APP_NAME}/journals/ledger"
done
