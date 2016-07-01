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
        it('UTIL.isString',function(){
            expect(UTIL.isString([1])).toBe(false);
            expect(UTIL.isString('123')).toBe(true)
        })
    })

    describe('test MODULE',function(){

        it('两参,依赖列表必须为数组',function(){
            expect(function(){
                MODULE.define('m1',1,1)
            }).toThrowError(/依赖必须为数组/);
        });
        it('两参,依赖要提前定义',function(){
            expect(function(){
                MODULE.define('m1',['m2'],function(){})
            }).toThrowError(/未定义/);
        });
        it('两参,最后一个参数为数组',function(){
            expect(function(){
                MODULE.define('m2',function(){
                    return {};
                })
                MODULE.define('m1',['m2'],'notFn')
            }).toThrowError(/最后一个参数必须为函数/);
        })
    })
})();