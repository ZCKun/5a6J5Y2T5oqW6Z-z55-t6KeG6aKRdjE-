var getTime = function() {return new Date(Date.now()).toLocaleTimeString()}
String.prototype.format = function () {
    var values = arguments;
    return this.replace(/\{(\d+)\}/g, function (match, index) {
        if (values.length > index) {
            return values[index];
        } else {
            return "";
        }
    });
}
//var list2str = function(_list) {
//    var retval = '';
//    for (var i = 0; i < _list.size(); i++) {
//        retval += 
//    }
//}


Java.perform(function() {
    var cls_t = Java.use('c.t');
    var cls_t_a = Java.use('c.t$a');
    var cls_b = Java.use('com.ss.android.ugc.aweme.f.a.b');
    var StringBuilder = Java.use('java.lang.StringBuilder');


    cls_b.a.implementation = function(t) {
        console.log('..........');
        var set = t.n();
        var set_array = set.toArray();
        console.log(set_array);
        var params = {};
        for (var i = 0; i < set_array.length; i++) {
            console.log(set_array[i], ': ',  t.c(set_array[i]))
        }
//        console.log('[cls_b.a] params: ', params);
//        console.log('[cls_b.a] t.toString: ', t.toString());
        console.log('..........\n');
        return this.a(t);
    }
/*
    cls_t.n.implementation = function() {
        console.log('&&&&&&&&&&');
        var retval = this.n();
        console.log('[cls_t.toString] retval:', retval.toArray().toString());
        console.log('&&&&&&&&&&\n');
        return retval;
    }

    cls_t_a.toString.implementation = function() {
        console.log('----------');
        var retval = this.toString();
        //console.log('[cls_t_a.toString] retval:', retval);
        //return retval;
        //console.log('----------\n')
        console.log('[{0}][cls_t_a.toString] thid.a value 传输协议: [{1}]'.format(getTime(), this._a.value));
//        console.log('[{0}][cls_t_a.toString] this.b: [{1}]'.format(getTime(), this._b.value));
//        console.log('[{0}][cls_t_a.toString] this.c: [{1}]'.format(getTime(), this._c.value));
        console.log('[{0}][cls_t_a.toString] this.d value 域名: [{1}]'.format(getTime(), this._d.value));
        var list_f = this._f.value;
        var f = '';
        for (var i = 0; i < list_f.size(); i++) {
            f += '/{0}'.format(list_f.get(i));
        }
        console.log('[{0}][cls_t_a.toString] this.f value toString: [{1}]'.format(getTime(), f));
        var g = '';
        var list_g = this._g.value;
        for (var i = 0; i < list_g.size(); i+=2) {
            var str = list_g.get(i);
            var str2 = list_g.get(i+1);
            if (i > 0) {
                g += '&';
            }
            g += str;
            if (str2 != null) {
                g += '=';
                g += str2;
            }
        }
        console.log('[{0}][cls_t_a.toString] this.g value: [{1}]'.format(getTime(), g));
        //var retval = this.toString();


//        console.log('[{0}][cls_t_a.toString] this.a method: [{1}]'.format(getTime(), this.a()));
//        console.log('[{0}][cls_t_a.toString] t.a method: [{1}]'.format(getTime(), cls_t.a(this._a.value)));
        console.log('----------\n')
        return this.toString();
    }
*/
});
