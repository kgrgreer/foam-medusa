#!/bin/bash
if [ "$#" -ne 2 ]; then
    echo "usage: $0 name node-list"
    exit 1
fi

APP_NAME=$1

exec 4<$2
while read -u4 m; do
    echo $m
    result=$(ssh -o ConnectTimeout=5 $m sudo ls -t /opt/${APP_NAME}/journals/ledger 2>/dev/null)
    echo "result=[${result}]"
    if [ -n "${result}" ] && [ $(echo result | wc -l) -gt 0 ]; then
      ssh -o ConnectTimeout=5 $m sudo rm /opt/${APP_NAME}/journals/ledger
    fi
done
