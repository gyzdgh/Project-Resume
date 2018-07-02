!function () {
    var model = {
        init() {
            //初始化
            var APP_ID = 'sJHeF1RwlFz0Xw82oUj4x7GG-gzGzoHsz';
            var APP_KEY = 'OYCzA5DY3no5tsgYeNu7W4au';
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        fetch: function () {
            var query = new AV.Query('X');
            return query.find() // Promise 对象
        },
        save: function(name){
            var Message = AV.Object.extend('X');
            var message = new Message();
            return message.save({  // Promise 对象
              'name': name
            })
        }
    }

    var view = View('#topNavBar')
    
    var controller = {
        view: null,
        init: function (view) {
            this.view = view
            this.bindEvents()
        },
        bindEvents: function () {
            var view = this.view
            window.addEventListener("scroll", (x) => {
                if (window.scrollY > 0) {   //窗口下滑
                    this.active()
                } else {
                    this.deactive() //改变class的名
                }
            })
        },
        active: function () {
            this.view.classList.add('sticky')
        },
        deactive: function () {
            this.view.classList.remove('sticky')
        }
    }
    controller.init(view)

}.call()
