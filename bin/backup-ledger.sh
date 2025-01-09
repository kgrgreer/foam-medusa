#!/bin/bash
d=$(date +%Y%m%d%H%M%S)
echo $d

source build/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "sudo cp /opt/${SYSTEM_NAME}/journals/ledger ledger-${d}" &
done
