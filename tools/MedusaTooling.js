/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/**
   Support tasks for Medusa to ledger management
   usage: node foam3/tools/build.js -TStandard,RemoteInstall,Medusa,Java --remote-hostname:moosehead
*/

foam.POM({
  name: 'medusa',
  description: 'Options and Tasks to support Medusa environemnts',

  envs: {
    ASYNC_SYMBOL: ['', '&']
  },

  options: {
    async: ['', 'async', 'ASYNC', 'Execute remote operation asynchronously - append \&', false, function(arg) { ASYNC = arg ? this.bool(arg) : true; }],
    backupDir: ['', 'backup-dir', 'BACKUP_DIR', 'Directory to store backups.', () => BACKUP_DIR = '.', arg => BACKUP_DIR = arg],
    ledger: ['', 'ledger', 'LEDGER', 'Path to ledger file', () => LEDGER = `${APP_ROOT}/${APP_NAME}/journals/ledger`, arg => LEDGER = arg],
    sshTimeout: ['', 'ssh-timeout', 'SSH_TIMEOUT', 'SSH connection attempt will wait no more than this time in seconds before giving up', 5, arg => SSH_TIMEOUT = arg]
  },

  tasks: {
    backupLedger: ['backup-ledger', 'Backup Node ledger', ['validate'], function() {
      // ssh -o ConnectTimeout=5 $m "sudo cp /opt/${APP_NAME}/journals/ledger ledger-${d}" &
      this.execCmd.bind(this, `[Medusa] backup ledger on ${REMOTE_HOSTNAME}`, `ssh -o ConnectTimeout=${SSH_TIMEOUT} ${REMOTE_HOSTNAME} 'sudo cp ${LEDGER} ${BACKUP_DIR}/ledger-${TIMESTAMP}' ${ASYNC ? ASYNC_SYMBOL : ''}`)();
    }],
    usage: ['usage', 'Usage examples', [], function() {
      this.log('    ./build.sh -TStandard,RemoteInstall,../foam-medusa/tools/Medusa,Java --backup-ledger --remote-hostname:moosehead');
    }],
    validate: ['validate', '', [], function() {
      if ( ! APP_ROOT ) this.error(`[Medusa] APP_ROOT undefined`);
      if ( ! APP_NAME ) this.error(`[Medusa] APP_NAME undefined`);
    }]
  }
});
