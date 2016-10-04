/**
 * Created by Administrator on 2016/7/1.
 */

define('Query', ['EventHandle'], function (EventHandle) {

    function Query(seletor) {
        return new Query.fn.init(seletor)
    }

    Query.fn=Query.prototype={
        constructor:Query
    }

    Query.fn.init=function(seletor) {
        this.elements = [];
        if (seletor == window ||seletor==document) {
            this.elements = [seletor];
        }else if(UTIL.isFunction(seletor)){
            new Query(document).ready(seletor);
        } else{
            this.elements = this.select(seletor, document);
        }
        return this;
    };
    Query.fn.init.prototype=Query.fn;

    /**
     *原型方法
     */
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

    Query.prototype.eq = function (index) {
        var q = new Query();
        q.elements=[this.elements[index]];
        return q;
    };

    Query.prototype.html = function (html) {
        if(html){
            UTIL.forEach(this.elements,function(ele){
                ele.innerHTML=html;
            })
        }else{
            return this.elements[0].innerHTML.replace(/\s+/,'');
        }
    };

    Query.prototype.text=function(text){
        if(text){
            UTIL.forEach(this.elements,function(ele){
                ele.innerText?ele.innerText=text:ele.textContent=text;
            })
        }else{
            return (this.elements[0].innerText||this.elements[0].textContent);
        }
    };

    Query.prototype.on = function (eventType, listener, isCapture) {
        var originFn = 'originFn',
            eventTypeFn = eventType + 'Fn';
        UTIL.forEach(this.elements, function (ele) {
            ele[originFn] = ele[originFn] || [];
            ele[eventTypeFn] = ele[eventTypeFn] || [];
            ele[originFn].push(listener);
            var fn = function (e) {
                e=e|| g.event;
                e.target = e.target || e.srcElement;
                //阻止事件继续传播
                e.stopPropagation = e.stopPropagation || function () {
                        e.cancelBubble = true;//IE
                    };
                //阻止默认行为
                e.preventDefault = e.preventDefault || function () {
                        if(e.returnValue){
                            e.returnValue = false
                        }
                        return false;
                    };
                listener.call(ele, e);
            };
            ele[eventTypeFn].push(fn);
            EventHandle.on(ele, eventType, fn, isCapture);
        });
        return this;
    };

    Query.prototype.off = function (eventType, listener, isCapture) {
        var originFn = 'originFn',
            eventTypeFn = eventType + 'Fn',
            args = arguments;
        UTIL.forEach(this.elements, function (ele) {
            var index = 0;
            if (args.length == 1) {
                //移除元素指定事件类型的所有事件处理程序
                for (var i = 0; i < ele[eventTypeFn].length; i++) {
                    EventHandle.off(ele, eventType, ele[eventTypeFn][i], isCapture);
                }
                ele[originFn] = [];
                ele[eventTypeFn] = [];
            } else {
                //移除元素指定事件类型的指定事件处理程序
                UTIL.forEach(ele[originFn], function (itemListener, dex) {
                    if (itemListener == listener) {
                        index = dex;
                    }
                })
                EventHandle.off(ele, eventType, ele[eventTypeFn][index], isCapture);
                ele[originFn].splice(index, 1);
                ele[eventTypeFn].splice(index, 1);
            }
        });
        return this;
    };

    Query.prototype.hover=function(){

    };


    Query.extend=Query.fn.extend=function(){

    };

    //封装DOMContentLoaded和readystatechange事件
    Query.prototype.ready=function(fn){
        var isReady=false;
        function readyHandle(e){
            if(isReady){
                return;
            }
            if(e.type=='readystatechange' && document.readyState!=='complete'){
                return;
            }
            isReady=true;
            fn();
        }
        this.on('DOMContentLoaded',readyHandle);
        this.on('readystatechange',readyHandle)
    };
    return Query;
});