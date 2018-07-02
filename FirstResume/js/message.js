!function () {
    var model = Model({ resourceName: 'Message' })
    //展示内容
    var view = View('section.message')

    var controller = Controller({
        messageList: null,
        form: null,
        init: function (view, controller) {
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.loadMessages()
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
                        li.innerText = `${item.name}: ${item.content}`
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
            this.form.addEventListener('submit', (e) => {
                //阻止默认事件
                e.preventDefault()
                if (this.form.querySelector('input[name=content]').value.length > 0) {
                    this.saveMessage()
                }
            })
        },
        saveMessage: function () {
            let myForm = this.form
            //获取内容等于用户输入的内容
            let content = myForm.querySelector('input[name=content]').value;
            let name = myForm.querySelector('input[name=name]').value;
            this.model.save({
                'name': name, 'content': content
            }).then(function (object) {
                //更新页面留言
                let li = document.createElement('li')
                //li标签的内容设置为输入的数据内容
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                //在页面中根据id找到生成的位置标签
                let messageList = document.querySelector('#messageList')
                //生成一个li标签
                messageList.appendChild(li)
                //设置input的值为空
                myForm.querySelector('input[name=content]').value = ''
                myForm.querySelector('input[name=name]').value = ''
            })
        }
    })

    controller.init(view, model)

}.call()


