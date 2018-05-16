var behavior = document.getElementById('sket');
var context = behavior.getContext('2d');

autoSetCanvasSize(behavior)

listenToUser(behavior)


var eraserEnabled = false
eraser.onclick = function() {
    eraserEnabled =true
    actions.className = 'actions x'

}
brush.onclick = function(){
    eraserEnabled = false
    actions.className = 'actions'
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
    context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

//画线
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black'
    context.moveTo(x1, y1) // 起点
    context.lineWidth = 5
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
