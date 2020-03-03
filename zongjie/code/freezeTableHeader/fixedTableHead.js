/*
    说明： 1.适用于单行或多行表头，固定thead，若无thead，默认固定table第一行（需要有th）
           2.fixedTableHead适用于整个窗口滚动
           3.fixedTableHead2适用于嵌套在页面中的表格，表格滚动，表格外层需包裹div

    使用： 在需要使用的页面添加此文件
            将需要固定表头的tableId传入该方法
            例 fixedTableHead("#test")
*/ 
{/* 
    
<script type="text/javascript" src="../js/fixedTableHead.js"></script>
<%--固定搜索栏--%>
<div class="fixedHead"></div>
<script type="text/javascript">
    //固定搜索栏与表头
    $(document).ready(function () {
        $("#newTableId").remove();
        fillHead(".fixedHead");
        fixedTableHead("#gvList");
    })
</script> 

*/}
function fixedTableHead(id){
    // console.log(id)
    var oldTableId=$(id);
    var h=oldTableId.offset().top;
    var w=oldTableId.offset().left;
    var d = oldTableId.outerWidth();
    // 动态新增表头并复制宽度
    var newtable=oldTableId.clone(true);
    newtable.attr("id","newTableId");
    // 有thead的，表头可以是单行或者多行
    if(oldTableId.children("thead").length>0){
        oldTableId.parent().append(newtable.empty().html(newtable.find("thead")));
        $("#newTableId").find('tr').each(function (i) {
            $(this).css('height',oldTableId.find('tr').eq(i).height())
            $(this).find("th").each(function(j){
                $(this).css('width',oldTableId.find('tr').eq(i).find('th:eq(' + j + ')').innerWidth());
            })   
        });
    }else{
        // 无thead的，表头默认为第一行
        oldTableId.parent().append(newtable.empty().html(newtable.find("tr").eq(0)))
        $("#newTableId").find('th').each(function (i) {
            $(this).css('width',oldTableId.find('th:eq(' + i + ')').innerWidth());
        });
    }  
    // 新表头的位置，默认为覆盖当前表头，即配合fillHead一起使用
    $("#newTableId").css({
        "position": "fixed",
        "top": h,
        "left": w,
        "width": d,
        // "display":"none",
        "z-index":2
    })
    //窗口大小改变时，对应表头宽度进行自适应
    $(window).resize(function () {
        $("#newTableId").width(oldTableId.outerWidth());
        if(oldTableId.find("thead").length>0){
            $("#newTableId").find('tr').each(function (i) {
                $(this).css('height',oldTableId.find('tr').eq(i).height())
                $(this).find("th").each(function(j){
                    $(this).css('width',oldTableId.find('tr').eq(i).find('th:eq(' + j + ')').innerWidth());
                })   
            });
        }else{
            $("#newTableId").find('th').each(function (i) {
                $(this).css('width',oldTableId.find('th:eq(' + i + ')').innerWidth());
            });
        }
    });
    console.log(oldTableId.parent().html())
    // 当表头超出窗口宽度时，出现滚动条，新加的表头需要跟随滚动条移动
    $(window).scroll(function(){  
        var w=oldTableId.offset().left;
        // var dist = oldTableId.offset().top-$(window).scrollTop();
        // if(dist<0){
        //     $("#newTableId").show(); 
        // }else{
        //     $("#newTableId").hide(); 
        // }
        var c = $(this).scrollLeft();
        $("#newTableId").css({
            "left": -c+w
        })
    })

}
// 固定搜索栏
function fillHead(id){
    var h = $(id).height();
    var color = $(id).css('background-color');
    console.log(color);
    $(id).css({
        "position":"fixed",
        "top":0,
        "width":"100%",
        "background-color":"#fff",
        "z-index":"4"
    });
    $("body").prepend('<div class="bcg"></div>');
    $(".bcg").css({
        "position":"relative",
        "top":0,
        "left":0,
        "height":h,
        "width":"100%",
        "z-index":"3"
    })  
}

// 表格滚动
function fixedTableHead2(id){
    var oldTableId=$(id);
    var parentId=$(id).parent();
    var h=oldTableId.offset().top;
    var w=oldTableId.offset().left;
    var d = oldTableId.width();
    // 动态新增表头并复制宽度
    var newtable=oldTableId.clone(true);
    newtable.attr("id","newTableId");
    if(oldTableId.find("thead").length>0){
        oldTableId.parent().prepend(newtable.remove().html(newtable.find("thead")));
        $("#newTableId").find('tr').each(function (i) {
            $(this).css('height',oldTableId.find('tr').eq(i).height())
            $(this).find("th").each(function(j){
                $(this).css('width',oldTableId.find('tr').eq(i).find('th:eq(' + j + ')').width());
            })   
        });
    }else{
        oldTableId.parent().prepend(newtable.remove().html(newtable.find("tr").eq(0)))
        $("#newTableId").find('th').each(function (i) {
            $(this).css('width',oldTableId.find('th:eq(' + i + ')').width());
        });
    }  
    // 新表头的位置
    $("#newTableId").css({
        "position": "fixed",
        "top": h,
        "left": 0,
        "width": d,
        "z-index": 999,
        "display":"none"
    })
    //窗口大小改变时，对应表头宽度进行自适应
    $(window).resize(function () {
        // alert(1);
        $("#newTableId").width(oldTableId.width());
        if(oldTableId.find("thead").length>0){
            $("#newTableId").find('tr').each(function (i) {
                $(this).css('height',oldTableId.find('tr').eq(i).height())
                $(this).find("th").each(function(j){
                    $(this).css('width',oldTableId.find('tr').eq(i).find('th:eq(' + j + ')').width());
                })   
            });
        }else{
            $("#newTableId").find('th').each(function (i) {
                $(this).css('width',oldTableId.find('th:eq(' + i + ')').width());
            });
        }
    });
    // 当表头超出表格父窗口宽度时，出现滚动条，新加的表头需要跟随滚动条移动
    oldTableId.parent().scroll(function () {
        // console.log(111);
        if($(this).scrollTop()>0){
            $("#newTableId").show(); 
        }else{
            $("#newTableId").hide(); 
        }
        var c = $(this).scrollLeft();
        var w=oldTableId.offset().left-;
        $("#newTableId").css({
            "left": -c
        })
    })
}
