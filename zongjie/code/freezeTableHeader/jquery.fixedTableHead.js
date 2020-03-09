;(function($) {
    jQuery.fn.extend({
        "fixedTableHead":function(value){
            $("#newTableId").remove();
            var oldTableId = $(this);
            var scrollTimer;
            //console.log(oldTableId)
            var oldheadertop =0;
            var oldheaderleft = 0;
            var oldheaderwidth = 0;
            if (oldTableId.length > 0) {
                oldheadertop = oldTableId.offset().top;
                oldheaderleft = oldTableId.offset().left;
                oldheaderwidth = oldTableId.outerWidth();
            }
            // 动态新增表头并复制宽度
            var newtable = oldTableId.clone(true);
            newtable.attr("id", "newTableId");
            // 有thead
            if (oldTableId.children("thead").length > 0) {
                // 添加在原有表格的后面
                oldTableId.parent().append(newtable.html(newtable.find("thead")));
                $("#newTableId").find('tr').each(function (i) {
                    // 复制宽高
                    $(this).css('height', oldTableId.find('tr').eq(i).height())
                    $(this).find("th").each(function (j) {
                        $(this).css('width', oldTableId.find('tr').eq(i).find('th:eq(' + j + ')').width());
                    })
                });
            } else {
                // 无thead，原理同上
                oldTableId.parent().append(newtable.html(newtable.find("tr").eq(0)))
                $("#newTableId").find('th').each(function (i) {
                    $(this).css('width', oldTableId.find('th:eq(' + i + ')').width());
                });
            }
            // 新表头的位置，默认不显示
            $("#newTableId").css({
                "position": "fixed",
                "top": oldheadertop  ,
                "left": oldheaderleft,
                "width": oldheaderwidth,
                "display":"none",
                "z-index": 2,   
            })
            //窗口大小改变时，对应表头宽度进行自适应
            $(window).resize(function () {
                // 重新计算表头宽高与位置
                handleResize(oldTableId)
            });

            // 当表头超出窗口宽度时，出现滚动条，新加的表头需要跟随滚动条移动
            $(window).scroll(function () {
                // scroll优化
                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(function(){
                    handleResize(oldTableId)         
                }, 200);
                var dist = $(window).scrollTop();
                    if (dist > 0) {
                        $("#newTableId").show();
                        //setTimeout(resizeTable(oldTableId),1);
                    } else {
                        $("#newTableId").hide();
                    }
                // 原表头距离左侧的宽度
                var w = oldTableId.offset().left;
                // 横向滚动条滚动的距离
                var c = $(this).scrollLeft();
                // 横向滚动处理
                    $("#newTableId").css({
                        "left": -c + w
                    })
            })
        },
        // 固定搜索栏，实现原理：将搜索栏变为fixed，然后添加bcg占位
        "fillHead": function() {
            var fillHead = $(this);
            // 搜索栏高度
            var h = fillHead.innerHeight();
            // 搜索栏样式改变
            fillHead.css({
                "position": "fixed",
                "top": 0,
                "width": "100%",
                "background-color": "#fff",
                "z-index":2
            });
            // 搜索栏变为fixed之后bcg替它占位
            $("body").prepend('<div class="fillHeadbcg"></div>');
            $(".fillHeadbcg").css({
                "position": "relative",
                "top": 0,
                "left": 0,
                "height": h,
                "width": "100%",
                "background-color": "#fff"
            })
            // 窗口大小改变时，对应固定栏高度进行自适应
            $(window).resize(function () {
                $(".fillHeadbcg").height(fillHead.innerHeight());
            });
        }
    });
})(jQuery);
function handleResize(oldTableId) {
    $("#newTableId").css({
        "top": oldTableId.offset().top
    })
    $("#newTableId").width(oldTableId.outerWidth());
    if (oldTableId.find("thead").length > 0) {
        $("#newTableId").find('tr').each(function (i) {
            $(this).css('height', oldTableId.find('tr').eq(i).height())
            $(this).find("th").each(function (j) {
                $(this).css('width', oldTableId.find('tr').eq(i).find('th:eq(' + j + ')').width());
            })
        });
    } else {
        $("#newTableId").find('th').each(function (i) {
            //console.log(i,oldTableId.find('th:eq(' + i + ')').width());
            $(this).css('width', oldTableId.find('th:eq(' + i + ')').width());
        });
    }
}

