/**
 * Created by Administrator on 2016/7/1.
 */

define('EventHandle',function(){
    var EventHandle={};

    EventHandle.on=function(dom,eventType,listener,isCpature){
         if(dom.addEventListener){
             dom.addEventListener(eventType,listener,isCpature)
         }else if(dom.attachEvent){
             dom.attachEvent('on'+eventType,listener)
         }else{
             dom['on'+eventType]=listener;
         }
    };
    EventHandle.off=function(dom,eventType,listener,isCapture){
         if(dom.removeEventListener){
             dom.removeEventListener(eventType,listener,isCapture);
         }else if(dom.detachEvent){
             dom.detachEvent('on'+eventType,listener)
         }else{
             dom['on'+eventType]=null;
         }
    };

    return EventHandle;
});