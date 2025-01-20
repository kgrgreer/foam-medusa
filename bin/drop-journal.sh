#!/bin/bash
if [ "$#" -ne 2 ]; then
    echo "usage: $0 journal_name list"
    exit 1
fi

source $(dirname "$0")/env.sh

n=$1
exec 4<$2
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "sudo rm /opt/${APP_NAME}/journals/${n};"
done
