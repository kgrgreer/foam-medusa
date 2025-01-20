#!/bin/bash
d=$(date +%Y%m%d%H%M%S)
echo $d

source $(dirname "$0")/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "sudo cp /opt/${APP_NAME}/journals/ledger ledger-${d}" &
done
