#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "usage: $0 node-list"
    exit 1
fi

source build/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    result=$(ssh -o ConnectTimeout=5 $m sudo ls -t /opt/${SYSTEM_NAME}/journals/ledger 2>/dev/null)
    echo "result=[${result}]"
    if [ -n "${result}" ] && [ $(echo result | wc -l) -gt 0 ]; then
      ssh -o ConnectTimeout=5 $m sudo rm /opt/${SYSTEM_NAME}/journals/ledger
    fi
done
