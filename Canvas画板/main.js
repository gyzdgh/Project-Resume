var behavior = document.getElementById('sket');
var context = behavior.getContext('2d');
var lineWidth = 5
autoSetCanvasSize(behavior)

listenToUser(behavior)


var eraserEnabled = false
    pen.onclick = function(){
        eraserEnabled = false
        pen.classList.add('active')
        eraser.classList.remove('active')
    }
        
    eraser.onclick = function(){
        eraserEnabled = true
        eraser.classList.add('active')
        pen.classList.remove('active')
    }
    clear.onclick = function(){
        context.clearRect(0, 0, behavior.width, behavior.height); 
    }
    download.onclick = function(){
        var url = behavior.toDataURL("image/png")
        var a = document.createElement('a') 
        document.body.appendChild(a)
        a.href = url
        a.download = '作品'   
        a.target = '_blank'
        a.click()
    }


    black.onclick = function(){
        context.fillStyle = 'black'
        context.strokeStyle = 'black'
        black.classList.add('active')
        red.classList.remove('active')
        blue.classList.remove('active')
        green.classList.remove('active')
        pink.classList.remove('active')
        purple.classList.remove('active')
    }
    red.onclick = function(){
        context.fillStyle = 'red'
        context.strokeStyle = 'red'
        red.classList.add('active')
        blue.classList.remove('active')
        green.classList.remove('active')
        black.classList.remove('active')
        pink.classList.remove('active')
        purple.classList.remove('active')
    }   
    blue.onclick = function() {
        context.fillStyle = 'blue'
        context.strokeStyle = 'blue'
        red.classList.remove('active')
        blue.classList.add('active')
        green.classList.remove('active')
        black.classList.remove('active')
        pink.classList.remove('active')
        purple.classList.remove('active')
    }
    green.onclick = function(){
        context.fillStyle = 'green'
        context.strokeStyle = 'green'
        red.classList.remove('active')
        blue.classList.remove('active')
        green.classList.add('active')
        black.classList.remove('active')
        pink.classList.remove('active')
        purple.classList.remove('active')
    }
    purple.onclick = function(){
        context.fillStyle = 'purple'
        context.strokeStyle = 'purple'
        red.classList.remove('active')
        blue.classList.remove('active')
        purple.classList.add('active')
        black.classList.remove('active')
        green.classList.remove('active')
        pink.classList.remove('active')
    }
    pink.onclick = function(){
        context.fillStyle = 'pink'
        context.strokeStyle = 'pink'
        red.classList.remove('active')
        blue.classList.remove('active')
        pink.classList.add('active')
        black.classList.remove('active')
        green.classList.remove('active')
        purple.classList.remove('active')
    }
    thin.onclick = function(){
        lineWidth = 5
        thin.classList.add('active')
        thick.classList.remove('active')
    }
    thick.onclick = function(){
        lineWidth = 10
        thin.classList.remove('active')
        thick.classList.add('active')
    }

//canvas全屏
function autoSetCanvasSize(canvas) {
    setCanvasSize()

window.onresize = function() {
    setCanvasSize()
}

function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    
    canvas.width = pageWidth
    canvas.height = pageHeight
    }
}

//画圆
function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

//画线
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1) // 起点
    context.lineWidth = lineWidth
    context.lineTo(x2, y2) // 终点
    context.stroke()
    context.closePath()
}

function listenToUser(canvas) {


var using = false
var lastPoint = {
    x: undefined,
    y: undefined
}
//特性检测
if(document.body.ontouchstart !== undefined){
//触屏设备
    canvas.ontouchstart = function(aaa){
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        using = true
        if (eraserEnabled) {
            context.clearRect(x - 10, y - 10, 20, 20)
        } else {
            lastPoint = {
            "x": x,
            "y": y
            }
        }
    }
    canvas.ontouchmove = function(aaa){
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY

        if (!using) {return}

        if (eraserEnabled) {
            context.clearRect(x - 10, y - 10, 20, 20)
        } else {
            var newPoint = {
            "x": x,
            "y": y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    }
    canvas.ontouchend = function(){
        using = false
    }
}else{
//非触屏设备
//点击鼠标
    canvas.onmousedown = function(aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        using = true
        if (eraserEnabled) {
            context.clearRect(x - 10, y - 10, 20, 20)
        } else {
            lastPoint = {
            "x": x,
            "y": y
            }
        }
    }
    //移动鼠标
    canvas.onmousemove = function(aaa) {
        var x = aaa.clientX
        var y = aaa.clientY

        if (!using) {return}

        if (eraserEnabled) {
            context.clearRect(x - 10, y - 10, 20, 20)
        } else {
            var newPoint = {
            "x": x,
            "y": y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    }
    //松开鼠标
    canvas.onmouseup = function(aaa) {
        using = false
            }
        }
    }
