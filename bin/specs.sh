#!/bin/bash

exec 4<$1
while read -u4 m; do
    RESULT=$(ssh -o ConnectTimeout=5 $m 'lscpu | grep "^CPU(s):\|Model name:"')
    echo $m
    echo $RESULT
    echo
done
