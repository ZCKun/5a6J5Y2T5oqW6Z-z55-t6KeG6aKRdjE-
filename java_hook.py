import frida
import sys


if __name__ == '__main__':
    jscode = open('java_script.js', 'r').read()
    process = frida.get_usb_device().attach('com.ss.android.ugc.aweme')
    script = process.create_script(jscode)
    print('[*] Running CTF')
    script.load()
    sys.stdin.read()
