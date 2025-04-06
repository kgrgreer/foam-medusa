#!/bin/bash
./build.sh -Ppom,foam-medusa/pom -J../foam3/deployment/https,../foam-medusa/deployment/c2-mn -EAPP_NAME:node2,HOST_NAME:node2,DEBUG:true,DEBUG_PORT:8215,WEB_PORT:8210 -a "$@"
