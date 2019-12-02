var JNI_OnLoad;

var exports = Module.enumerateExportsSync("libuserinfo.so");
for (var i = 0; i < exports.length; i++) {
    var name = exports[i].name;
    var addr = exports[i].address;
    if (name == 'JNI_OnLoad') {
        JNI_OnLoad = addr;
    }
}

// Memory.readUtf8String
var mru8s = function(addr) {return Memory.readUtf8String(addr)}
// Memory.readPointer
var mrp = function(addr) {return Memory.readPointer(addr)}
// Memory.allocUtf8String
var mau8s = function(addr) {return Memory.allocUtf8String(addr)}

var BASE_ADDR = parseInt(JNI_OnLoad) - parseInt("0x14504");
var addr = '0x' + parseInt(BASE_ADDR + parseInt('0x3fcc8')).toString(16);

//---------- 0x3fa04 方法
var a = '0x' + parseInt(BASE_ADDR + parseInt('0x3fa04')).toString(16);
var sub_3fa04 = new NativeFunction(ptr(a), 'pointer', ['pointer', 'pointer', 'int'])
console.log("sub_3fa04 address nf > ", sub_3fa04);
console.log("sub_3fa04 address > ", a);
var p1 = mau8s("rstr");
var p2 = mau8s("rstr");
console.log("func 0x3fa04 ret > ", mru8s(sub_3fa04(p1, p2, 0)));
//---------

console.log("0x3fcc8 address > ", addr);
var ret;
var hooked = 0;
Interceptor.attach(new NativePointer(addr), {
    onEnter: function(args) {
        ret = args[0];
        var sep = mru8s(args[1]);
        var params = args[2];
        if (sep.indexOf('rstr') != -1) {
            console.log('========================');
            console.log("[onEnter] sep > ", sep);
            console.log("[onEnter] params > ", mru8s(mrp(mrp(params))));
            hooked = 1;
        }
    },
    onLeave: function(retval) {
        if (hooked == 1) {
            console.log('========================');
            console.log('\n');
        }
    }
});

// var sub_3fcc8 = new NativeFunction(addr, 'pointer', ['pointer', 'pointer', 'int']);

