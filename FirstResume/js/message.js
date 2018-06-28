!function () {
    var model = {
        //获取数据
        init: function () {
            //初始化
            var APP_ID = 'sJHeF1RwlFz0Xw82oUj4x7GG-gzGzoHsz';
            var APP_KEY = 'OYCzA5DY3no5tsgYeNu7W4au';
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        fetch: function () {
            var query = new AV.Query('Message');
            //找到所有的数据
            return query.find()     //Promise对象
        },
        //创建数据
        save: function (name, content) {
            //在数据库创建一个Message表
            var Message = AV.Object.extend('Message');
            //在表中创建新的一行数据
            //并保存
            var message = new Message();
            message.save({      //Promise对象
                'name': name,
                'content': content
            })
        }
    }

    //展示内容
    var view = document.querySelector('section.message')

    //控制器
    var controller = {
        view: null,
        model: null,
        messageList: null,
        //初始化方法
        init: function (view, model) {
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            //三个方法
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },

        loadMessages: function () {
            this.model.fetch().then(
                (messages) => {
                    //筛选出输入的数据用一个数组来存取
                    let array = messages.map((item) => item.attributes)
                    array.forEach((item) => {
                        //在页面中生成li标签
                        let li = document.createElement('li')
                        //li标签的内容设置为输入的数据内容
                        li.innerHTML = `${item.name}: ${item.content}`
                        //在页面中根据id找到生成的位置标签
                        // let messageList = document.querySelector('#messageList')
                        //生成一个li标签
                        this.messageList.appendChild(li)
                    })
                }
            )
        },
        bindEvents: function () {
            //创建数据库信息
            // let myForm = document.querySelector('#postMessageForm')
            //监听表单的submit事件
            this.form.addEventListener('submit', function (e) {
                //阻止默认事件
                e.preventDefault()
                console.log(1)
                this.saveMessage()
                console.log(2)
            })
        },
        saveMessage: function () {
            let myForm = this.form
            //获取内容等于用户输入的内容
            let content = myForm.querySelector('input[name=content]').value;
            let name = myForm.querySelector('input[name=name]').value;
            this.model.save(name, content).then(function (object) {
                //更新页面留言
                let li = document.createElement('li')
                //li标签的内容设置为输入的数据内容
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                //在页面中根据id找到生成的位置标签
                let messageList = document.querySelector('#messageList')
                //生成一个li标签
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ''
            })
        }
    }
    controller.init(view, model)

}.call()

