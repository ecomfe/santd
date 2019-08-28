/**
 * @file 组件 popconfirm
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Tooltip from '../tooltip';
import Button from '../button';
import Icon from '../icon';
import inherits from '../core/util/inherits';
import LocaleReceiver from '../localeprovider/localereceiver';

const prefixCls = classCreator('popover')();

const Locale = inherits(san.defineComponent({
    initData() {
        return {
            componentName: 'Popconfirm'
        };
    }
}), LocaleReceiver);

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
            const locale = this.data.get('locale');
            const cancelText = this.data.get('cancelText') || locale.cancelText;
            const okType = this.data.get('okType');
            const okText = this.data.get('okText') || locale.okText;
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
}), inherits(Locale, Tooltip));
