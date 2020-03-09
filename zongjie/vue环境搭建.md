# <center>记录从零搭建Vue-cli</center>

## 背景
- 在搜索谷歌插件推荐，进去别人的博客，想进一下自己的网站，发现都快找不到了，项目也快忘了，赶紧捡捡。正好也记录一下搭建vue开发环境的过程
## 参考资料
- vue官方文档、百度
## 安装node 与 npm
### 1.安装node.js
node是vue-cli的运行环境，并且nodejs中包括了npm
[下载安装包](http://nodejs.cn/download/) 这里下载比官网快多了
傻瓜式安装，这里因为c盘空间不是很大，所以放在了D盘，安装包挺小的，安装的过程却是漫长的

判断是否安装成功

    node -v
    npm -v

顺势而生的问题 
#### npm下载慢怎么办？
    get命令查看registry,
    npm config get registry
    原版镜像为 
    http://registry.npmjs.org
    使用set命令将镜像改为淘宝镜像

```
 npm config set registry http://registry.npm.taobao.org
```

### 2.安装vue/cli
1)找到vue官网，生态系统->VUE Cli
2)使用npm命令安装

>npm install -g @vue/cli

3)判断是否安装成功

    vue -V

4）创建一个项目

>  vue create my-project
或者
> vue ui

然后选择默认配置或手动配置，一个项目就这样被初始化好了
手动配置的话建议到网上找找别人怎么配
这里我基本上和[这个博客](https://www.cnblogs.com/peter1/p/12149210.html) 一致

5）运行vue项目
>npm run serve
创建好的项目里面readme.md有写

下载运行其他人的项目
git clone 别人的项目地址
进入到相应的项目再npm install （重要）安装依赖
然后再npm run start 或者npm run dev运行

