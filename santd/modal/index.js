/**
 * @file 组件 modal
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/modal-cn/
 */

import Modal from './Modal';
import confirm from './confirm';

const iconMaps = {
    info: 'info-circle',
    success: 'check-circle',
    error: 'close-circle',
    warning: 'exclamation-circle'
};

['success', 'info', 'warning', 'error'].forEach(type => {
    Modal[type] = props => {
        const iconType = iconMaps[type];
        const config = {
            type,
            iconType,
            okCancel: false,
            ...props
        };

        return confirm(config);
    };
});

Modal.warn = Modal.warning;

Modal.confirm = props => {
    const config = {
        type: 'confirm',
        okCancel: true,
        ...props
    };

    return confirm(config);
};

export default Modal;
