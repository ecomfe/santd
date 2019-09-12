/**
* @file form 组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import createDOMForm from './src/createDOMForm';
import createFormField from './src/createFormField';
import './style/index';

const pagin = classCreator('form');

let form = san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        hideRequiredMark: DataTypes.bool,
        layout: DataTypes.oneOf(['inline', 'horizontal', 'vertical']),
        className: DataTypes.string,
        wrapperCol: DataTypes.object,
        labelCol: DataTypes.object,
        labelAlign: DataTypes.string,
        colon: DataTypes.bool
    },
    computed: {
        formClassName() {
            const layout = this.data.get('layout');
            const prefixCls = this.data.get('prefixCls') || pagin();
            const hideRequiredMark = this.data.get('hideRequiredMark');
            let classArr = [prefixCls];
            layout === 'horizontal' && classArr.push(`${prefixCls}-horizontal`);
            layout === 'vertical' && classArr.push(`${prefixCls}-vertical`);
            layout === 'inline' && classArr.push(`${prefixCls}-inline`);
            hideRequiredMark && classArr.push(`${prefixCls}-hide-required-mark`);
            return classArr;
        }
    },
    initData() {
        return {
            colon: true,
            layout: 'horizontal',
            hideRequiredMark: false,
            labelAlign: 'right'
        };
    },
    handleSubmit(e) {
        this.fire('submit', e);
    },
    template: `
        <form
            class="{{formClassName}}"
            on-submit="handleSubmit"
        >
            <slot></slot>
        </form>
    `
});

form.createFormField = createFormField;

form.create = function (options) {
    return createDOMForm({
        fieldNameProps: 'id',
        ...options,
        fieldMetaProp: 'data-__meta',
        fieldDataProps: 'data-__field'
    });
};

export default form;
