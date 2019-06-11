/**
 * @file Santd transfer render list body file
 * @author mayihui@baidu.com
 **/
import san from 'san';
import Icon from 'santd/icon';
import Input from 'santd/input';

export default san.defineComponent({
    initData() {
        return {
            placeholder: ''
        };
    },
    handleChange(e) {
        this.fire('change', e);
    },
    handleClear(e) {
        e.preventDefault();
        const disabled = this.data.get('disabled');
        if (!disabled) {
            this.fire('clear', e);
        }
    },
    components: {
        's-input': Input,
        's-icon': Icon
    },
    template: `
        <div>
            <s-input
                placeholder="{{placeholder}}"
                className="{{prefixCls}}"
                value="{{value}}"
                disabled="{{disabled}}"
                on-change="handleChange"
            />
            <a
                href="#"
                className="{{prefixCls}}-action"
                on-click="handleClear"
                s-if="value && value.length > 0"
            >
                <s-icon type="close-circle" theme="filled" />
            </a>
            <span className="{{prefixCls}}-action" s-else>
                <s-icon type="search" />
            </span>
        </div>
    `
});
