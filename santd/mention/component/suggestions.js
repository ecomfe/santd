/**
 * @file 组件 suggestions
 * @author raowenjuan <raowenjuan@baidu.com>
 */

import '../style/index.less';
import san from 'san';
import Icon from 'santd/icon';
import Nav from './nav';
import classNames from 'classnames';
import toStyle from 'to-style';

// 注意公共方法提取到 util，送人玫瑰手有余香~
import {classCreator} from 'santd/core/util';

// cc()就是 prefix class，cc('xxx')返回 prefixClass-xxx
const cc = classCreator('suggestions');
const prefixCls = cc();
// 复用san-dropdown-menu样式
const ccdrop = classCreator('dropdown');
const prefixDropCls = ccdrop();

export default san.defineComponent({
    template: `<div className="${prefixCls}-wrapper" style="{{innerStyle}}">
            <div className="${prefixCls}-content ${prefixDropCls}-menu">
                <template s-if="{{length}}">
                    <s-nav s-for="item in suggestions" classes="${prefixDropCls}-menu-item">{{item}}</s-nav>
                </template>
                <s-icon s-else-if="{{loading}}" type="loading"></s-icon>
                <div s-else className="${prefixCls}-notfound">{{notFoundContent}}</div>
            </div>
        </div>`,
    components: {
        's-icon': Icon,
        's-nav': Nav
    },

    computed: {
        length() {
            return this.data.get('suggestions') && this.data.get('suggestions').length > 0;
        },
        innerStyle() {
            const isShowSug = this.data.get('isShowSug');
            const position = this.data.get('position');
            const isTop = this.data.get('placement') === 'top';
            return {
                display: isShowSug ? 'block' : 'none',
                left: `${position.left}px`,
                top: isTop ? 'auto' : `${position.top + position.height}px`,
                bottom: isTop ? `${position.top + position.height}px;` : 'auto',
                ...toStyle.object(this.data.get('style'))
            };
        }
    },
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
});
