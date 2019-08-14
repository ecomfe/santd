/**
 * @file Santd transfer render list body file
 * @author mayihui@baidu.com
 **/
import san from 'san';
import Checkbox from '../checkbox';

export default san.defineComponent({
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const item = this.data.get('item') || {};
            const disabled = this.data.get('disabled');
            let classArr = [`${prefixCls}-content-item`];
            (disabled || item.disabled) && classArr.push(`${prefixCls}-content-item-disabled`);
            return classArr;
        },
        title() {
            const renderText = this.data.get('renderText');
            if (typeof renderText === 'string' || typeof renderText === 'number') {
                return String(renderText);
            }
        },
        checked() {
            const item = this.data.get('item');
            const selectedKeys = this.data.get('selectedKeys');

            return selectedKeys.indexOf(item.key) >= 0;
        },
        injectRenderedEl() {
            const renderedEl = this.data.get('renderedEl');
            const instance = this.data.get('instance');

            if (typeof renderedEl !== 'string' && instance) {
                instance.components.renderedel = renderedEl;
                return renderedEl;
            }
        }
    },
    inited() {
        this.data.set('instance', this);
    },
    handleClick(item) {
        const disabled = this.data.get('disabled');
        if (disabled || item.disabled) {
            return;
        }
        this.fire('click', item);
    },
    components: {
        's-checkbox': Checkbox
    },
    template: `
        <li
            class="{{classes}}"
            title="{{title}}"
            on-click="handleClick(item)"
        >
            <s-checkbox checked="{{checked}}" disabled="{{disabled || item.disabled}}" />
            <renderedel s-if="injectRenderedEl" item="{{item}}"/>
            <span s-else>{{renderedEl}}</span>
        </li>
        `
});
