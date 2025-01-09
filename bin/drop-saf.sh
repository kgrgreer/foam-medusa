#!/bin/bash

source build/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    ssh -o ConnectTimeout=5 $m "sudo rm -f /mnt/${SYSTEM_NAME}/${m}/saf/*"
done
