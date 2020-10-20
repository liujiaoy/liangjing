# 记录今天下载VScode

有以下几个需要注意的点  
### 1. vscode 与visual Studio是不同的，开始一直把Visual Studio当成VSCode

        VSCode其实就是一个文本编辑器，跟nodepad++，sublime性质一致，Visual Studio是IDE，功能强大但也臃肿，适合后台。
### 2. 快捷键这种东西，看的多没什么用，挑几个常用的、必用的多用用。
         ctrl+shift+p打开搜索配置很重要。暂时我只记得这一个

### 3. 今天学习使用了一个插件 Setting Sync,顾名思义就是把设置同步，目的在于多个电脑可以共用一个配置文件，尤其是公司和家里的电脑，还有换了电脑的时候很实用。  
     这个插件配置起来还挺麻烦的
       1） VSCode，找到插件 Setting Sync下载
       2） 登录github生成token，记录id
       3）回到Setting Sync设置，忘了请查博客
          记住两个快捷键  shift+alt+U 上传配置文件 shift+alt+D 下载


---
## 学习学习使用markdown
***
*斜体*
_斜体_
**粗体**
__粗体__
***粗斜体***
___粗斜体___
~~嘿嘿嘿~~
<u>哇呜</u>
<center>我居中</center>

***

* * *
分割线


***
* 学习列表
* 嘿嘿嘿
- 换个方式
- 我的天呀
1. 列表嵌套
    * 我是子列表
    * 巧了我也是
        - 我也
        - 子子列表
> 区块引用
> 有什么用呢
>> 我可以嵌套
>>>厉害吧

```javascript
// 代码，还是这个比较好用
function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
}

```
        <!-- 代码 -->
        function getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                if (r != null) return unescape(r[2]); return null; //返回参数值
        }

来学习表格
|表头1|表头2|表头3|
|----:|:----|:-:|
|1|2|3|
|1|2|3|
|1|2|3|
|1|2|3|

        -: 设置内容和标题栏居右对齐。
        :- 设置内容和标题栏居左对齐。
        :-: 设置内容和标题栏居中对齐。
[百度一下，你就知道](www.better2020.top)
<http://www.better2020.top>
<img src="http://static.runoob.com/images/runoob-logo.png" width="50%">
![百度一下，你就知道](http://static.runoob.com/images/runoob-logo.png)

        目前支持的 HTML 元素有：<kbd> <b> <i> <em> <sup> <sub> <br>等 ，如：
