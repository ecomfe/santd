/**
 * @file 组件 message
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/message-cn/
 */

import './style/index.less';
import {classCreator, type} from '../core/util';
import Notification from '../notification/Notification';

const noop = () => {}; // empty function
const prefixCls = classCreator('message')();
let messageInstance;
let key = 1;

let defaultDuration = 3;
let defaultGetContainer = () => document.body;
let defaultMaxCount;
let defaultTop;
let defaultTransitionName = 'move-up';

function getMessageInstance(callback = noop) {
    if (messageInstance) {
        callback(messageInstance);
        return;
    }

    Notification.newInstance({
        prefixCls,
        transitionName: defaultTransitionName,
        style: {top: `${defaultTop}px`}, // 覆盖原来的样式
        getContainer: defaultGetContainer,
        maxCount: defaultMaxCount
    }, instance => {
        if (messageInstance) {
            callback(messageInstance);
            return;
        }
        messageInstance = instance;
        callback(instance);
    });
}

function notice(args) {
    const duration = args.duration !== undefined ? args.duration : defaultDuration;
    const iconType = ({
        info: 'info-circle',
        success: 'check-circle',
        error: 'close-circle',
        warning: 'exclamation-circle',
        loading: 'loading'
    })[args.type];

    const target = key++;
    const closePromise = new Promise(resolve => {
        const callback = () => {
            if (type(args.onClose, 'function')) {
                args.onClose();
            }
            return resolve(true);
        };
        getMessageInstance(instance => {
            const className = args.type ? ` ${prefixCls}-${args.type}` : '';
            const defaultIcon = `
                <s-icon type="${iconType}" theme="${iconType === 'loading' ? 'outlined' : 'filled'}"/>
            `;
            const iconNode = args.icon ? args.icon : iconType ? defaultIcon : '';
            instance.notice({
                key: target,
                duration,
                style: {},
                content: `
                    <div class="${prefixCls}-custom-content${className}">
                        ${iconNode}
                        <span>${args.content}</span>
                    </div>
                `,
                onClose: callback
            });
        });
    });
    const result = () => {
        if (messageInstance) {
            messageInstance.removeNotice(target);
        }
    };
    result.then = (filled, rejected) => closePromise.then(filled, rejected);
    result.promise = closePromise;
    return result;
}

const MessageApi = {
    open: notice,
    config(options) {
        if (options.top !== undefined) {
            defaultTop = options.top;
            messageInstance = null; // delete messageInstance for new defaultTop
        }
        if (options.duration !== undefined) {
            defaultDuration = options.duration;
        }
        if (options.prefixCls !== undefined) {
            prefixCls = options.prefixCls;
        }
        if (options.getContainer !== undefined) {
            defaultGetContainer = options.getContainer;
        }
        if (options.transitionName !== undefined) {
            defaultTransitionName = options.transitionName;
            messageInstance = null; // delete messageInstance for new defaultTop
        }
        if (options.maxCount !== undefined) {
            defaultMaxCount = options.maxCount;
            messageInstance = null; // delete messageInstance for new defaultTop
        }
    },
    destroy() {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
    }
};

['success', 'info', 'warning', 'error', 'loading'].forEach(type => {
    MessageApi[type] = (content, duration, onClose) => {
        if (typeof duration === 'function') {
            onClose = duration;
            duration = undefined;
        }
        return MessageApi.open({content, duration, type, onClose});
    };
});

MessageApi.warn = MessageApi.warning;

export default MessageApi;
