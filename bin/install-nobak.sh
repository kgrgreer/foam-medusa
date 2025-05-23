#!/bin/bash
exec 4<$1
while read -u4 m; do
    echo Installing to $m
    ./build.sh -TStandard,RemoteInstall,Java --backup:false --remote-hostname:$m &
done
