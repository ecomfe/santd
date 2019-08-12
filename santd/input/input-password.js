/**
* @file inputPassword 输入框密码组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import classNames from 'classnames';
import BaseInput from './base';
import Icon from '../icon';
const pagin = classCreator('input-password');
const prefixCls = pagin();

export default san.defineComponent({
    components: {
        's-base-input': BaseInput,
        's-icon': Icon
    },
    computed: {
        className() {
            return classNames({
                [`${prefixCls}`]: true,
                ['san-input-affix-wrapper']: true
            });
        }
    },
    initData() {
        return {
            type: 'password',
            visibilityToggle: true
        };
    },
    created() {
        this.watch('value', val => {
            this.setBindData();
        });
        this.setBindData();
    },
    messages: {
        inputChange(item) {
            this.fire('change', item.value);
            this.dispatch('formChange', item.value);
        },
        pressEnter(item) {
            this.fire('pressEnter', item.value);
        },
        inputBlur(item) {
            this.fire('blur', item.value);
            this.dispatch('formBlur', item.value);
        }
    },
    handleEye() {
        const type = this.data.get('type');
        const typeMap = {
            password: 'text',
            text: 'password'
        };
        this.data.set('type', typeMap[type]);

    },
    setBindData() {
        const allData = Object.assign({}, this.data.get());
        delete allData.size;
        delete allData.style;
        this.data.set('_INPUTPROPS', allData);
    },
    template: `
        <span class="{{className}}">
            <s-base-input
                s-bind="{{_INPUTPROPS}}"
                type="{{type}}"
            />
            <span class="san-input-suffix" s-if="visibilityToggle" on-click="handleEye">
                <s-icon s-if="type==='password'" type="eye-invisible"></s-icon>
                <s-icon s-if="type==='text'" type="eye"></s-icon>
            </span>
        </span>
    `
});
