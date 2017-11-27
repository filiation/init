'use strict'

const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const os = require('os')
const ini = require('ini')

const user = {
  /**
   * 获取用户域账户名
   *
   * @return {String}
   */
  getUserAccount () {
    let account

    // try to get config by git
    try {
      let stdout = cp.execSync('git config --list')

      if (stdout) {
        let config = {}

        stdout.split('\n').forEach(line => {
          let pieces = line.split('=')
          config[pieces[0].trim()] = pieces[1].trim()
        })

        if (config['user.email']) {
          account = config['user.email'].split('@')[0]
        } else {
          account = config['user.name']
        }
      }
    } catch (err) {
      // empty
    }

    if (account && account.match(/^[\w.]+$/)) {
      return account
    }

    // try to read .gitconfig
    try {
      let gitFile = path.join(os.homedir(), '.gitconfig')
      let parsed = ini.parse(fs.readFileSync(gitFile, 'utf8'))
      let email = parsed.user.email

      if (email) {
        account = email.split('@')[0]
      } else {
        account = parsed.user.name
      }
    } catch (err) {
      // empty
    }

    if (!account) {
      account = process.env.SUDO_USER || process.env.USER
    }

    return account
  }
}

module.exports = user