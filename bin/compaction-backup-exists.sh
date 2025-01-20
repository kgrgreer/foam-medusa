#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "usage: $0 node-list"
    exit 1
fi

source $(dirname "$0")/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    result=$(ssh -o ConnectTimeout=5 $m sudo ls -t /opt/${APP_NAME}/journals | grep "ledger-20*" 2>/dev/null)
    echo "result=[${result}]"
    if [ -n "${result}" ] && [ $(echo result | wc -l) -eq 1 ]; then
        echo "FOUND"
    elif [ -z "${result}" ] || [ $(echo result | wc -l) -eq 0 ]; then
        echo "NOT FOUND"
    else
        echo "FAIL: multiple exists"
    fi
done
