#!/bin/bash
node foam3/tools/build.js -Jdemo,https,c2-mn -EAPP_HOME:/opt/node2,APP_NAME:medusa,HOST_NAME:node2,DEBUG:true,DEBUG_PORT:8215,WEB_PORT:8210 -a "$@"
