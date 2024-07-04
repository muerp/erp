import Clipboard from 'clipboard'
import { ElNotification } from 'element-plus'

export default {
    beforeMount(el: any, binding: any) {
        if (binding.arg === 'success') {
            el._v_clipboard_success = binding.value
        } else if (binding.arg === 'error') {
            el._v_clipboard_error = binding.value
        } else {
            const clipboard = new Clipboard(el, {
                text() {
                    return binding.value
                },
                action() {
                    return binding.arg === 'cut' ? 'cut' : 'copy'
                }
            })
            clipboard.on('success', e => {
                const callback = el._v_clipboard_success
                ElNotification({
                    message: "复制成功",
                    type: "success",
                    showClose: false,
                    duration: 1000,
                });
                callback && callback(e)
            })
            clipboard.on('error', e => {
                const callback = el._v_clipboard_error
                callback && callback(e)
            })
            el._v_clipboard = clipboard
        }
    },
    beforeUpdate(el: any, binding: any) {
        if (binding.arg === 'success') {
            el._v_clipboard_success = binding.value
        } else if (binding.arg === 'error') {
            el._v_clipboard_error = binding.value
        } else {
            el._v_clipboard.text = function () {
                return binding.value
            }
            el._v_clipboard.action = function () {
                return binding.arg === 'cut' ? 'cut' : 'copy'
            }
        }
    },
    unmounted(el: any, binding: any) {
        if (binding.arg === 'success') {
            delete el._v_clipboard_success
        } else if (binding.arg === 'error') {
            delete el._v_clipboard_error
        } else {
            el._v_clipboard.destroy()
            delete el._v_clipboard
        }
    }
}

