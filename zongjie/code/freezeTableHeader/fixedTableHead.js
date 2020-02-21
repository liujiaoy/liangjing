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
