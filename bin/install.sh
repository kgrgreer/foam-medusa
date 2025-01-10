#!/bin/bash

source build/env.sh

TARBALL_NAME=${NAME}-deploy-${VERSION}.tar.gz
TMP_PATH=/tmp/deploy
rm -rf ${TMP_PATH}
mkdir -p ${TMP_PATH}
cp build/package/${TARBALL_NAME} ${TMP_PATH}/
TARBALL=${TMP_PATH}/${TARBALL_NAME}

exec 4<$1
while read -u4 m; do
    echo Installing $SYSTEM_NAME-$VERSION to $m
    foam3/tools/bin/install_remote.sh -W$m -T${TARBALL} &
done
