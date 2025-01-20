#!/bin/bash
export APP_NAME=$(./build.sh -XappName | grep "Application Name" | sed -E 's/(.*):{1}(.*)/\2/' | tr -d '[:blank:]')
export VERSION=$(./build.sh -Xversions | grep "Application Version" | sed -E 's/(.*):{1}(.*)/\2/' | tr -d '[:blank:]')
