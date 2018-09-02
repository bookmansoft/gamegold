# 游戏金核心 Game Gold Core

游戏金核心是一个类比特币应用，它采用区块链技术，试图建立一个基于对等网络的新型游戏生态系统。

成功运行该项目后，将会在本地启动一个游戏金全节点。

对项目进行适当的远程参数配置后再次运行，它将自动成为游戏金对等网络上的一个全节点，参与全局信息交换、数据缓存、记账等工作。

## 安装指南

1、安装 nodejs 10.4.0 及其以上版本
2、克隆代码仓库
```bash
git clone https://github.com/bookmansoft/gamegold
```
3、安装依赖库
```bash
cd gamegold
npm i
```
4、运行项目
```bash
npm start
```
5、新开一个命令窗口，执行一条控制台命令
```bash
npm run cli rpc block.info.byheight 0
```

## 关联项目

全节点管理后台
https://github.com/bookmansoft/gamegoldmanager

API说明文档
https://github.com/bookmansoft/gamegoldapi
