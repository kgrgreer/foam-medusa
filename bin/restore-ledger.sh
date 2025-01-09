#!/bin/bash
if [ "$#" -ne 2 ]; then
    echo "usage: $0 date node-list  (with date in format YYYYMMDDHHMMSS)"
    exit 1
fi

source build/env.sh

d=$1
exec 4<$2
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "sudo cp ledger-${d} /opt/${SYSTEM_NAME}/journals/ledger; sudo chown ${SYSTEM_NAME}:${SYSTEM_NAME} /opt/${SYSTEM_NAME}/journals/ledger"
done
