# 固定表头（兼容ie8）
固定表头这个问题在工作中遇到几次了，经常和滚动加载一起出现。
自我感觉是原始的分页比较废操作，滚动加载给到用户的体验还是可以的，滚动之后看不到表头的话就很不友好了。因为公司系统较为老旧要兼容ie8，每次碰到都得重新查阅资料，今天总结一番，也锻炼自己的文档编写能力。

## 1.准备工作（环境模拟）
* 想起来我每次下载软件和版本的时候都喜欢最新的就很傻，很多时候版本不同，操作也就不一样了，网上查找的资料参考性就会降低。现在意识到了稳定最重要，尤其是刚开始学习的时候，找一个好教程下载相同版本练练手，自己再去摸索新版本也是可以的。
* ##### 公司：Jquery 1.7.1，ligerUI，C#,兼容IE8（我恨）

##2.实现思路
* 自我思考
  上次遇见问题由于时间关系选择的是“**直接把表头复制一遍，把position改为fixed**”，这种方式优点就是图快哈哈，缺点一大堆， 原有表格宽度要知道，列宽要固定、复用性低可以说非常死板了。
* 查阅资料
  翻阅并询问了公司现有项目是否有这个公用方法，了解到有freezeHead.js，但不能适配窗口大小改变，同时代码我不是很能看懂，遂放弃。
  于是上网搜索，推荐这个网站[jquery插件库](https://www.jq22.com/)，看了好几个固定表头插件，得出一个动态新增表头的解决方法，和我原有的方法思路较为相似，通过原有的table，动态复制表头和列宽，灵活性高

##3.代码
暂时还不会抽离成插件，只能是通过调用方法来完成这个功能，下面贴出代码
```javascript
/*
    说明：fixedTableHead适用于单行表头，将表头固定在现有位置上
          fixedTableHead2适用于单行或多行表头，table须有thead通过thead固定,表头固定在顶部

    使用： 在需要使用的页面添加此文件
            将需要固定表头的tableId传入该方法
            例 fixedTableHead("#aaa")
*/
function fixedTableHead(id){
    // console.log(id)
    var oldTableId=$(id);
    var h=oldTableId.offset().top;
    var w=oldTableId.offset().left;
    var d = oldTableId.width();
    // 动态新增表头并复制宽度
    var newtable=oldTableId.clone(true);
    newtable.attr("id","newTableId");
    oldTableId.parent().prepend(newtable.remove().html(newtable.find("tr").eq(0)))
    $("#newTableId").find('th').each(function (i) {
        //console.log(i);
        //console.log($("#gvPerson thead").find("th").eq(i).width());
        $(this).css('width',oldTableId.find('th:eq(' + i + ')').width());
    });
    // 新表头的位置
    $("#newTableId").css({
        "position": "fixed",
        "top": h,
        "left": w,
        "width": d,
        "z-index": 999
    })
    //窗口大小改变时，对应表头宽度进行自适应
    $(window).resize(function () {
        // alert(1);
        $("#newTableId").width(oldTableId.width())
        $("#newTableId").find('th').each(function (i) {
            $(this).css('width', oldTableId.find("th").eq(i).width());
        });
    });
    // 当表头超出窗口宽度时，出现滚动条，新加的表头需要跟随滚动条移动
    $(window).scroll(function () {
        // console.log(111);
        var c = $(this).scrollLeft();
        var w=oldTableId.offset().left;
        $("#newTableId").css({
            "left": -c+w
        })
    })
}
```
```javascript
// 多行表头
function fixedTableHead2(id){
    // console.log(id)
    var oldTableId=$(id);
    var h=oldTableId.offset().top;
    var w=oldTableId.offset().left;
    var d = oldTableId.width();
    // 动态新增表头并复制宽度
    var newtable=oldTableId.clone(true);
    newtable.attr("id","newTableId");
    oldTableId.parent().prepend(newtable.remove().html(newtable.find("thead")))
    $("#newTableId").find('tr').each(function (i) {
        $(this).css('height',oldTableId.find('tr').eq(i).height())
        $(this).find("th").each(function(j){
            $(this).css('width',oldTableId.find('tr').eq(i).find('th:eq(' + j + ')').width());
        })   
    });
    // 新表头的位置
    $("#newTableId").css({
        "position": "fixed",
        "top": 0,
        "left": w,
        "width": d,
        "z-index": 999,
        "display":"none"
    })
    //窗口大小改变时，对应表头宽度进行自适应
    $(window).resize(function () {
        // alert(1);
        $("#newTableId").width(oldTableId.width())
        $("#newTableId").find('tr').each(function (i) {
            $(this).css('height',oldTableId.find('tr').eq(i).height())
            $(this).find("th").each(function(j){
                $(this).css('width',oldTableId.find('tr').eq(i).find('th:eq(' + j + ')').width());
            })   
        });
    });
    // 当表头超出窗口宽度时，出现滚动条，新加的表头需要跟随滚动条移动
    $(window).scroll(function () {
        // console.log(111);
        var dist = oldTableId.offset().top-$(this).scrollTop();
        if(dist<=0){
            $("#newTableId").show(); 
        }else{
            $("#newTableId").hide(); 
        }
        var c = $(this).scrollLeft();
        var w=oldTableId.offset().left;
        $("#newTableId").css({
            "left": -c+w
        })
    })
}

```
## 4.存档
https://github.com/liujiaoy/liangjing/tree/master/zongjie/code
freezeTableHead.js
下载运行test.html可预览效果


## 5.修改
- 2020.2.21 将多行与单行合并，增加了嵌套在页面中的table表头固定。
