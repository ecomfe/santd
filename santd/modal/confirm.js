/**
 * @file 组件 modal/confirm
 * @author baozhixin <baozhixin@baidu.com>
 */

import ConfirmDialog from './ConfirmDialog';

export default function confirm(config) {
    let currentConfig = {...config, close, visible: true};
    let dialog = new ConfirmDialog({
        data: currentConfig
    });

    dialog.attach(document.body);

    function close(...args) {
        currentConfig = {
            ...currentConfig,
            visible: false,
            afterClose: destroy.bind(this, ...args)
        };

        update(currentConfig);
    }

    function destroy(...args) {
        if (!dialog) {
            return;
        }

        dialog.dispose && dialog.dispose();
        dialog = null;

        const triggerCancel = args.some(param => param && param.triggerCancel);
        if (config.onCancel && triggerCancel) {
            config.onCancel(...args);
        }
    }

    function update(newConfig) {
        if (!dialog) {
            return;
        }

        currentConfig = {
            ...currentConfig,
            ...newConfig
        };

        Object.keys(currentConfig).forEach(key => {
            dialog.data.set(key, currentConfig[key]);
        });
    }

    return {
        destroy: close,
        update
    };
}
