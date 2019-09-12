/**
 * @file Santd tooltip file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import Trigger from '../../core/trigger/index';
import Placement from './placements';
import Content from './content';
import inherits from '../../core/util/inherits';

export default inherits(san.defineComponent({
    initData() {
        return {
            mouseEnterDelay: 0,
            destroyTooltipOnHide: false,
            mouseLeaveDelay: 0.1,
            popupAlign: {},
            builtinPlacements: Placement,
            action: ['hover'],
            popupPlacement: 'right'
        };
    },
    computed: {
        popupVisible() {
            return this.data.get('visible');
        },
        popup() {
            const prefixCls = this.data.get('prefixCls');
            const arrowContent = this.data.get('arrowContent');
            const tooltipPopup = this.data.get('tooltipPopup');
            const title = this.data.get('title');
            const initData = tooltipPopup.prototype.initData && tooltipPopup.prototype.initData() || {};

            return san.defineComponent({
                components: {
                    content: Content,
                    arrowcontent: arrowContent,
                    popup: tooltipPopup
                },
                initData() {
                    return {
                        title,
                        ...initData
                    };
                },
                template: `<div>
                    <div class="${prefixCls}-arrow" key="arrow">
                        <arrowcontent />
                    </div>
                    <content key="content" prefixCls="${prefixCls}">
                        <popup title="{{title}}" okText="{{okText}}" cancelText="{{cancelText}}" s-ref="pop"></popup>
                    </content>
                </div>`
            });
        }
    }
}), Trigger);
