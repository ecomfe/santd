/**
 * @file 组件 suggestions
 * @author raowenjuan <raowenjuan@baidu.com>
 */

import './style/index.less';
import Icon from '../icon';
import Nav from './Nav';
import {classCreator} from '../core/util';
import Base from 'santd/base';

const prefixCls = classCreator('suggestions')();
const prefixDropCls = classCreator('dropdown')();

export default class Suggestions extends Base {
    components!: {customsuggestions: string[]}
    static template = `
        <div class="${prefixCls}-wrapper" style="{{innerStyle}}">
            <div class="${prefixCls}-content ${prefixDropCls}-menu" s-ref="nav-area">
                <customsuggestions s-if="{{customSuggestions}}" />
                <template s-else>
                    <s-nav s-if="{{suggestions && suggestions.length}}" s-for="item in suggestions">{{item}}</s-nav>
                    <s-icon s-else-if="{{loading}}" type="loading" style="display:block;margin:0 auto;" />
                    <div s-else class="${prefixCls}-notfound">{{notFoundContent}}</div>
                </template>
            </div>
        </div>
        `
    static components = {
        's-icon': Icon,
        's-nav': Nav
    }
    static computed = {
        innerStyle(this: Suggestions) {
            const isShowSug = this.data.get('isShowSug');
            const position = this.data.get('position');
            const isTop = this.data.get('placement') === 'top';
            return {
                display: isShowSug ? 'block' : 'none',
                left: `${position.left}px`,
                top: isTop ? 'auto' : `${position.top + position.height}px`,
                bottom: isTop ? `${position.top + position.height}px;` : 'auto'
            };
        }
    }
    initData() {
        return {
            position: {
                left: 0,
                top: 0,
                height: 0
            },
            display: 'none',
            loading: false
        };
    }
    created() {
        const suggestions = this.data.get('suggestions');
        if (typeof suggestions === 'function') {
            this.components.customsuggestions = suggestions;
            this.data.set('customSuggestions', true);
        }
    }
};
