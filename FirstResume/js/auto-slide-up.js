!function () {
    //添加offset类
    let specialTags = document.querySelectorAll('[data-x]')
    for (let i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add('offset')
    }

    findClosestAndRemoveOffest()
    window.addEventListener("scroll", function (x) {
        findClosestAndRemoveOffest()
    })

    // help
    function findClosestAndRemoveOffest() {
        let specialTags = document.querySelectorAll('[data-x]')  //获取页面标记的标签
        let minIndex = 0
        for (let i = 1; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
                minIndex = i
            }
        }
        //minIndex 这里是离窗口最近的元素
        specialTags[minIndex].classList.remove('offset')
        let id = specialTags[minIndex].id
        let a = document.querySelector('a[href="#' + id + '"]')
        let li = a.parentNode
        let brothersAndme = li.parentNode.children
        for (let i = 0; i < brothersAndme.length; i++) {
            brothersAndme[i].classList.remove('highlight')
        }
        li.classList.add('highlight')
    }
}.call()
