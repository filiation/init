fli-init
=======

fli配套了脚手架工具，用于初始化各种应用代码。

基于 [egg-init](https://github.com/eggjs/egg-init) 实现。

## 安装脚手架工具

通过`tnpm`安装

```bash
$ tnpm i fli-init -g
```

## 使用脚手架工具

### 创建指定脚手架模版的类型

通过`--type`指定类型：

```bash
$ fli-init --type mobx [dir]
```
`mobx`是初始化模版的类型，支持的类型[点击查看初始化模版类型](https://github.com/filiation/init-config/blob/master/package.json#L9)
`dir`指定目标目录，如果缺省表示在当前目录初始化，当前目录不为空时会报错。

### 不输入类型可以选择

```bash
$ fli-init [dir]
? Please select a boilerplate type (Use arrow keys)
❯ mobx - mobx boilerplate
  react - react boilerplate
  ...
```
通过尖头光标移动选择

## 支持的参数

```bash
$ fli-init -h
```

可查看支持的参数列表

```
Usage: fli-init [dir] --type=simple

Options:
  --type          boilerplate type                                                [string]
  --dir           target directory                                                [string]
  --force, -f     force to override directory                                     [boolean]
  --template      local path to boilerplate                                       [string]
  --package       boilerplate package name                                        [string]
  --registry, -r  npm registry, support china/npm/custom, default to auto detect  [string]
  --silent        don't ask, just use default value                               [boolean]
  --version       Show version number                                             [boolean]
  -h, --help      Show help                                                       [boolean]
```

## 自定义模板

自定义模板采用 npm 包的形式管理

- 新建仓库如 [init-mobx](https://github.com/filiation/init-mobx)
- boilerplate 目录下存放所有的初始化文件
- 可以使用 `fli-init --template=PATH` 本地检查生成效果
- index.js 文件可以声明要替换的变量，在 boilerplate 文件夹中写模板的时候，可以通过 `{{name}}` 占位符的方式进行替换
```js
module.exports = {
  name: {
    desc: '名称',
    // 内置实现，默认取文件夹名称
  },
  description: {
    desc: '描述',
    'default': '指定描述默认值',
  },
  author: {
    desc: '作者',
    // 内置实现，默认取git账号或系统用户名
  },
  gitUrl: {
  	desc: '对应的git仓库地址',
    // 内置实现，默认取git仓库信息或置空
  },
  type: {
  	'default': 'pane',
  	silent: true, // 设置为silent的不在输入流程中显示，可以作为变量在boilerplate模版中使用
  },
  project: {
  	'default': 'hio',
  	silent: true, // 同上
  }
};
```

- 更新依赖关系，只需要指定你的包名，更新到 [init-config](https://github.com/filiation/init-config) 这个模块的 package.json 中 `config.boilerplate` 字段
- 发布模板（和配置）到 npm

## License

[MIT](LICENSE)
