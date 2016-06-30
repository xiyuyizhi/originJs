/**
 * Created by Administrator on 2016/6/30.
 */

(function(){
     beforeEach(function(){

     });

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



})();