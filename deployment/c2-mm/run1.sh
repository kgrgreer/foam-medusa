#!/bin/bash
node foam3/tools/build.js -J../../foam3/deployment/demo,../../foam3/deployment/https,../../foam-saf/deployment/c2,c2-mm -EAPP_HOME:/opt/mediator1,APP_NAME:medusa,HOST_NAME:mediator1,DEBUG:true,DEBUG_PORT:8105,WEB_PORT:8100 -a "$@"
