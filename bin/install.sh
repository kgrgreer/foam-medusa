#!/bin/bash
exec 4<$1
while read -u4 m; do
    echo Installing to $m
    foam3/tools/bin/install_remote.sh -H$m &
done
