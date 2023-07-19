/**
* @file 具体step
* @author fuqiangqiang@baidu.com
*/

import Base from 'santd/base';
import Icon from '../icon';
import {classCreator} from '../core/util';
const prefixCls = classCreator('steps')();

export default class Step extends Base {
    parentComponent!:any;
    inited() {
        // 把父节点的progressDot slot添加到自己身上
        this.sourceSlots.named.progressDot = this.parentComponent.sourceSlots.named.progressDot;

        // 拿到父节点的相关属性值给自己用
        const parentData = this.parentComponent.data.get();
        ['progressDot', 'status', 'hasChange'].forEach(key => {
            this.data.set(key === 'status' ? 'parentStatus' : key, parentData[key]);
        });
        this.data.set('hasSubTitle', this.data.get('subTitle') || !!this.sourceSlots.named.subTitle);
        this.data.set('hasTitle', this.data.get('title') || !!this.sourceSlots.named.title);
        this.data.set('hasDescription', this.data.get('description') || !!this.sourceSlots.named.description);
        this.data.set('hasIcon', this.data.get('icon') || !!this.sourceSlots.named.icon);
        this.data.set('hasDot', this.data.get('progressDot') || !!this.sourceSlots.named.progressDot);

        this.watch('hasChange', val => {
            val && this.data.set('accessibilityProps', {role: 'button', tabIndex: 0});
        });
    }
    attached() {
        this.dispatch('santd_steps_addStep', this);
    }
    static components = {
        's-icon': Icon
    }
    handleClick() {
        const disabled = this.data.get('disabled');
        const stepIndex = this.data.get('stepIndex');
        this.dispatch('santd_steps_clickStep', {stepIndex, disabled});
    }
    static template = `<div
        class="${prefixCls}-item ${prefixCls}-item-{{status}} {{hasIcon ? '${prefixCls}-item-custom': ''}}"
        on-click="handleClick"
        role="{{accessibilityProps.role}}"
        tabindex="{{accessibilityProps.tabIndex}}"
    >
        <div class="${prefixCls}-item-tail">{{tailContent}}</div>
        <div class="${prefixCls}-item-icon">
            <span class="${prefixCls}-icon" s-if="hasDot">
                <span class="${prefixCls}-icon-dot" s-if="progressDot" />
                <slot
                    s-else
                    name="progressDot"
                    var-prefixCls="{{'${prefixCls}'}}"
                    var-index="{{stepIndex}}"
                    var-status="{{status}}"
                />
            </span>
            <span class="${prefixCls}-icon" s-else-if="hasIcon">
                <s-icon type="{{icon}}" s-if="icon" />
                <slot name="icon" s-else />
            </span>
            <span class="${prefixCls}-icon" s-else-if="!hasIcon && status === 'finish'">
                <s-icon type="check" class="${prefixCls}-finish-icon" />
            </span>
            <span class="${prefixCls}-icon" s-else-if="!hasIcon && status === 'error'">
                <s-icon type="close" class="${prefixCls}-error-icon" />
            </span>
            <span class="${prefixCls}-icon" s-else>{{stepNumber}}</span>
        </div>
        <div class="${prefixCls}-item-content">
            <div class="${prefixCls}-item-title">
                <template s-if="hasTitle">
                    <template s-if="title">{{title}}</template>
                    <slot name="title" s-else />
                </template>
                <template s-if="hasSubTitle">
                    <span class="${prefixCls}-item-subTitle">
                        <template s-if="subTitle">{{subTitle}}</template>
                        <slot name="subTitle" s-else />
                    </span>
                </template>
            </div>
            <div class="${prefixCls}-item-description" s-if="hasDescription">
                <template s-if="description">{{description}}</template>
                <slot name="description" s-else />
            </div>
        </div>
    </div>`
};

export type TStep = typeof Step;
