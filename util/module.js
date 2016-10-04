/**
 * Created by Administrator on 2016/6/30.
 */

(function (g) {
    var Global = g,
        UTIL = g.UTIL,
        MODULE = {
            store: {},//存储模块化组价对象
            require: function (requireModules, fn) {
                var _this = this,
                    relyArr = [];
                if (arguments.length == 1) {
                    if(!UTIL.isString(requireModules)){
                        throw new Error('依赖名必须为字符串');
                    }
                    if(!this.store[requireModules]){
                        throw new Error('依赖未定义')
                    }
                    return this.store[requireModules];
                }
                else if (arguments.length == 2) {
                    if (!UTIL.isArray(requireModules)) {
                        throw new Error('依赖必须为数组')
                    }
                    if (!UTIL.isFunction(fn)) {
                        throw new Error('最后一个参数必须为函数');
                    }
                    UTIL.forEach(requireModules, function (item) {
                        if (!_this.store[item]) {
                            throw new Error('module ' + item + "未定义");
                        }
                        relyArr.push(_this.store[item]);
                    });
                    return fn.apply(this, relyArr);
                }
            },
            define: function (moduleName, relyModules, cb) {
                var _this = this,
                    mName = arguments[0],
                    rely,
                    callback;
                if (arguments.length == 2) {
                    callback = arguments[1];
                    if (!UTIL.isFunction(callback)) {
                        throw new Error('参数有误,最后一个参数必须为函数')
                    }
                    _this.store[mName] = callback();
                }
                else if (arguments.length == 3) {
                    var paramsArr = [];
                    rely = arguments[1];
                    callback = arguments[2];
                    if (!UTIL.isArray(rely)) {
                        throw new Error('参数有误,依赖必须为数组')
                    }
                    if (!UTIL.isFunction(callback)) {
                        throw new Error('参数有误,最后一个参数必须为函数')
                    }
                    UTIL.forEach(rely, function (item) {
                        if (!_this.store[item]) {
                            throw new Error('module ' + item + '未定义');
                        }
                        paramsArr.push(_this.store[item]);
                    });
                    _this.store[mName] = callback.apply(this, paramsArr);
                    if (!_this.store[mName]) {
                        throw new Error('module ' + mName + '定义返回值为空')
                    }
                } else {
                    throw new Error('定义模块要求2或3个参数');
                }


            }
        };
    g.store=MODULE.store;
    g.require=MODULE.require;
    g.define=MODULE.define;
})(window);