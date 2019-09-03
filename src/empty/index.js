/**
 * @file 组件 empty
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import defaultEmptyImg from './empty.svg';
import simpleEmptyImg from './simple.svg';
import LocaleReceiver from '../localeprovider/localereceiver';
import inherits from '../core/util/inherits';

const prefixCls = classCreator('empty')();

const Locale = san.defineComponent({
    initData() {
        return {
            componentName: 'Empty'
        };
    }
}, LocaleReceiver);


const Empty = inherits(Locale, san.defineComponent({
    dataTypes: {
        imageStyle: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        image: DataTypes.string,
        description: DataTypes.oneOfType([DataTypes.string, DataTypes.bool])
    },
    initData() {
        return {
            image: defaultEmptyImg,
            simpleEmptyImg
        };
    },
    computed: {
        classes() {
            const image = this.data.get('image') || defaultEmptyImg;
            let classArr = [prefixCls];

            (image === simpleEmptyImg) && classArr.push(`${prefixCls}-normal`);
            return classArr;
        }
    },
    inited() {
        this.data.set('hasDescription', !!this.sourceSlots.named.description);
    },
    getAlt(description) {
        return typeof description === 'string'
            ? description
            : 'empty';
    },
    template: `
        <div class="{{classes}}">
            <div class="${prefixCls}-image" style="{{imageStyle}}">
                <img s-if="{{image}}" src="{{image}}" alt="{{getAlt(description || locale.description)}}" />
            </div>
            <p class="${prefixCls}-description" s-if="{{hasDescription || description}}">
                <slot name="description" />{{description}}
            </p>
        </div>
    `
}));

Empty.PRESENTED_IMAGE_DFEAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;

export default Empty;
