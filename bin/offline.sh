#!/bin/bash
# sinlge entity use: echo "kraken" | bin/offline.sh /dev/stdin

source build/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    ssh $m "sudo -u ${SYSTEM_NAME} -g ${SYSTEM_NAME} touch /tmp/OFFLINE"
done
