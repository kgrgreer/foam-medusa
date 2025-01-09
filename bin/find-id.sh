#!/bin/bash
if [ "$#" -ne 2 ]; then
    echo "usage: $0 id node-list"
    exit 1
fi

source build/env.sh

id=$1

exec 4<$2
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "sudo grep id:${id}, /opt/${SYSTEM_NAME}/journals/ledger"
done
