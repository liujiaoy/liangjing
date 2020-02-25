//取消checkbox冒泡
$(function () {
    $("input[type='checkbox']").click(function (e) {
        e.stopPropagation();
    });
    $(".opsTd").children().click(function (e) {
        e.stopPropagation();
    });
})
// 这里碰到一个问题，把这个方法写在前面的时候不生效是为什么呢