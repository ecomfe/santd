/**
 * @file 组件 notification/Notification
 * @author baozhixin <baozhixin@baidu.com>
 */

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import {addClass, removeClass} from 'santd/core/util/dom';
import TransitionEvents from 'santd/core/util/css-animation/Event';
import {guid} from 'santd/core/util';
import icon from 'santd/icon';
import button from 'santd/button';
import Notice from './Notice';

export const filters = {
    css(style) {
        if (!style) {
            return '';
        }
        if (typeof style === 'string') {
            return style.replace(/\s+/g, '');
        }
        Object.keys(style).map(key => {
            // css样式传入的小驼峰转换为短横线
            if (/([A-Z])/g.test(key)) {
                const kebabKey = key.replace(/([A-Z])/g, m => `-${m.toLowerCase()}`);
                style[kebabKey] = style[key];
                delete style[key];
                return kebabKey;
            }
            return key;
        });
        return style;
    }
};

const Notification = san.defineComponent({
    template: '<div class="{{wrapClass}}" style="{{style | css}}"></div>',
    dataTypes: {
        prefixCls: DataTypes.string,
        animation: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        transitionName: DataTypes.string,
        maxCount: DataTypes.number,
        style: DataTypes.object,
        closeIcon: DataTypes.any
    },
    components: {
        's-icon': icon,
        's-button': button
    },
    computed: {
        getTransitionName() {
            const data = this.data;
            let transitionName = data.get('transitionName');
            const animation = data.get('animation');
            const prefixCls = data.get('prefixCls');

            if (!transitionName && animation) {
                transitionName = `${prefixCls}-${animation}`;
            }

            return transitionName;
        },
        wrapClass() {
            const data = this.data;
            const prefixCls = data.get('prefixCls');
            const className = data.get('className');

            return classNames({
                [prefixCls]: true,
                [className]: !!className
            });
        }
    },
    filters: {
        ...filters
    },
    fadeTrans(transitionName, disableTransition) {
        return {
            enter(el, done) {
                if (disableTransition) {
                    done();
                    return;
                }
                const cls = classNames({
                    [`${transitionName}-enter`]: true,
                    [`${transitionName}-enter-active`]: true
                });
                const end = () => {
                    TransitionEvents.removeEndEventListener(el, end);
                    removeClass(el, cls);
                    done();
                };
                TransitionEvents.addEndEventListener(el, end);
                addClass(el, cls);
            },
            leave(el, done) {
                if (disableTransition) {
                    done();
                    return;
                }
                const cls = classNames({
                    [`${transitionName}-leave`]: true,
                    [`${transitionName}-leave-active`]: true
                });
                const end = () => {
                    TransitionEvents.removeEndEventListener(el, end);
                    removeClass(el, cls);
                    done();
                };
                TransitionEvents.addEndEventListener(el, end);
                addClass(el, cls);
            }
        };
    },
    initData() {
        return {
            prefixCls: 'san-notification',
            animation: 'fade',
            style: {
                top: '65px',
                left: '50%'
            },
            // maxCount: 3, // @test: 最大notice个数
            notices: {}
        };
    },
    add(notice) {
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

        notices[key] = notice;
        data.set('notices', notices);

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

            child.on('close', e => {
                this.remove(notice.key);
            });

            child.on('click', e => {
                notice.onClick && notice.onClick();
            });

            if ('splice' === method) {
                // 按key更新流程
                const oldChild = this.childList[noticeIndex];
                const nextSibling = oldChild.el.nextElementSibling;
                // 1、隐藏待替换内容
                oldChild.el.style.display = 'none';
                oldChild.un('close');
                // 2、因为oldChild和child都会走一遍remove流程，添加child到指定位置并冗余添加一份数据
                child.attach(this.el, nextSibling);
                this.childList.splice(noticeIndex + 1, 0, child);
                // 3、接下来移除oldChild并删除数据
                oldChild.detach();
                this.childList.splice(noticeIndex, 1);
            }
            else {
                if ('shift' === method) {
                    this.remove(this.childList[0].data.get('key'));
                }
                child.attach(this.el);
                this.childList.push(child);
            }

            const Content = san.defineComponent({
                template: notice.content,
                components: {
                    's-icon': icon,
                    's-button': button
                },
                btnClick() {
                    notice.btnClick && notice.btnClick();
                }
            });

            new Content().attach(child.ref('content'));
        });
    },
    remove(key) {
        let atIndex = -1;
        let atChild = null;

        this.childList.forEach((child, index) => {
            if (child && child.data.get('key') === key) {
                atIndex = index;
                atChild = child;
            }
        });

        if (-1 === atIndex) {
            return;
        }

        const onClose = atChild.data.get('onClose');
        onClose && onClose();
        atChild.un('close');
        atChild.detach();
        this.childList.splice(atIndex, 1);

        this.data.apply('notices', notices => {
            delete notices[key];
            return notices;
        });
    }
});

Notification.newInstance = (properties, callback) => {
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
    function ref(notification) {
        if (called) {
            return;
        }
        called = true;
        callback({
            component: notification,
            notice(props) {
                notification.add(props);
            },
            removeNotice(key) {
                notification.remove(key);
            },
            destroy() {
                notification.dispose();
            }
        });
    }

    ref(instance);
};

export default Notification;
