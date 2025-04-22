#!/bin/bash
./build.sh -Ppom,foam-medusa/pom -J../foam3/deployment/https,../foam-medusa/deployment/c2-mm -EAPP_NAME:mediator2,HOST_NAME:mediator2,DEBUG:true,DEBUG_PORT:8115,WEB_PORT:8110 -a -XcleanAll,all "$@"
