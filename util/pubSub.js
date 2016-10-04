/**
 * Created by wangWei on 2016/10/3.
 */

define('PubSub',[],function(){

   var pubsub={};

    (function(q){

        var topics={},
            subUid=-1;

        //发布事件，包含特定的主题名称和参数
        q.publish=function(topic,args){

            if(!topics[topic]){
                return false;
            }

            var subscribers=topics[topic],
                len=subscribers?subscribers.length:0;

            while(len--){
                subscribers[len].func(topic,args);
            }

            return this;
        };

        //订阅事件
        q.subscribe=function(topic,func){
            topics[topic] || (topics[topic]=[]);

            var token=(++subUid).toString();

            topics[topic].push({
                token:token,
                func:func
            });

            return token;
        };

        //取消订阅
        q.unsubscribe=function(token){
            for(var m in topics){
                if(topics[m]){
                    for(var i= 0,j=topics[m].length;i<j;j++){
                        if(topics[m][i].token===token){
                            topics[m].splice(i,1);
                            return token;
                        }

                    }
                }
            }
            return token;
        }

    })(pubsub);

    return pubsub;

});