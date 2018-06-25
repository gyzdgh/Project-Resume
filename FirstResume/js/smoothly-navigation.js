!function () {
    var view = document.querySelector('nav.menu')
    var controller = {
        view: null,
        aTags: null,
        init: function (view) {
            this.view = view
            this.initAnimation()
            this.bindEvents()
        },
        initAnimation: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);   //求帧率
            }
            requestAnimationFrame(animate);
        },
        scrollToElement: function (element) {
            let top = element.offsetTop  //得到这个元素上面的距离
            let currentTop = window.scrollY  //求出当前的距离
            let targetTop = top - 80   //目标的top
            let s = targetTop - currentTop  //总的距离
            var coords = { y: currentTop };  //起始位置
            var t = Math.abs((s / 100) * 300)  //总的时间
            if (t > 500) { t = 500 }
            var tween = new TWEEN.Tween(coords)  //初始位置
                .to({ y: targetTop }, t)  // 结束位置 和 时间
                .easing(TWEEN.Easing.Quadratic.InOut)  //缓动的类型
                .onUpdate(function () {
                    window.scrollTo(0, coords.y) //如何更新页面
                })
                .start();   //开始缓动
        },
        bindEvents: function () {
            let aTags = document.querySelectorAll('nav.menu > ul > li > a')
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = (x) => {
                    x.preventDefault()  //阻止默认动作
                    let a = x.currentTarget  //获取用户点击的a标签
                    let href = a.getAttribute('href')  //获取a标签上的href
                    let element = document.querySelector(href) //根据代码得到元素
                    this.scrollToElement(element)
                }
            }
        },
    }
    let liTags = document.querySelectorAll('nav.menu > ul >li')
    for (let i = 0; i < liTags.length; i++) {
        liTags[i].onmouseenter = function (x) {
            x.currentTarget.classList.add('active')
        }
        liTags[i].onmouseleave = function (x) {
            x.currentTarget.classList.remove('active')
        }
    }

    controller.init(view)
}.call()
