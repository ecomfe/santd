/**
 * @file 组件 notification
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/notification-cn/
 */

import './style/index.less';
import Notification from './Notification';
import * as I from './interface';

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

function setNotificationConfig(options: I.NotificationConfigType) {
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

function getPlacementStyle(placement: string) {
    let style: I.PlacementStyle;
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
        if (!isNaN((style as any)[k]) && (style as any)[k] !== 0) {
            (style as any)[k] += 'px';
        }
    });

    return style;
}

function getNotificationInstance(prefixCls: string, closeIcon: Element, placement: string, callback: I.callbackType) {
    const cacheKey = `${prefixCls}-${placement}`;
    let closeIconNode = `<s-icon slot="close-icon" class="${prefixCls}-close-icon" type="close"/>`;

    if ((notificationInstance as any)[cacheKey]) {
        callback((notificationInstance as any)[cacheKey]);
        return;
    }
    // 自定义关闭按钮
    if (closeIcon) {
        closeIconNode = `<span slot="close-icon">${closeIcon}</span>`;
    }

    (Notification as unknown as I.NotificationType).newInstance({
        prefixCls,
        className: `${prefixCls}-${placement}`,
        style: getPlacementStyle(placement),
        getContainer: defaultGetContainer,
        closeIcon: closeIconNode
    }, notification => {
        (notificationInstance as any)[cacheKey] = notification;
        callback(notification);
    });
}

function notice(args: I.NotificationConfigType) {
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
        closeIcon,
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
        const iconType = (typeToIcon as any)[type];
        iconNode = `<s-icon class="${prefixCls}-icon ${prefixCls}-icon-${type}" type="${iconType}"/>`; // mark
    }

    const autoMarginTag = !description && iconNode
        ? `<span class="${prefixCls}-message-single-line-auto-margin"/>`
        : '';

    const btnNode = btn ? `<span class="${prefixCls}-btn">${btn}</span>` : '';

    const contentClass = iconNode ? `${prefixCls}-with-icon` : '';

    getNotificationInstance(outerPrefixCls, closeIcon, placement, notification => {
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
    close(key: string) {
        Object.keys(notificationInstance).forEach(cacheKey => (notificationInstance as any)[cacheKey].removeNotice(key));
    },
    destroy() {
        Object.keys(notificationInstance).forEach(cacheKey => {
            (notificationInstance as any)[cacheKey].destroy();
            delete (notificationInstance as any)[cacheKey];
        });
    },
    warn: null,
    warning: null,
};

['success', 'info', 'warning', 'error'].forEach(type => {
    (NotificationApi as any)[type] = (args: I.NotificationConfigType) => NotificationApi.open({
        ...args,
        type
    });
});

NotificationApi.warn = NotificationApi.warning;

export default NotificationApi;
