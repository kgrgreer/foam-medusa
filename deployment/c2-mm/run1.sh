#!/bin/bash
node foam3/tools/build.js -Jdemo,https,c2-mm -EAPP_HOME:/opt/mediator1,APP_NAME:medusa,HOST_NAME:mediator1,DEBUG:true,DEBUG_PORT:8105,WEB_PORT:8100 -a "$@"
