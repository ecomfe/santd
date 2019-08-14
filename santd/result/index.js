/**
 * @file Santd result component file
 * @author mayihui@baidu.com
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import Icon from '../icon';
import {classCreator} from '../core/util';
import noFound from './noFound';
import serverError from './serverError';
import unauthorized from './unauthorized';
const prefixCls = classCreator('result')();

export const IconMap = {
    success: 'check-circle',
    error: 'close-circle',
    info: 'exclamation-circle',
    warning: 'warning'
};

export const ExceptionMap = {
    404: noFound,
    500: serverError,
    403: unauthorized
};

const ExceptionStatus = Object.keys(ExceptionMap);

const Result = san.defineComponent({
    dataTypes: {
        icon: DataTypes.func,
        status: DataTypes.string,
        title: DataTypes.string,
        subTitle: DataTypes.string,
        extra: DataTypes.func,
        prefixCls: DataTypes.string,
        className: DataTypes.string
    },
    initData() {
        return {
            prefixCls,
            status: 'info'
        };
    },
    computed: {
        classes() {
            const status = this.data.get('status');
            const className = this.data.get('className');
            return [prefixCls, `${prefixCls}-${status}`, className];
        },
        injectIcon() {
            const instance = this.data.get('instance');
            const className = `${prefixCls}-icon`;
            const status = this.data.get('status');
            const icon = this.data.get('icon');
            let renderIcon;

            if (ExceptionStatus.includes(status)) {
                const SVGCompnoent = ExceptionMap[status];
                renderIcon = san.defineComponent({
                    components: {
                        svgcomponent: SVGCompnoent
                    },
                    initData() {
                        return {
                            className,
                            prefixCls
                        };
                    },
                    template: `<div class="{{className}} {{prefixCls}}-image">
                        <svgcomponent />
                    </div>`
                });
            }
            else {
                const iconString = IconMap[status];
                renderIcon = san.defineComponent({
                    initData() {
                        return {
                            className,
                            iconString,
                            icon
                        };
                    },
                    components: {
                        's-icon': Icon,
                        's-iconnode': icon
                    },
                    template: `<div class="{{className}}">
                        <s-iconnode s-if="icon" />
                        <s-icon s-else theme='filled' type="{{iconString}}" />
                    </div>`
                });
            }

            if (instance) {
                instance.components.rendericon = renderIcon;
            }
        },
        injectExtra() {
            const extra = this.data.get('extra');
            const instance = this.data.get('instance');
            if (instance) {
                instance.components.renderextra = extra;
            }
        },
        hasChildren() {
            const instance = this.data.get('instance');
            return instance && instance.sourceSlots.noname && instance.sourceSlots.noname.length;
        }
    },
    inited() {
        this.data.set('instance', this);
    },
    template: `<div class="{{classes}}">
        <rendericon />
        <div class="{{prefixCls}}-title">{{title}}</div>
        <div class="{{prefixCls}}-subtitle" s-if="subTitle">"{{subTitle}}"</div>
        <div class="{{prefixCls}}-content" s-if="hasChildren"><slot></slot></div>
        <div class="{{prefixCls}}-extra" s-if="extra">
            <renderextra />
        </div>
    </div>`
});

ExceptionStatus.forEach(key => {
    const privateKey = `PRESENTED_IMAGE_${key}`;
    Result[privateKey] = ExceptionMap[key];
});

export default Result;
