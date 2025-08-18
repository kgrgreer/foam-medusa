#!/bin/bash
node foam3/tools/build.js -Jdemo,https,c2-mn -EAPP_HOME:/opt/node1,APP_NAME:medusa,HOST_NAME:node1,DEBUG:true,DEBUG_PORT:8205,WEB_PORT:8200 -a "$@"
