/**
 * @file 组件 empty
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import Base from 'santd/base';
import {classCreator} from '../core/util';
import defaultEmptyImg from './empty.svg';
import simpleEmptyImg from './simple.svg';
import localeReceiver from '../locale-provider/receiver';
import type * as I from './interface';

const prefixCls = classCreator('empty')();

export default class Empty extends Base<I.State, I.Props, I.Computed> {
    static template = /* html */ `
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
    `;

    static computed: I.Computed = localeReceiver.computed;

    static PRESENTED_IMAGE_DFEAULT: string;
    static PRESENTED_IMAGE_SIMPLE: string;

    initData(): I.State {
        return {
            componentName: 'Empty',
            image: defaultEmptyImg,
            simpleEmptyImg
        };
    };

    inited(): void {
        this.data.set('hasDescription', !!this.sourceSlots.named.description);
        localeReceiver.inited.call(this);
    };
};

Empty.PRESENTED_IMAGE_DFEAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;