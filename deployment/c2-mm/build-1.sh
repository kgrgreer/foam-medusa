#!/bin/bash
./build.sh -Ppom,foam-medusa/pom -J../foam3/deployment/https,../foam-medusa/deployment/c2-mm -EAPP_NAME:mediator1,HOST_NAME:mediator1,RUN_ARGS:-m,DEBUG:true,DEBUG_PORT:8105,WEB_PORT:8100 -a -c "$@"
