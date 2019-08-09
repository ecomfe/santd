/**
 * @file 组件 alert
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/alert-cn/
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import {addClass} from '../core/util/dom';
import Icon from '../icon';

const prefixCls = classCreator('alert')();
const iconMap = {
    success: 'check-circle',
    info: 'info-circle',
    error: 'close-circle',
    warning: 'exclamation-circle'
};

export default san.defineComponent({
    template: `
        <div class="{{className}}" on-animationend="animationEnd">
            <slot s-if="showIcon" name="icon">
                <s-icon class="${prefixCls}-icon" type="{{iconType}}" theme="{{iconTheme}}"/>
            </slot>
            <span class="${prefixCls}-message">{{message}}</span>
            <span class="${prefixCls}-description">{{description}}</span>
            <a s-if="closable" on-click="handleClose" class="${prefixCls}-close-icon">
                {{closeText}}
                <s-icon s-if="!closeText" type="close"/>
            </a>
        </div>
    `,
    dataTypes: {
        banner: DataTypes.bool,
        closable: DataTypes.bool,
        closeText: DataTypes.string,
        description: DataTypes.string,
        icon: DataTypes.string,
        message: DataTypes.string,
        showIcon: DataTypes.bool,
        type: DataTypes.oneOf(['success', 'info', 'error', 'warning'])
    },
    components: {
        's-icon': Icon
    },
    computed: {
        className() {
            const data = this.data;
            const type = data.get('type');
            const closing = data.get('closing');
            const closable = data.get('closable');
            const description = data.get('description');
            const showIcon = data.get('showIcon');
            const banner = data.get('banner');
            let klass = [prefixCls, `${prefixCls}-${type}`];
            !closing && klass.push(`${prefixCls}-close`, `${prefixCls}-slide-up-leave`);
            description && klass.push(`${prefixCls}-with-description`);
            !showIcon && klass.push(`${prefixCls}-no-icon`);
            banner && klass.push(`${prefixCls}-banner`);
            closable && klass.push(`${prefixCls}-closable`)
            return klass;
        },
        iconType() {
            const data = this.data;
            const icon = data.get('icon');

            if (icon) {
                return icon;
            }

            const type = data.get('type');
            const iconType = iconMap[type] || 'smile';
            return iconType;
        },
        iconTheme() {
            return this.data.get('description') ? 'outlined' : 'filled';
        }
    },
    initData() {
        return {
            banner: false,
            closing: true
        };
    },
    inited() {
        const data = this.data;
        let type = data.get('type');
        // 有closeText时可关闭
        if (data.get('closeText')) {
            data.set('closable', true);
        }
        // banner模式
        if (data.get('banner')) {
            // 默认显示icon
            false !== data.get('showIcon') && data.set('showIcon', true);
            // 默认类型warning
            undefined === type && data.set('type', type = 'warning');
        }
        // 默认类型info
        undefined === type && data.set('type', 'info');
    },
    attached() {
        const customIcon = this.slot('icon')[0];
        if (customIcon && customIcon.isInserted) {
            customIcon.children.forEach(item => {
                addClass(item.el, `${prefixCls}-icon`); // 自定义icon添加class
            });
        }
    },
    handleClose(e) {
        e.preventDefault();
        const dom = this.el;
        dom.style.height = `${dom.offsetHeight}px`;
        this.data.set('closing', false);
        this.fire('close', e);
    },
    animationEnd() {
        this.data.set('closing', true);
        this.fire('afterClose');
        this.el.remove();
    }
});
