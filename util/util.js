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

    w.UTIL=UTIL;

})(window)

