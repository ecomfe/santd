/**
 * @file Santd result component file
 * @author mayihui@baidu.com
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import Icon from '../icon';
import {classCreator} from '../core/util';
import noFound from './NoFound';
import serverError from './ServerError';
import unauthorized from './Unauthorized';
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

const Result = san.defineComponent({
    dataTypes: {
        status: DataTypes.string,
        title: DataTypes.string,
        subTitle: DataTypes.string
    },
    initData() {
        return {
            status: 'info',
            exceptionMap: ExceptionMap,
            iconMap: IconMap
        };
    },
    components: {
        's-icon': Icon,
        's-nofound': noFound,
        's-servererror': serverError,
        's-unauthorized': unauthorized
    },
    inited() {
        this.data.set('hasIcon', !!this.sourceSlots.named.icon);
        this.data.set('hasExtra', !!this.sourceSlots.named.extra);

        // 由于named slot会留下换行，所以用是否含有children来判断是不是有noname slot;
        let noName = this.sourceSlots.noname || [];
        this.data.set('hasContent', !!noName.filter(item => !!item.children).length);
    },
    template: `<div class="${prefixCls} ${prefixCls}-{{status}}">
        <div class="${prefixCls}-icon ${prefixCls}-image" s-if="exceptionMap[status]">
            <s-unauthorized s-if="status === '403'" />
            <s-nofound s-else-if="status === '404'" />
            <s-servererror s-else-if="status === '500'" />
        </div>
        <div class="${prefixCls}-icon" s-else>
            <slot name="icon" s-if="hasIcon" />
            <s-icon theme="filled" type="{{iconMap[status]}}" s-else />
        </div>
        <div class="${prefixCls}-title">{{title}}</div>
        <div class="${prefixCls}-subtitle" s-if="subTitle">{{subTitle}}</div>
        <div class="${prefixCls}-content" s-if="hasContent"><slot /></div>
        <div class="${prefixCls}-extra" s-if="hasExtra">
            <slot name="extra" />
        </div>
    </div>`
});

Object.keys(ExceptionMap).forEach(key => {
    const privateKey = `PRESENTED_IMAGE_${key}`;
    Result[privateKey] = ExceptionMap[key];
});

export default Result;
