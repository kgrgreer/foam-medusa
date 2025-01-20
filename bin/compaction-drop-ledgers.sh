#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "usage: $0 node-list"
    exit 1
fi

source $(dirname "$0")/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    result=$(ssh -o ConnectTimeout=5 $m sudo ls -t /opt/${APP_NAME}/journals | grep "ledger*" 2>/dev/null)
    echo "result=[${result}]"
    if [ -n "${result}" ] && [ $(echo result | wc -l) -gt 0 ]; then
        for item in $result
        do
            ssh -o ConnectTimeout=5 $m sudo rm /opt/${APP_NAME}/journals/$item
        done
    fi
done
