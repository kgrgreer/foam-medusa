#!/bin/bash
./build.sh -Ppom,foam-medusa/pom -J../foam3/deployment/https,../foam-medusa/deployment/c2-mn -EAPP_NAME:node1,HOST_NAME:node1,DEBUG:true,DEBUG_PORT:8205,WEB_PORT:8200 -a -c "$@"
