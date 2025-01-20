#!/bin/bash

source $(dirname "$0")/env.sh

exec 4<$1
while read -u4 m; do
    echo $m
    ssh $m 'sudo systemctl start '${APP_NAME}
done
