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

const prefix = classCreator('page-header')();

export default san.defineComponent({
    template: `
    	<div class="${prefix}">
            <s-breadcrumb separator="/" s-if="showBread" s-bind="{{breadcrumb}}">
            </s-breadcrumb>
            <div class="${prefix}-back-icon" on-click="handleBack" s-if="showBackIcon">
                <s-icon type="{{backIcon}}"/>
                <s-divider type="vertical" />
            </div>
            <div class="${prefix}-title-view">
                <span class="${prefix}-title-view-title">{{title}}</span>
                <span class="${prefix}-title-view-sub-title">{{subTitle}}</span>
                <span class="${prefix}-title-view-tags">
                    <slot name="tags"/>
                </span>
                <span class="${prefix}-title-view-extra">
                    <slot name="extra"/>
                </span>
            </div>
            <div class="${prefix}-content-view" s-if="showContent">
                <slot/>
            </div>
            <div class="${prefix}-footer" s-if="showFooter">
                <slot name="footer"/>
            </div>
        </div>
    `,
    initData() {
        return {
            backIcon: 'arrow-left'
        };
    },
    components: {
        's-icon': icon,
        's-divider': divider,
        's-breadcrumb': breadcrumb,
        's-brcrumbitem': breadcrumb.BrcrumbItem
    },
    computed: {
        showBread() {
            let breadcrumb = this.data.get('breadcrumb');
            return breadcrumb && breadcrumb.routes && breadcrumb.routes.length > 2;
        },
        showBackIcon() {
            let showBread = this.data.get('showBread');
            return this.data.get('backIcon') !== false && !showBread;
        }
    },
    handleBack() {
        let onBack = this.data.get('onBack');
        if (onBack && typeof onBack === 'function') {
            onBack();
        } else {
            history.back();
        }
    },
    inited() {
        let defaultSlot = !!this.sourceSlots.noname;
        let footer = !!this.sourceSlots.named.footer;
        this.data.set('showContent', defaultSlot);
        this.data.set('showFooter', footer);
    }
});
