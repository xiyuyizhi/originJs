/**
 * Created by Administrator on 2016/7/1.
 */

MODULE.define('Query',['EventHandle'],function (EventHandle) {

    function Q(seletor) {
        return new Query(seletor)
    }

    function Query(seletor) {
        this.elements = [];
        if (!UTIL.isString(seletor)) {
            throw new Error('选择器必须为字符串')
        }
        this.elements = this.select(seletor, document);
        return this;
    }

    Query.prototype.select = function (seletor, dom) {
        var pattern,
            doc = dom || document;
        if (document.querySelector) {
            return doc.querySelectorAll(seletor);
        }
        else {
            pattern = /([#\.])(\S+)/;
            if (/(\S+)\s+(\S+)/.test(seletor)) {
                //选择器中间有空格
                var selectArr = seletor.split(/\s+/),
                    tempQ = new Query(selectArr[0]);
                for (var i = 1; i < selectArr.length; i++) {
                    tempQ = tempQ.find(selectArr[i]);
                }
                return tempQ.elements;
            }
            else {
                //id,class,target
                var seletorArr = pattern.exec(seletor);
                if (seletorArr) {
                    //id,class
                    return this.querySelect(seletorArr[1], seletorArr[2], doc);
                } else {
                    //target
                    return this.querySelect('', seletor, doc);
                }
            }
        }
    };
    Query.prototype.querySelect = function (type, select, dom) {
        switch (type) {
            case '#':
                return [dom.getElementById(select)];
                break;
            case '.':
                //兼容IE67
                return UTIL.getElementsByClassName(dom, select);
                break;
            default :
                return dom.getElementsByTagName(select);
        }
    };

    Query.prototype.find = function (selector) {
        var parentEles = this.elements,
            _this = this;
        this.elements = [];
        UTIL.forEach(parentEles, function (itemEl) {
            var els = _this.select(selector, itemEl);
            for (var i = 0; i < els.length; i++) {
                _this.elements.push(els[i]);
            }
        });
        return this;
    };
    Query.prototype.on=function(eventType,listener,isCapture){
        UTIL.forEach(this.elements,function(ele){
            ele[eventType]=function(e){
                e.target= e.target|| e.srcElement;
                listener(e);
            };
            EventHandle.on(ele,eventType,ele[eventType],isCapture)
        })
    };
    Query.prototype.off=function(eventType,listener,isCapture){
        UTIL.forEach(this.elements,function(ele){
            EventHandle.off(ele,eventType,ele[eventType],isCapture)
        })
    };
    return Q;
});