/**
 * Created by Administrator on 2016/6/30.
 */

(function(w){

    var UTIL={};
    UTIL.isArray=function(arr){
        return Object.prototype.toString.call(arr)=='[object Array]';
    };
    UTIL.isFunction=function(fn){
        return Object.prototype.toString.call(fn)=='[object Function]';
    };
    UTIL.isString=function(str){
        return typeof str=='string';
    };
    //IE67不支持getElementsByClassName
    UTIL.getElementsByClassName=function(dom,seletor){
        var eles,
            nodeList=[],
            reg=new RegExp('^\\s*'+seletor+"|\\s*"+seletor+'\\s*$'),
            classname=seletor.slice(1);
        eles=dom.getElementsByTagName('*');
        for(var i=0;i<eles.length;i++){
            if(reg.test(eles[i].className)){
                nodeList.push(eles[i])
            }
        }
        return eles;
    };

//ie8及以下不支持forEach
    UTIL.forEach=function(arr,cb){
        if(arr.forEach){
            arr.forEach(cb);
        }else{
            for(var i=0;i<arr.length;i++){
                cb(arr[i],i);
            }
        }
    };
    UTIL.browser=function(){
      var userAgent=window.navigator.userAgent,
          IEPatten=/MSIE\s*(\d+)/,
          chromePatten=/Chrome\/(\d+)/,
          FFPattten=/Firefox\/(\d+)/;
        console.log(userAgent);
         return {
             isIE:IEPatten.test(userAgent)&&IEPatten.exec(userAgent)[1],
             isChrome:chromePatten.test(userAgent),
             isFF:FFPattten.test(userAgent)
         }
    };


    w.UTIL=UTIL;

})(window)

