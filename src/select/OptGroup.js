/**
 * @file select/OptGroup
 * @author
 */

import san, {DataTypes} from 'san';

export default san.defineComponent({
    isSelectOptionGroup: true,

    template: `
        <template>
            <slot/>
        </template>
    `,

    dataTypes: {
        label: DataTypes.string
    },

    messages: {
        'select:addOptionToGroup'({value: option}) {
            this.data.push('options', option, {silent: true});
        }
    },

    inited() {
        return {
            options: []
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
