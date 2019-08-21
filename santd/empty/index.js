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
        prefixCls: DataTypes.string,
        className: DataTypes.string,
        imageStyle: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        image: DataTypes.oneOfType([DataTypes.string, DataTypes.func]),
        description: DataTypes.oneOfType([DataTypes.string, DataTypes.func, DataTypes.bool])
    },
    initData() {
        return {
            prefixCls,
            image: defaultEmptyImg,
            simpleEmptyImg
        };
    },
    computed: {
        classes() {
            const className = this.data.get('className');
            const image = this.data.get('image') || defaultEmptyImg;
            let classArr = [prefixCls];

            className && classArr.push(className);
            (image === simpleEmptyImg) && classArr.push(`${prefixCls}-normal`);
            return classArr;
        },
        injectImageNode() {
            const image = this.data.get('image');
            const instance = this.data.get('instance');

            if (typeof image !== 'string') {
                instance && (instance.components.imagenode = image);
                return image;
            }
        },
        injectDescription() {
            const instance = this.data.get('instance');
            const description = this.data.get('description');

            if (description && typeof description !== 'string') {
                instance && (instance.components.description = description);
                return description;
            }
        }
    },
    inited() {
        this.data.set('instance', this);
    },
    getAlt(description) {
        return typeof description === 'string'
            ? description
            : 'empty';
    },
    template: `
        <div class="{{classes}}">
            <div class="{{prefixCls}}-image" style="{{imageStyle}}">
                <imagenode s-if="{{injectImageNode}}" />
                <img s-else src="{{image}}" alt="{{getAlt(description || locale.description)}}" />
            </div>
            <p class="{{prefixCls}}-description" s-if="{{description !== false}}">
                <description s-if="{{injectDescription}}" />
                <template s-else>{{description || locale.description}}</template>
            </p>
            <div class="{{prefixCls}}-footer"><slot /></div>
        </div>
    `
}));

Empty.PRESENTED_IMAGE_DFEAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;

export default Empty;
