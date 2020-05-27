# 百谷王链

百谷王链是一个通用区块链引擎，可作为公链/许可链应用的底层引擎技术，原生支持跨链，内置二十余种托管合约，覆盖验签、资产发行、ABS等业务场景，开箱即用。支持多语言SDK、Restful RPC、消息队列插件等多样化集成/交互模式。

本项目可以直接启动并成为百谷王生态系统中的一个全节点，承担全局信息交换、记账等工作，可通过丰富的配置参数进行个性化定制。也可以将本项目作为依赖项引入第三方工程，以实现更大自由度的定制化开发。

## 安装指南

一、克隆项目

1、安装 nodejs 12.x 版本

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
vc help
```

```bash
vc block.info.byheight 0
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

全节点示范项目，依赖包引入模式
https://github.com/bookmansoft/gamegoldnode

中台管理系统
https://github.com/bookmansoft/gamegoldmanager

API说明文档
https://github.com/bookmansoft/gamegoldapi

