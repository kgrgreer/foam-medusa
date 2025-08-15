#!/bin/bash
node foam3/tools/build.js -Jdemo,https,c2-mm -EAPP_HOME:/opt/mediator2,APP_NAME:medusa,HOST_NAME:mediator2,DEBUG:true,DEBUG_PORT:8115,WEB_PORT:8110 -a "$@"
