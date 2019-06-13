/**
 * @file 组件 suggestions
 * @author raowenjuan <raowenjuan@baidu.com>
 */

import '../style/index.less';
import san, {DataTypes} from 'san';
import Icon from 'santd/icon';
import Nav from './nav';
import classNames from 'classnames';
import toStyle from 'to-style';

import {classCreator} from 'santd/core/util';

const cc = classCreator('suggestions');
const prefixCls = cc();
// 复用san-dropdown-menu样式
const ccdrop = classCreator('dropdown');
const prefixDropCls = ccdrop();

export default san.defineComponent({
    dataTypes: {
        placement: DataTypes.string,
        position: DataTypes.object,
        isShowSug: DataTypes.bool,
        loading: DataTypes.bool
    },
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
    compiled() {
        const parentSuggestion = this.parentComponent.data.get('suggestions');
        if (typeof parentSuggestion === 'function') {
            this.components.newsuggestion = parentSuggestion;
        } else {
            this.components.newsuggestion = null;
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
            loading: false,
            newsuggestion: this.components.newsuggestion
        };
    },
    created() {
        let renderer;
        this.watch('suggestions', val => {
            const navRef= this.ref('nav-area');
            if (navRef && typeof val === 'function') {
                navRef.innerHTML = '';
                renderer = new val();
                renderer.attach(navRef);
                renderer.parentComponent = this;
            }
        });
    },
    template: `
        <div className="${prefixCls}-wrapper" style="{{innerStyle}}">
            <div className="${prefixCls}-content ${prefixDropCls}-menu" s-ref="nav-area">
                <newsuggestion s-if="newsuggestion"></newsuggestion>
                <template s-else>
                    <s-nav s-if="{{length}}" s-for="item in suggestions">{{item}}</s-nav>
                    <s-icon s-else-if="{{loading}}" type="loading" style="display:block;margin:0 auto;"></s-icon>
                    <div s-else className="${prefixCls}-notfound">{{notFoundContent}}</div>
                </template>
            </div>
        </div>
        `
});
