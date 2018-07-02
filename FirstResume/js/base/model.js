//调用方法
/*
  var model = Model({
      resourceName:'表名'
  })
 */

window.Model = function (options) {
    let resourceName = options.resourceName
    return {
        init: function () {
            //初始化
            var APP_ID = 'sJHeF1RwlFz0Xw82oUj4x7GG-gzGzoHsz';
            var APP_KEY = 'OYCzA5DY3no5tsgYeNu7W4au';
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        fetch: function(){
            var query = new AV.Query(resourceName);
            //找到所有的数据
            return query.find()     //Promise对象
        },
        save: function(object){
            var X = AV.Object.extend(resourceName);
            var x = new X();
            return x.save(object)
        }
    }
};