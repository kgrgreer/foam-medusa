#!/bin/bash

source build/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    ssh $m 'sudo systemctl start '${SYSTEM_NAME}
done
