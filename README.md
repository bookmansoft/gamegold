# 游戏金核心 Game Gold Core

游戏金核心是一个类比特币应用，它采用区块链技术，试图建立一个基于对等网络的新型游戏生态系统。

成功运行该项目后，将会在本地启动一个游戏金全节点。

对项目进行适当的远程参数配置后再次运行，它将自动成为游戏金对等网络上的一个全节点，参与全局信息交换、数据缓存、记账等工作。

## 安装指南

一、克隆项目模式
1、安装 nodejs 10.4.0 及其以上版本

2、克隆代码仓库
```bash
git clone https://github.com/bookmansoft/gamegold
```

3、安装依赖库
```bash
cd gamegold
npm i
npm link
```

4、运行项目
```bash
npm start
```

5、新开一个命令窗口，执行一条控制台命令
```bash
gg help
```

```bash
gg block.info.byheight 0
```

二、npm安装模式
1、在现有nodejs项目根目录下，执行如下命令：
```bash
npm i gamegold
```

2、将 node_modules/gamegold/.gamegold 目录，完整拷贝到主项目根目录下，根据需要进行个性化配置

3、在现有项目的js文件中，引用核心库：
```js
const gamegold = require('gamegold');
```

标准程序应用范例，详见 ./bin/node
控制台应用范例，详见 ./bin/cli

## 关联项目

全节点示范项目，将游戏金核心作为依赖包引入
https://github.com/bookmansoft/gamegoldnode

全节点管理后台
https://github.com/bookmansoft/gamegoldmanager

API说明文档
https://github.com/bookmansoft/gamegoldapi

