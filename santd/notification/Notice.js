/**
 * @file 组件 notification/Notice
 * @author baozhixin <baozhixin@baidu.com>
 */

import san, {DataTypes} from 'san';
import filters from '../modal/Dialog';

export default san.defineComponent({
    template: `
        <div class="{{noticeClass}}"
            style="{{style | css}}"
            on-click="handleClick"
            on-mouseenter="clearCloseTimer"
            on-mouseleave="startCloseTimer"
        >
            <div class="{{componentClass}}-content" s-ref="content"><slot/></div>
            <a s-if="closable" on-click="handleClose" class="{{componentClass}}-close" tabIndex="0">
                <slot name="close-icon">
                    <span class="{{componentClass}}-close-x">关闭</span>
                </slot>
            </a>
        </div>
    `,
    dataTypes: {
        duration: DataTypes.number,
        closable: DataTypes.bool,
        className: DataTypes.string,
        prefixCls: DataTypes.string,
        update: DataTypes.bool
    },
    computed: {
        componentClass() {
            const data = this.data;
            const prefixCls = data.get('prefixCls');
            return `${prefixCls}-notice`;
        },
        noticeClass() {
            const data = this.data;
            const closable = data.get('closable');
            const componentClass = data.get('componentClass');
            const className = data.get('className');
            let classArr = [componentClass];
            closable && classArr.push(`${componentClass}-closable`);
            !!className && classArr.push(className);
            return classArr;
        }
    },
    filters,
    initData() {
        return {
            duration: 1.5,
            style: {
                right: '50%'
            }
        };
    },
    attached() {
        this.startCloseTimer();
        this.watch('duration', duration => {
            this.startCloseTimer();
        });
    },
    updated() {
        if (this.data.get('update')) {
            this.startCloseTimer();
        }
    },
    handleClick(e) {
        e.preventDefault();
        this.fire('click', e);
    },
    handleClose(e) {
        e && (e.preventDefault(), e.stopPropagation());
        this.clearCloseTimer();
        this.fire('close', e);
    },
    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    },
    startCloseTimer() {
        const duration = this.data.get('duration');
        this.clearCloseTimer();
        if (duration) {
            this.closeTimer = setTimeout(() => {
                this.handleClose();
            }, duration * 1e3);
        }
    }
});
