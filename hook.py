import frida
import sys


def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)


if __name__ == '__main__':
    #jscode = open('java_script.js', 'r').read()
    #jscode = open('java_script2.js', 'r').read()
    # jscode = open('native_3e9f4.js', 'r').read()
    # jscode = open('3fcc8_hook.js', 'r').read()
    # jscode = open('3f044_hook.js', 'r').read()
    # jscode = open('11828_hook.js', 'r').read()
    # jscode = open('3e4d4_hook.js', 'r').read()
    jscode = open('params_process_hook.js', 'r').read()
    process = frida.get_usb_device().attach('com.ss.android.ugc.aweme')
    script = process.create_script(jscode)
    script.on('message', on_message)
    print('[*] Running CTF')
    script.load()
    sys.stdin.read()
