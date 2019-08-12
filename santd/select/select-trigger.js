/**
* @file selectTrigger 处理select中间态逻辑
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Trigger from '../s-trigger';
const prefixCls = classCreator('select')();

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
        overlay: DataTypes.func,
        trigger: DataTypes.string,
        disabled: DataTypes.bool,
        placement: DataTypes.string,
        prefixCls: DataTypes.string,
        allData: DataTypes.object
    },
    components: {
        's-trigger': Trigger
    },
    computed: {

    },
    initData() {
        return {
            popupPlacement: 'bottomLeft',
            placements: BUILT_IN_PLACEMENTS,
            sizeMap: {
                large: 'lg',
                small: 'sm'
            }
        };
    },
    template: `
        <div>
            <slot></slot>
            <s-trigger
                isShow="{{allData._open}}"
                allData="{{allData}}"
                getPopupContainer="{{getPopupContainer}}"
                trigger="click"
                disabled="{{false}}"
                placement="{{popupPlacement}}"
                placements="{{placements}}"
                prefixCls="${prefixCls}-dropdown"
                dropdownMatchSelectWidth="{{dropdownMatchSelectWidth}}"
                width="{{width}}"
                targetProperty="select"
                labelInValue="{{labelInValue}}"
            >
                <div slot="headInner"><slot name="triggerSlot"></slot></div>
            </s-trigger>
        </div>
    `
});
