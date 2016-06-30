/**
 * Created by Administrator on 2016/6/30.
 */

(function(){
    describe('test UTIL',function(){
        it('UTIL.isArray',function(){
            expect(UTIL.isArray([1])).toBe(true);
            expect(UTIL.isArray('123')).toBe(false)
        });
        it('UTIL.isFunction',function(){
            expect(UTIL.isFunction([1])).toBe(false);
            var fn=function(){};
            expect(UTIL.isFunction(fn)).toBe(true);
        });
    })

    describe('test MODULE',function(){

        it('三参,第二个参数是数组',function(){
            expect(function(){
                MODULE.define('m1',1,1)
            }).toThrowError(/参数有误/);
        });
        it('三参,依赖要先定义',function(){
            expect(function(){
                MODULE.define('m1',['m2'],function(){})
            }).toThrowError(/module.*没有定义/);
        });
        it('三参，最后一个参数为数组',function(){
            expect(function(){
                MODULE.define('m2',function(){
                    return {};
                })
                MODULE.define('m1',['m2'],'notFn')
            }).toThrowError(/必须为函数/);
        })
    })
})();