/**
 * @file 组件 popconfirm
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
// 注意公共方法提取到 util，送人玫瑰手有余香~
import {classCreator} from 'santd/core/util';
import Tooltip from 'santd/tooltip';
import Button from 'santd/button';
import Icon from 'santd/icon';
import inherits from 'santd/core/util/inherits';

const prefixCls = classCreator('popover')();
export default inherits(san.defineComponent({
    initData() {
        return {
            prefixCls,
            transitionName: 'zoom-big',
            trigger: 'click',
            okType: 'primary',
            icon: 'exclamation-circle'
        };
    },
    computed: {
        tooltipPopup() {
            const icon = this.data.get('icon');
            const title = this.data.get('title');
            const cancelText = this.data.get('cancelText');
            const okType = this.data.get('okType');
            const okText = this.data.get('okText');
            const instance = this.data.get('instance');

            const Title = (typeof title === 'string')
                ? san.defineComponent({template: `<span>${title}</span>`}) : title;
            const PopIcon = (typeof icon === 'string')
                ? san.defineComponent({
                    components: {
                        's-icon': Icon
                    },
                    template: `<span><s-icon type="${icon}" themes="filled"/></span>`
                }) : icon;

            return san.defineComponent({
                components: {
                    's-icon': PopIcon,
                    's-button': Button,
                    's-title': Title
                },
                initData() {
                    return {
                        icon,
                        cancelText,
                        okType,
                        okText,
                        instance
                    };
                },
                handleCancel(e) {
                    const instance = this.data.get('instance');
                    instance && instance.fire('cancel', e);
                    instance && instance.close(e);
                },
                handleConfirm(e) {
                    const instance = this.data.get('instance');
                    instance && instance.fire('confirm', e);
                    instance && instance.close(e);
                },
                template: `
                    <div>
                        <div className="${prefixCls}-inner-content">
                            <div className="${prefixCls}-message">
                                <s-icon />
                                <div className="${prefixCls}-message-title"><s-title /></div>
                            </div>
                            <div className="${prefixCls}-buttons">
                                <s-button on-click="handleCancel" size="small" noWave>
                                    {{cancelText}}
                                </s-button>
                                <s-button on-click="handleConfirm" type="{{okType}}" size="small" noWave>
                                    {{okText}}
                                </s-button>
                            </div>
                        </div>
                    </div>
                `
            });
        },
        getTransitionName() {
            const transitionName = this.data.get('transitionName');
            return transitionName;
        },
        action() {
            const trigger = this.data.get('trigger');
            return (trigger && [trigger]) || ['click'];
        }
    }
}), Tooltip);
