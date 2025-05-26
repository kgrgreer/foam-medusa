#!/bin/bash
if [ "$#" -ne 3 ]; then
    echo "usage: $0 name dir node-list"
    exit 1
fi

APP_NAME=$1
d=$(date +%Y%m%d%H%M%S)
echo $d
dir=$2/$d

exec 4<$3
while read -u4 m; do
    echo $m
    mkdir -p $dir
    scp $m:/opt/${APP_NAME}/journals/ledger ${dir}/${m}-ledger
done
