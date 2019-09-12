/**
* @file select-option item
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';

export default san.defineComponent({
    dataTypes: {
        value: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        key: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        title: DataTypes.string,
        disabled: DataTypes.bool,
        className: DataTypes.string
    },
    initData() {
        return {
            componentPropName: 's-select-option'
        };
    },
    updated() {
        this.dispatch('watchOptionValueChange');
    },
    attached() {
        this.dispatch('watchOptionValueChange');
    },
    detached() {
        this.dispatch('watchOptionValueChange');
    },
    template: `
        <span style="display:none;"><slot></slot></span>
    `
});
