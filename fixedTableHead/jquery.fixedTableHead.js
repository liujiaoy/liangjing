/*
    实现功能：1.固定搜索栏$("#test").fillHead();  其实就是表格上面的那一部分，不一定非的是搜索栏

              2.固定表头$("#test2").fixedTableHead(height); table必须要有ID!!!(不然ie8那个特立独行的小伙子会出问题)
              height: 新表头所在位置，不传参数默认在原有位置上显示，为0时在页面顶部显示
              适用于整个页面滚动

*/
/* 
    使用示例：
    <script src="../js/jquery.fixedTableHead.js"></script>
    <%--固定搜索栏--%>
    <div id="fixedHead">
        我是需要被固定的搜索栏
    </div>
    <div>
        <table id="gvList">
        <tr>
            <th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th>
        </tr>
        </table>
    </div>
    <script type="text/javascript">
        //固定搜索栏与表头，只在页面进来的时候执行一次
        $(window).load(function () {
            $("#fixedHead").fillHead();
            $("#gvList").fixedTableHead();
        })
    </script> 

*/
; (function ($) {
    jQuery.fn.extend({
        //固定表头、参数：newheight  新表头距离窗口顶部的距离，为零时在窗口顶部，不设时为原有位置
        "fixedTableHead": function (type,newheight) {
            if ($(this).length > 0) {
                //消除固定表头对日历控件的影响
                $("#meizzCalendarLayer").css("position", "fixed");

                $(".auth_keybord").css({
                    "position": "fixed",
                    "z-index": "1000"
                });

                $(window).off("scroll.winScroll");
                $(window).off("scroll.divScroll");
                $(window).off("resize.winResize");
                //消除固定表头对日历控件的影响
                $("#meizzCalendarLayer").css("position", "fixed");
                $("#newTableId").remove();
                //$(this)表调用方法的元素
                var oldTableId = $(this);
                var scrollTimer;
                var oldheadertop = 0;
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
                    oldTableId.parent().append(newtable.html(newtable.children("thead")));
                   
                } else {

                    // 无thead，原理同上
                    oldTableId.parent().append(newtable.html(newtable.find("tr").eq(0)))
                    
                }
                // 新表头的位置，默认不显示
                $("#newTableId").css({
                    "position": "fixed",
                    "left": oldheaderleft,
                    "width": oldheaderwidth,
                    "display": "none",
                    "z-index": 100
                })
                //确定新表头的高度
                newheight = ResizeHeight(oldTableId, newheight);

                //窗口大小改变时，对应表头宽度进行自适应
                $(window).on("resize.winResize", function winResize() {
                    // 重新计算表头宽高与位置
                    handleResize(oldTableId, newheight);

                });

                // 当表头超出窗口宽度时，出现滚动条，新加的表头需要跟随滚动条移动
                //这里有个问题，能不能使页面中的表格固定表头，这样的话就要监听表格的父div或者其他有滚动条的父div，感觉很不清晰的样子
                if(type ==="divScroll"){
                    //外层滚动
                    oldTableId.parent().on("scroll.divScroll", function divScroll() {
                        //$(window).off("scroll", handleScroll)
                        // scroll优化
                      
                        clearTimeout(scrollTimer);
                        scrollTimer = setTimeout(function () {
                            newheight  = oldTableId.parent().offset().top;
                            handleResize(oldTableId, newheight)
                            //当表头的位置超过新表头显示的位置，新表头出现
                            //oldTableId.offset().top 老位置 ，newheight 新位置 ，$(window).scrollTop()滚动高度（递增）
                            var dist = oldTableId.parent().scrollTop();
                            if (dist > 0) {
                                $("#newTableId").fadeIn();
                            } else {
                                $("#newTableId").hide();
                            }
                        }, 250);

                        // 原表头距离左侧的宽度
                        var w = oldTableId.offset().left;
                        // 横向滚动条滚动的距离
                        var c = $(this).scrollLeft();
                        // 横向滚动处理
                        $("#newTableId").css({
                            "left": -c + w
                        })
                    })
                }else{
                    $(window).on("scroll.winScroll", function winScroll() {
                        //$(window).off("scroll", handleScroll)
                        // scroll优化
                        clearTimeout(scrollTimer);
                        scrollTimer = setTimeout(function () {
                            handleResize(oldTableId, newheight)
                            //当表头的位置超过新表头显示的位置，新表头出现
                            //oldTableId.offset().top 老位置 ，newheight 新位置 ，$(window).scrollTop()滚动高度（递增）
                            var newheight2;
                            if (newheight == undefined) { newheight2 = oldTableId.offset().top } else { newheight2 = newheight }
                            var dist = oldTableId.offset().top - newheight2 - $(window).scrollTop();
                            if (dist < 0) {
                                $("#newTableId").fadeIn();
                            } else {
                                $("#newTableId").hide();
                            }
                        }, 250);

                        // 原表头距离左侧的宽度
                        var w = oldTableId.offset().left;
                        // 横向滚动条滚动的距离
                        var c = $(this).scrollLeft();
                        // 横向滚动处理
                        $("#newTableId").css({
                            "left": -c + w
                        })
                    })
                }
            }
            
        },
        // 固定搜索栏，实现原理：将搜索栏变为fixed，然后添加bcg占位
        "fillHead": function () {
            var scrollTimerSearch;
            $(window).off("resize.winResizeSearch");
            $(window).off("scroll.winScrollSearch");
            $(".fillHeadbcg").remove();
            var fillHead = $(this);
            // 搜索栏样式改变
            fillHead.css({
                "position": "fixed",
                "top": 0,
                "width": "100%",
                "background-color": "#fff",
                "z-index": 101
            });
            // 搜索栏变为fixed之后bcg替它占位
            fillHead.before('<div class="fillHeadbcg"></div>');
            $(".fillHeadbcg").height(fillHead.innerHeight());
            $(".fillHeadbcg").css({
                "position": "relative",
                "top": 0,
                "left": 0,
                "width": "100%",
                "background-color": "#fff"
            })
            // 窗口大小改变时，对应固定栏高度进行自适应
            $(window).on("resize.winResizeSearch", function winResizeSearch() {
                $(".fillHeadbcg").height(fillHead.innerHeight());
            });
            // 窗口滚动时，对应固定栏高度进行自适应
            $(window).on("scroll.winScrollSearch", function winScrollSearch() {
                clearTimeout(scrollTimerSearch);
                scrollTimerSearch = setTimeout(function () {
                    $(".fillHeadbcg").height(fillHead.innerHeight());
                }, 200)
            });
        }
    });
})(jQuery);

// 处理窗口大小改变
function handleResize(oldTableId, newheight) {
    ResizeHeight(oldTableId, newheight);
    $("#newTableId").width(oldTableId.outerWidth());
    if (oldTableId.children("thead").length > 0) {
        var newTr = $("#newTableId").find('tr');
        for (var i = 0; i < newTr.length; i++) {
            var element = newTr.eq(i)
            element.css('height', oldTableId.find('tr').eq(i).height());
            for (var j = 0; j < element.find("th").length; j++) {
                var elementTh = element.find("th").eq(j);
                elementTh.width(oldTableId.find('tr').eq(i).find('th:eq(' + j + ')').width())
            }
        }
    } else {
        var element = $("#newTableId").find('tr').eq(0)
        element.css('height', oldTableId.find('tr').eq(0).height());
        for (var j = 0; j < element.find("th").length; j++) {
            var elementTh = element.find("th").eq(j);
            elementTh.width(oldTableId.find('tr').eq(0).find('th:eq(' + j + ')').width())
        }
    }
}
//新表头高度
function ResizeHeight(oldTableId, newheight) {
    if (newheight == undefined) {
        $("#newTableId").css({
            "top": oldTableId.offset().top
        })
    } else {
        $("#newTableId").css({
            "top": newheight
        })
    }

    return newheight;


}


function ieBrowser() {
    var browser = navigator.appName;
    var version = navigator.appVersion.split(";")[1].replace(/[ ]/g,"");
    if(browser == "Microsoft Internet Explorer" && version == "MSIE6.0") { 
        return "6";
    } else if(browser == "Microsoft Internet Explorer" && version == "MSIE7.0") { 
        return "7";
    } else if(browser == "Microsoft Internet Explorer" && version == "MSIE8.0") { 
        return "8";
    }
}

