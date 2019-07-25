/**
* @file 具体step
* @author fuqiangqiang@baidu.com
*/

import san from 'san';
import classNames from 'classnames';
import Icon from 'santd/icon';

export default san.defineComponent({
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const status = this.data.get('status') || this.data.get('parentStatus');
            const icon = this.data.get('icon');
            const className = this.data.get('className');

            return classNames(`${prefixCls}-item`, `${prefixCls}-item-${status}`, className, {
                [`${prefixCls}-item-custom`]: icon
            });
        },
        iconClasses() {
            const prefixCls = this.data.get('prefixCls');
            return classNames(`${prefixCls}-icon`);
        },
        injectProgressDot() {
            const instance = this.data.get('instance');
            if (instance) {
                const progressDot = this.data.get('progressDot');
                const prefixCls = this.data.get('prefixCls');
                const iconDot = san.defineComponent({
                    initData() {
                        return {
                            prefixCls
                        };
                    },
                    template: '<span class="{{prefixCls}}-icon-dot" />'
                });
                if (typeof progressDot === 'function') {
                    instance.components.progressdot = progressDot(iconDot);
                }
                else if (progressDot === true) {
                    instance.components.progressdot = iconDot;
                }
            }
        },
        injectIcon() {
            const icon = this.data.get('icon');
            const instance = this.data.get('instance');
            if (instance && icon && typeof icon === 'function') {
                instance.components.icon = icon;
                return true;
            }
        }
    },
    inited() {
        this.data.set('instance', this);
        const parentData = this.parentComponent.data.get();
        ['progressDot', 'status', 'prefixCls', 'size', 'icons', 'hasChange'].forEach(key => {
            this.data.set(key === 'status' ? 'parentStatus' : key, parentData[key]);
        });

        this.watch('hasChange', val => {
            if (val) {
                const accessibilityProps = {
                    role: 'button',
                    tabIndex: 0
                };
                this.data.set('accessibilityProps', accessibilityProps);
            }
        });
    },
    attached() {
        this.dispatch('addStep', this);
    },
    components: {
        's-icon': Icon
    },
    handleClick() {
        const stepIndex = this.data.get('stepIndex');
        this.dispatch('clickStep', stepIndex);
    },
    template: `<div
        class="{{classes}}"
        on-click="handleClick"
        role="{{accessibilityProps.role}}"
        tabindex="{{accessibilityProps.tabIndex}}"
    >
        <div class="{{prefixCls}}-item-tail">{{tailContent}}</div>
        <div class="{{prefixCls}}-item-icon">
            <span class="{{prefixCls}}-icon" s-if="progressDot">
                <progressdot status="{{status}}" index="{{stepNumber}}"/>
            </span>
            <span class="{{prefixCls}}-icon" s-else-if="injectIcon"><icon /></span>
            <span class="{{prefixCls}}-icon" s-else-if="!icon && status === 'finish'">
                <s-icon type="check" className="{{prefixCls}}-finish-icon" />
            </span>
            <span class="{{prefixCls}}-icon" s-else-if="!icon && status === 'error'">
                <s-icon type="close" className="{{prefixCls}}-error-icon" />
            </span>
            <span class="{{iconClasses}}" s-else-if="icon || status === 'finish' || status === 'error'" />
            <span class="{{prefixCls}}-icon" s-else>{{stepNumber}}</span>
        </div>
        <div class="{{prefixCls}}-item-content">
            <div class="{{prefixCls}}-item-title">
                {{title}}
            </div>
            <div class="{{prefixCls}}-item-description" s-if="description">{{description}}</div>
        </div>
    </div>`
});
