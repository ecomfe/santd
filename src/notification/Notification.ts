/**
 * @file 组件 notification/Notification
 * @author baozhixin <baozhixin@baidu.com>
 */

import * as I from './interface';
import Base from 'santd/base';
import san from 'san';
import {addClass, removeClass} from '../core/util/dom';
import TransitionEvents from '../core/util/css-animation/Event';
import {guid} from '../core/util';
import icon from '../icon';
import button from '../button';
import Notice from './Notice';
import filters from '../modal/Dialog';

class Notification extends Base<I.NotificationState, I.NotificationProps, I.NotificationComputed> {
    static template = '<div class="{{prefixCls}}" style="{{style | css}}"></div>';
    static components = {
        's-icon': icon,
        's-button': button
    };
    static computed: I.NotificationComputed = {
        getTransitionName(this: Notification) {
            const data = this.data;
            let transitionName = data.get('transitionName');
            const animation = data.get('animation');
            const prefixCls = data.get('prefixCls');

            if (!transitionName && animation) {
                transitionName = `${prefixCls}-${animation}`;
            }

            return transitionName;
        }
    };
    filters = filters;
    fadeTrans(transitionName: string, disableTransition: boolean | undefined) {
        return {
            enter(el: HTMLElement, done: () => void) {
                if (disableTransition) {
                    done();
                    return;
                }
                const cls = [`${transitionName}-enter`, `${transitionName}-enter-active`].join(' ');
                const end = () => {
                    TransitionEvents.removeEndEventListener(el, end);
                    removeClass(el, cls);
                    done();
                };
                TransitionEvents.addEndEventListener(el, end);
                addClass(el, cls);
            },
            leave(el: HTMLElement, done: () => void) {
                if (disableTransition) {
                    done();
                    return;
                }
                const cls = [`${transitionName}-leave`, `${transitionName}-leave-active`].join(' ');
                const end = () => {
                    TransitionEvents.removeEndEventListener(el, end);
                    removeClass(el, cls);
                    done();
                };
                TransitionEvents.addEndEventListener(el, end);
                addClass(el, cls);
            }
        };
    }
    initData(): I.NotificationState {
        return {
            prefixCls: 'santd-notification',
            animation: 'fade',
            style: {
                top: '65px',
                left: '50%'
            },
            notices: {}
        };
    }
    childList: Base[] = [];
    add(notice: I.noticesType) {
        const data = this.data;
        const key = notice.key = notice.key || guid();
        const {closeIcon, maxCount, notices} = data.get();

        if (!this.childList) {
            this.childList = [];
        }

        let noticeIndex = this.childList.map(v => v && v.data.get('key')).indexOf(key);
        let method = 'push';
        if (noticeIndex !== -1) {
            notice.disableTrasition = true;
            method = 'splice';
        }
        else if (maxCount && this.childList.length >= maxCount) {
            method = 'shift';
        }

        notices![key] = notice;
        data.set('notices', notices as I.noticesType);

        this.nextTick(() => {
            const child = new Notice({
                owner: this,
                source: `<s-notice
                    s-transition="fadeTrans(getTransitionName, notices['${key}'].disableTrasition)"
                    className="{{notices['${key}'].className}}"
                    closable="{{notices['${key}'].closable}}"
                    duration="{{notices['${key}'].duration}}"
                    prefixCls="{{prefixCls}}"
                    style="{{notices['${key}'].style | css}}"
                    key="{{notices['${key}'].key}}"
                    onClose="{{notices['${key}'].onClose}}"
                >
                    ${closeIcon || ''}
                </s-notice>`
            });

            child.on('close', () => {
                this.remove(notice.key);
            });

            child.on('click', () => {
                notice.onClick && notice.onClick();
            });

            if ('splice' === method) {
                // 按key更新流程
                const oldChild: I.TBase = this.childList[noticeIndex];
                const nextSibling = oldChild.el!.nextElementSibling;
                // 1、隐藏待替换内容
                oldChild.el!.style!.display = 'none';
                oldChild.un('close');
                // 2、因为oldChild和child都会走一遍remove流程，添加child到指定位置并冗余添加一份数据
                child.attach(this.el!, nextSibling!);
                this.childList.splice(noticeIndex + 1, 0, child);
                // 3、接下来移除oldChild并删除数据
                oldChild.detach();
                this.childList.splice(noticeIndex, 1);
            }
            else {
                if ('shift' === method) {
                    this.remove(this.childList[0].data.get('key'));
                }
                child.attach(this.el!);
                this.childList.push(child);
            }

            const Content = san.defineComponent({
                template: notice.content,
                components: {
                    's-icon': icon as unknown as Element,
                    's-button': button as unknown as Element,
                },
                btnClick() {
                    notice.btnClick && notice.btnClick();
                }
            });

            new Content().attach(child.ref('content') as unknown as Element);
        });
    };
    remove(key: string) {
        let atIndex = -1;
        let atChild: null | Base = null;

        this.childList.forEach((child, index) => {
            if (child && child.data.get('key') === key) {
                atIndex = index;
                atChild = child;
            }
        });

        if (-1 === atIndex) {
            return;
        }

        const onClose = atChild!.data.get('onClose');
        onClose && onClose();
        atChild!.un('close');
        atChild!.detach();
        this.childList.splice(atIndex, 1);

        this.data.apply('notices', notices => {
            delete notices[key];
            return notices;
        });
    };
};

(Notification as unknown as I.NotificationType).newInstance = (properties, callback) => {
    const {getContainer, ...props} = properties || {};
    const instance = new Notification({
        data: props
    });
    instance.attach(document.body);

    if (getContainer) {
        instance.attach(getContainer());
    }
    else {
        instance.attach(document.body);
    }

    let called = false;
    function ref(notification: I.TBase) {
        if (called) {
            return;
        }
        called = true;
        callback({
            component: notification,
            notice(props: I.noticesType) {
                notification.add!(props);
            },
            removeNotice(key: string) {
                notification.remove!(key);
            },
            destroy() {
                notification.dispose();
            }
        });
    }

    ref(instance);
};

export default Notification;
