/**
* @file tree-select-trigger 处理tree-select中间态逻辑
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import Icon from 'santd/icon';
import Trigger from '../s-trigger';
const pagin = classCreator('select');
const prefixCls = pagin();

const BUILT_IN_PLACEMENTS = {
    bottomLeft: {
        points: ['tl', 'bl'],
        offset: [0, 4],
        overflow: {
            adjustX: 0,
            adjustY: 1
        }
    },
    topLeft: {
        points: ['bl', 'tl'],
        offset: [0, -4],
        overflow: {
            adjustX: 0,
            adjustY: 1
        }
    }
};

export default san.defineComponent({
    dataTypes: {
        disabled: DataTypes.bool,
        placement: DataTypes.string,
        prefixCls: DataTypes.string
    },
    components: {
        's-trigger': Trigger
    },
    initData() {
        return {
            popupPlacement: 'bottomLeft',
            placements: BUILT_IN_PLACEMENTS,
            sizeMap: {
                large: 'lg',
                small: 'sm'
            },
            currentVisible: false
        };
    },

    template: `
        <div>
            <s-trigger
                isShow="{{currentVisible}}"
                getPopupContainer="{{getPopupContainer}}"
                trigger="click"
                allData="{{allData}}"
                disabled="{{false}}"
                placement="{{popupPlacement}}"
                placements="{{placements}}"
                prefixCls="${prefixCls}-dropdown"
                dropdownMatchSelectWidth="{{dropdownMatchSelectWidth}}"
                width="{{width}}"
                newPosition="{{newPosition}}"
                addClassName="{{className}}"
            >
                <div slot="headInner"><slot name="triggerSlot"></slot></div>
                <div slot="popupInner"><slot name="dropdownInner"></slot></div>
            </s-trigger>
        </div>
    `
});
