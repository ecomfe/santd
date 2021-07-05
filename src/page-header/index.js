/**
 * @file 组件 pageheader
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from '../core/util';
import icon from '../icon';
import divider from '../divider';
import breadcrumb from '../breadcrumb';
import avatar from '../avatar';

const prefixCls = classCreator('page-header')();

export default san.defineComponent({
    template: `
    	<div class="${prefixCls}">
            <s-breadcrumb separator="/" s-if="{{showBread(breadcrumb)}}" s-bind="{{breadcrumb}}" />
            <div class="${prefixCls}-header-view">
                <div class="${prefixCls}-back-icon" on-click="handleBack" s-if="{{showBackIcon(breadcrumb, backIcon)}}">
                    <slot name="backIcon">
                        <s-icon type="arrow-left" />
                    </slot>
                    <s-divider type="vertical" />
                </div>
                <div s-if="avatar" class="${prefixCls}-avatar">
                    <s-avatar size={{32}} s-bind={{avatar}} />
                </div>
                <div class="${prefixCls}-title-view">
                    <span class="${prefixCls}-title-view-title">{{title}}</span>
                    <span class="${prefixCls}-title-view-sub-title">{{subTitle}}</span>
                    <span class="${prefixCls}-title-view-tags">
                        <slot name="tags" />
                    </span>
                    <span class="${prefixCls}-title-view-extra">
                        <slot name="extra"/>
                    </span>
                </div>
            </div>
            <div class="${prefixCls}-content-view" s-if="{{hasContent}}">
                <slot />
            </div>
            <div class="${prefixCls}-footer" s-if="{{hasFooter}}">
                <slot name="footer" />
            </div>
        </div>
    `,
    components: {
        's-icon': icon,
        's-avatar': avatar,
        's-divider': divider,
        's-breadcrumb': breadcrumb,
        's-brcrumbitem': breadcrumb.BrcrumbItem
    },
    showBread(breadcrumb) {
        return breadcrumb && breadcrumb.routes && breadcrumb.routes.length > 2;
    },
    showBackIcon(breadcrumb, backIcon) {
        return backIcon !== false && !this.showBread(breadcrumb);
    },
    handleBack() {
        let onBack = this.data.get('onBack');
        if (onBack && typeof onBack === 'function') {
            onBack();
        }
        else {
            history.back();
        }
    },
    inited() {
        this.data.set('hasContent', !!this.sourceSlots.noname);
        this.data.set('hasFooter', !!this.sourceSlots.named.footer);
    }
});
