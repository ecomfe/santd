/**
 * @file select/Option
 * @author
 */

import san, {DataTypes} from 'san';

export default san.defineComponent({
    isSelectOption: true,

    template: `
        <template>
            <slot/>
        </template>
    `,

    dataTypes: {
        disabled: DataTypes.bool,
        label: DataTypes.string,
        title: DataTypes.string,
        value: DataTypes.oneOfType([DataTypes.string, DataTypes.number])
    },

    initData() {
        return {
            disabled: false
        };
    },

    attached() {
        this.dispatch('select:updateOptions');
    },

    updated() {
        this.dispatch('select:updateOptions');
    },

    detached() {
        this.dispatch('select:updateOptions');
    }
});
