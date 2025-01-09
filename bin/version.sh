#!/bin/bash

# https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux
RESET='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'

exec 4<$1
while read -u4 m; do
    result=$(curl -ks https://$m:8443/service/version)
    if [ -z $result ]; then
        echo -e "$m ${RED}DOWN${RESET}"
    else
        echo -e "$m ${GREEN}$result${RESET}"
    fi
done
