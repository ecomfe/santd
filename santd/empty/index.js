/**
 * @file 组件 empty
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import defaultEmptyImg from './empty.svg';
import simpleEmptyImg from './simple.svg';

const prefixCls = classCreator('empty')();

const Empty = san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        className: DataTypes.string,
        imageStyle: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        image: DataTypes.oneOfType([DataTypes.string, DataTypes.func]),
        description: DataTypes.oneOfType([DataTypes.string, DataTypes.func])
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

            return classNames(prefixCls, {
                [`${prefixCls}-normal`]: image === simpleEmptyImg
            }, className);
        },
        alt() {
            const des = this.data.get('desc');

            return typeof des === 'string' ? des : 'empty';
        },
        desc() {
            const description = this.data.get('description') || '暂无数据';
            return description;
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
            const description = this.data.get('desc');

            if (typeof description !== 'string') {
                instance && (instance.components.description = description);
                return description;
            }
        }
    },
    inited() {
        this.data.set('instance', this);
    },
    template: `
        <div class="{{classes}}">
            <div class="{{prefixCls}}-image" style="{{imageStyle}}">
                <imagenode s-if="injectImageNode" />
                <img s-else src="{{image}}" alt="{{alt}}" />
            </div>
            <p class="{{prefixCls}}-description">
                <description s-if="injectDescription" />
                <template s-else>{{description || '暂无数据'}}</template>
            </p>
            <div class="{{prefixCls}}-footer"><slot /></div>
        </div>
    `
});

Empty.PRESENTED_IMAGE_DFEAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;

export default Empty;
