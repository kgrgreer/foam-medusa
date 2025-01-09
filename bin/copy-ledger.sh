#!/bin/bash
if [ "$#" -ne 2 ]; then
    echo "usage: $0 dir node-list"
    exit 1
fi

source build/env.sh

d=$(date +%Y%m%d%H%M%S)
echo $d
dir=$1/$d

exec 4<$2
while read -u4 m; do
    echo $m
    mkdir -p $dir
    scp $m:/opt/${SYSTEM_NAME}/journals/ledger ${dir}/${m}-ledger
done
