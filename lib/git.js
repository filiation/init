'use strict'

const cp = require('child_process')

const git = {
  /**
   * 获取远程 Git 地址
   *
   * @param  {String} dir
   * @return {String}
   */
  getGitUrl (dir) {
    let stdout

    try {
      stdout = cp.execSync('git config --list', { cwd: dir }).toString()
    } catch (err) {
      return ''
    }

    let lines = stdout.split('\n')
    let urlLine = lines.find(line => {
      return line.indexOf('remote.origin.url') >= 0
    })

    return urlLine ? urlLine.split('=')[1] : ''
  }
}

module.exports = git