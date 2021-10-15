/**
 * @file 组件 empty
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import defaultEmptyImg from './empty.svg';
import simpleEmptyImg from './simple.svg';
import localeReceiver from '../locale-provider/receiver';

const prefixCls = classCreator('empty')();


const Empty = san.defineComponent({
    dataTypes: {
        imageStyle: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        image: DataTypes.string,
        description: DataTypes.oneOfType([DataTypes.string, DataTypes.bool])
    },

    initData() {
        return {
            componentName: 'Empty',
            image: defaultEmptyImg,
            simpleEmptyImg
        };
    },

    inited() {
        this.data.set('hasDescription', !!this.sourceSlots.named.description);
        localeReceiver.inited.call(this);
    },

    computed: localeReceiver.computed,

    template: `
        <div class="${prefixCls}{{image === simpleEmptyImg ? ' ${prefixCls}-normal' : ''}}{{small ? ' ${prefixCls}-small' : ''}}">
            <div class="${prefixCls}-image" style="{{imageStyle}}">
                <img s-if="image" src="{{image}}" alt="{{description || locale.description || 'empty'}}" />
            </div>
            <p class="${prefixCls}-description" s-if="hasDescription || description !== false">
                <slot name="description" s-if="hasDescription" />
                <template s-else>
                    {{description || locale.description}}
                </template>
            </p>
        </div>
    `
});

Empty.PRESENTED_IMAGE_DFEAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;

export default Empty;