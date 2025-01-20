#!/bin/bash
if [ "$#" -ne 2 ]; then
    echo "usage: $0 date node-list  (with date in format YYYYMMDDHHMMSS)"
    exit 1
fi

source $(dirname "$0")/env.sh

d=$1
exec 4<$2
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "sudo cp ledger-${d} /opt/${APP_NAME}/journals/ledger; sudo chown ${APP_NAME}:${APP_NAME} /opt/${APP_NAME}/journals/ledger"
done
