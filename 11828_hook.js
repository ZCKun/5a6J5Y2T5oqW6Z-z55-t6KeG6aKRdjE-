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
// Memory.readUtf8String
var mru8s = function(addr) {return Memory.readUtf8String(addr)}
// Memory.readPointer
var mrp = function(addr) {return Memory.readPointer(addr)}
// Memory.allocUtf8String
var mau8s = function(addr) {return Memory.allocUtf8String(addr)}
// read process memory
var rpm = function(addr, size) { 
    var buf = Memory.readByteArray(ptr('0x' + addr), size);
    console.log(hexdump(buf, {
    offset: 0, 
        length: size, 
        header: true,
        ansi: false
    }));
}


var JNI_OnLoad;
var exports = Module.enumerateExportsSync("libuserinfo.so");
for (var i = 0; i < exports.length; i++) {
    var name = exports[i].name;
    var addr = exports[i].address;
    if (name == 'JNI_OnLoad') {
        JNI_OnLoad = addr;
    }
}

var BASE_ADDR = parseInt(JNI_OnLoad) - parseInt("0x14504");
var addr = '0x' + parseInt(BASE_ADDR + parseInt('0x11828')).toString(16);

var i = 0;
Interceptor.attach(new NativePointer(addr), {
    onEnter: function(args) {
        i++;
        var msg = '===============' + i + '===============\n' +
                    '参数1 > {0}\n参数2 > {1}\n参数3 > {2}\n'
                    .format(args[0], mru8s(args[1]), mru8s(args[2]));
        console.log(msg);
    },
    onLeave: function(retval) {
        console.log('retval > ', mru8s(retval));
    }
});
