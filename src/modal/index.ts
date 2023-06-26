/**
 * @file 组件 modal
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/modal-cn/
 */

import Modal from './Modal';
import confirm from './confirm';
import * as I from './interface';

const iconMaps = {
    info: 'info-circle',
    success: 'check-circle',
    error: 'close-circle',
    warning: 'exclamation-circle'
};

['success', 'info', 'warning', 'error'].forEach(type => {
    (Modal as any)[type] = (props: any[]) => {
        const iconType = (iconMaps as any)[type];
        const config = {
            type,
            iconType,
            okCancel: false,
            ...props
        };

        return confirm(config);
    };
});

(Modal as unknown as I.ModalType).warn = (Modal as unknown as I.ModalType).warning;

(Modal as unknown as I.ModalType).confirm = (props: any[]) => {
    const config = {
        type: 'confirm',
        okCancel: true,
        ...props
    };

    return confirm(config);
};

export default Modal;
