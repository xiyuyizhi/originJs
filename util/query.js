/**
 * Created by Administrator on 2016/7/1.
 */

MODULE.define('Query', function () {

    function Q(seletor){
        return new Query(seletor)
    }

    function Query(seletor) {
        this.elements = [];
        if (!UTIL.isString(seletor)) {
            throw new Error('选择器必须为字符串')
        }
        this.select(seletor);
        return this;
    }
    Query.prototype.select=function(seletor){
        var pattern = /([#\.])(\S+)/;
        if(document.querySelector){
            this.elements=this.elements.concat(document.querySelectorAll(seletor));
        }
        else{
            if (/\S+\s+\S+/.test(seletor)) {
                //选择器中间有空格

            }
            else {
                //id,class,target
                var seletorArr = pattern.exec(seletor);
                if (seletorArr) {
                    //id,class
                    this.elements=this.elements.concat(this.querySelect(seletorArr[1],seletorArr[2]))
                } else {
                    //target
                    this.elements=this.elements.concat(this.querySelect('',seletor))
                }
            }
        }
    };
    Query.prototype.querySelect = function (type, select,dom) {
        var doc=dom||document;
        switch (type) {
            case '#':
                return doc.getElementById(select);
                break;
            case '.':
                //兼容IE67
                return UTIL.getElementsByClassName(doc,select);
                break;
            default :
                return doc.getElementsByTagName(select);
        }
    };

    Query.prototype.find = function (selector) {
          for(var index=0;index<this.elements.length;index++){
             this.querySelect(this.elements[index])
          }
    };


    return Q;
});