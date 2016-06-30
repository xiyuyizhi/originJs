/**
 * Created by Administrator on 2016/6/30.
 */

(function(g){
    var UTIL= g.UTIL,
        MODULE={
        store:{},//存储模块化组价对象
        require:function(requireModules,fn){

        },
        define:function(moduleName,relyModules,cb){
            var _this=this,
                mName=arguments[0],
                rely,
                callback;
            if(arguments.length==2){
                callback=arguments[1];
                if(!UTIL.isFunction(callback)){
                    throw new Error('参数有误,最后一个参数必须为函数')
                }
                 _this.store[mName]=callback();
            }
            else if(arguments.length==3){
                var paramsArr=[];
                rely=arguments[1];
                callback=arguments[2];
                if(!UTIL.isArray(rely)){
                    throw new Error('参数有误,依赖必须为数组')
                }
                if(!UTIL.isFunction(callback)){
                    throw new Error('参数有误,最后一个参数必须为函数')
                }
                console.log(rely.forEach);
                UTIL.forEach(rely,function(item){
                     console.log(item);
                    if(!_this.store[item]){
                        throw new Error('module '+item +'没有定义');
                    }
                    paramsArr.push(_this.store[item]);
                });
                _this.store[mName]=callback.apply(this,paramsArr);
                if(!_this.store[mName]){
                    throw new Error('module '+mName+'定义返回值为空')
                }
            }else{
                throw new Error('定义模块要求2或3个参数');
            }


        }
    };

    g.MODULE=MODULE;
})(window);