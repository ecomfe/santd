/**
 * @file 组件 popover
 * @author mayihui@baidu.com
 */

import './style/index';
import san from 'san';
// 注意公共方法提取到 util，送人玫瑰手有余香~
import {classCreator} from '../core/util';
import Tooltip from '../tooltip';
import inherits from '../core/util/inherits';

const prefixCls = classCreator('popover')();

export default inherits(san.defineComponent({
    initData() {
        return {
            prefixCls,
            transitionName: 'zoom-big'
        };
    },
    computed: {
        tooltipPopup() {
            let title = this.data.get('title');
            let content = this.data.get('content');
            const prefixCls = this.data.get('prefixCls');

            title = (typeof title === 'string')
                ? san.defineComponent({template: `<span>${title}</span>`}) : title;
            content = (typeof content === 'string')
                ? san.defineComponent({template: `<span>${content}</span>`}) : content;

            return san.defineComponent({
                components: {
                    title,
                    content
                },
                inited() {
                    this.data.set('instance', this);
                },
                computed: {
                    hasTitle() {
                        const instance = this.data.get('instance');
                        return instance && instance.components.title;
                    }
                },
                template: `<div>
                    <div s-if="hasTitle" class="${prefixCls}-title"><title/></div>
                    <div class="${prefixCls}-inner-content"><content/></div>
                </div>`
            });
        },
        getTransitionName() {
            const transitionName = this.data.get('transitionName');
            return transitionName;
        },
        action() {
            const trigger = this.data.get('trigger');
            return (trigger && [trigger]) || ['hover'];
        }
    }
}), Tooltip);
