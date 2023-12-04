/**
 * @file 组件 modal/confirm
 * @author baozhixin <baozhixin@baidu.com>
 */

import ConfirmDialog from './ConfirmDialog';
import * as I from './interface';

export default function confirm(config: I.ConfirmConfigType): I.confirmType {
    let currentConfig = {...config, close, visible: true};
    let dialog: ConfirmDialog | null = new ConfirmDialog({
        data: currentConfig
    });

    dialog.attach(document.body);

    function close(...args: any[]) {
        currentConfig = {
            ...currentConfig,
            visible: false,
            afterClose: destroy.bind(ConfirmDialog, ...args)
        };

        update(currentConfig);
    }

    function destroy(...args: any[]) {
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

    function update(newConfig: I.ConfirmConfigType) {
        if (!dialog) {
            return;
        }

        currentConfig = {
            ...currentConfig,
            ...newConfig
        };

        Object.keys(currentConfig).forEach(key => {
            dialog?.data.set(key, (currentConfig as I.ConfirmConfigType)[key]);
        });
    }

    return {
        destroy: close,
        update
    };
}
