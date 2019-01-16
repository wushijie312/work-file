//修改

function fontSize(px) {
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    var oHtml = document.querySelector("html");
    var oBody = document.querySelector("body");
    px = px || 1080;
    var fontsize;
    if (winWidth < 320) {
        fontsize = 20;
    } else if (320 <= winWidth && winWidth <=414) {
        fontsize = 20;
    }else {
        fontsize = px * 0.0625;//46.875
    }
    oHtml.style.fontSize = fontsize + "px";
    if(oBody){
        oBody.style.width = winWidth + "px";
        oBody.style.height = winHeight + "px";
    }
    $(".all_bomb_cont").css({height:winHeight-$(".home_head").outerHeight()});
    return fontsize;
}






//原有

// var winWidth = window.innerWidth;
// var winHeight = window.innerHeight;
// var oHtml = document.querySelector("html");
// var oBody = document.querySelector("body");
//
// function fontSize(px) {
//     px = px || 1080;
//     var fontsize;
//     if (winWidth < 320) {
//         fontsize = 10;
//     } else if (320 <= winWidth && winWidth <= 750) {
//         fontsize = winWidth * 0.0625;
//     } else {
//         fontsize = px * 0.0625;//46.875
//     }
//     oHtml.style.fontSize = fontsize + "px";
//     if (winWidth == 414) {
//         oHtml.dataset.dpr = 3;
//         fontsize = winWidth * 2 / 3 * 0.0625 + "px";
//     } else {
//         oHtml.dataset.dpr = 2;
//     }
//     if(oBody){
//         oBody.style.width = winWidth + "px";
//         oBody.style.height = winHeight + "px";
//     }
//     return fontsize;
// }
// fontSize(750);
