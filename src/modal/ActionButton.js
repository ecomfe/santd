/**
 * @file 组件 modal/ActionButton
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/modal-cn/
 */

import san, {DataTypes} from 'san';
import button from '../button';

export default san.defineComponent({
    template: `
        <template>
            <s-button s-ref="button"
                s-bind="{{buttonProps}}"
                type="{{type}}"
                loading="{{loading}}"
                on-click="onClick"
            ><slot/></s-button>
        </template>
    `,
    dataTypes: {
        actionFn: DataTypes.any,
        autoFocus: DataTypes.bool,
        buttonProps: DataTypes.object,
        closeModal: DataTypes.func,
        loading: DataTypes.bool,
        type: DataTypes.string
    },
    components: {
        's-button': button
    },
    initData() {
        return {
            loading: false
        };
    },
    attached() {
        const buttonNode = this.ref('button').el;
        const parentNode = this.el.parentNode;
        parentNode.replaceChild(buttonNode, this.el);

        if (this.data.get('autoFocus')) {
            this.timeoutId = setTimeout(() => buttonNode.focus());
        }
    },
    detached() {
        clearTimeout(this.timeoutId);
    },
    onClick() {
        const data = this.data;
        const actionFn = data.get('actionFn');
        const closeModal = data.get('closeModal');

        if (actionFn) {
            let ret;
            if (actionFn.length) {
                ret = actionFn(closeModal);
            }
            else {
                ret = actionFn();
                if (!ret) {
                    closeModal();
                }
            }
            if (ret && ret.then) {
                data.set('loading', true);
                ret.then((...args) => {
                    // It's unnecessary to set loading=false, for the Modal will be unmounted after close.
                    // data.set('loading', false);
                    closeModal(...args);
                }, () => {
                    // See: https://github.com/ant-design/ant-design/issues/6183
                    data.set('loading', false);
                });
            }
        }
        else {
            closeModal();
        }
    }
});
