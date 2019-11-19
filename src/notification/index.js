/**
 * @file 组件 notification
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/notification-cn/
 */

import './style/index.less';
import Notification from './Notification';

let notificationInstance = {};
let defaultDuration = 4.5;
let defaultTop = 24;
let defaultBottom = 24;
let defaultPlacement = 'topRight'; // 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
let defaultGetContainer = () => document.body;

const typeToIcon = {
    success: 'check-circle',
    info: 'info-circle',
    error: 'close-circle',
    warning: 'exclamation-circle'
};

function setNotificationConfig(options) {
    const {duration, placement, bottom, top, getContainer} = options;
    if (duration !== undefined) {
        defaultDuration = duration;
    }
    if (placement !== undefined) {
        defaultPlacement = placement;
    }
    if (bottom !== undefined) {
        defaultBottom = bottom;
    }
    if (top !== undefined) {
        defaultTop = top;
    }
    if (getContainer !== undefined) {
        defaultGetContainer = getContainer;
    }
}

function getPlacementStyle(placement) {
    let style;
    switch (placement) {
        case 'topLeft':
            style = {
                left: 0,
                top: defaultTop,
                bottom: 'auto'
            };
            break;
        case 'topRight':
            style = {
                right: 0,
                top: defaultTop,
                bottom: 'auto'
            };
            break;
        case 'bottomLeft':
            style = {
                left: 0,
                top: 'auto',
                bottom: defaultBottom
            };
            break;
        default:
            style = {
                right: 0,
                top: 'auto',
                bottom: defaultBottom
            };
            break;
    }

    // 需要加单位px
    Object.keys(style).forEach(k => {
        if (!isNaN(style[k]) && style[k] !== 0) {
            style[k] += 'px';
        }
    });

    return style;
}

function getNotificationInstance(prefixCls, placement, callback) {
    const cacheKey = `${prefixCls}-${placement}`;

    if (notificationInstance[cacheKey]) {
        callback(notificationInstance[cacheKey]);
        return;
    }

    Notification.newInstance({
        prefixCls,
        className: `${prefixCls}-${placement}`,
        style: getPlacementStyle(placement),
        getContainer: defaultGetContainer,
        closeIcon: `<s-icon slot="close-icon" class="${prefixCls}-close-icon" type="close"/>`
    }, notification => {
        notificationInstance[cacheKey] = notification;
        callback(notification);
    });
}

function notice(args) {
    const {
        btn,
        className,
        description,
        icon,
        key,
        message,
        placement = defaultPlacement,
        style = {},
        type,
        onClose,
        onClick,
        ...props
    } = args;
    const outerPrefixCls = args.prefixCls || 'santd-notification';
    const prefixCls = `${outerPrefixCls}-notice`;
    const duration = args.duration === undefined ? defaultDuration : args.duration;

    let iconNode = '';
    if (icon) {
        iconNode = `<span class="${prefixCls}-icon">${icon}</span>`; // mark
    }
    else if (type) {
        const iconType = typeToIcon[type];
        iconNode = `<s-icon class="${prefixCls}-icon ${prefixCls}-icon-${type}" type="${iconType}"/>`; // mark
    }

    const autoMarginTag = !description && iconNode
        ? `<span class="${prefixCls}-message-single-line-auto-margin"/>`
        : '';

    const btnNode = btn ? `<span class="${prefixCls}-btn">${btn}</span>` : '';

    const contentClass = iconNode ? `${prefixCls}-with-icon` : '';

    getNotificationInstance(outerPrefixCls, placement, notification => {
        notification.notice({
            content: `
                <div class="${contentClass}">
                    ${iconNode}
                    <div class="${prefixCls}-message">
                        ${autoMarginTag}
                        ${message}
                    </div>
                    <div class="${prefixCls}-description">${description}</div>
                    ${btnNode}
                </div>
            `,
            closable: true,
            className,
            duration,
            key,
            style,
            onClose,
            onClick,
            ...props
        });
    });
}

const NotificationApi = {
    config: setNotificationConfig,
    open: notice,
    close(key) {
        Object.keys(notificationInstance).forEach(cacheKey => notificationInstance[cacheKey].removeNotice(key));
    },
    destroy() {
        Object.keys(notificationInstance).forEach(cacheKey => {
            notificationInstance[cacheKey].destroy();
            /* eslint-disable fecs-valid-map-set */
            delete notificationInstance[cacheKey];
            /* eslint-enable fecs-valid-map-set */
        });
    }
};

['success', 'info', 'warning', 'error'].forEach(type => {
    NotificationApi[type] = args => NotificationApi.open({
        ...args,
        type
    });
});

NotificationApi.warn = NotificationApi.warning;

export default NotificationApi;
