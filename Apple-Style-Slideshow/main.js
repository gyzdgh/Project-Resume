let buttons = $('.container .buttons ul li')
let n = 0
let size = buttons.length
for(let i = 0; i < size; i++){
    $(buttons[i]).on('click',function(e){
        let index = i
        let slideWidth = i * -920
        slide(slideWidth)
        activeButton(i)
        n = index
    })
}
function slide(slideWidth){
    $('.images').css({
        transform: `translateX(${slideWidth}px)`
    })
}
function activeButton(i){
    buttons.eq(i).addClass('active').siblings('.active').removeClass('active')
}