/**
 * @file 组件 modal/Modal
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/modal-cn/
 */

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import {classCreator} from 'santd/core/util';
import Dialog from './Dialog';
import button from 'santd/button';

const cc = classCreator('modal');
const prefixCls = cc();
const locale = {
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了'
};

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        okText: DataTypes.string,
        cancelText: DataTypes.string,
        centered: DataTypes.bool,
        width: DataTypes.oneOfType([DataTypes.number, DataTypes.string]),
        confirmLoading: DataTypes.bool,
        visible: DataTypes.bool,
        closable: DataTypes.bool,
        getContainer: DataTypes.func
    },
    components: {
        's-button': button
    },
    computed: {
        wrapClass() {
            const centered = this.data.get('centered');
            const prefixCls = this.data.get('prefixCls');
            const wrapClassName = this.data.get('wrapClassName');
            return classNames({
                [`${prefixCls}-centered`]: !!centered
            }, wrapClassName);
        }
    },
    initData() {
        return {
            prefixCls,
            width: 520,
            transitionName: 'zoom',
            maskTransitionName: 'fade',
            confirmLoading: false,
            visible: false,
            okType: 'primary',
            locale
        };
    },
    attached() {
        if (!this.dialog) {
            const {getContainer, ...props} = this.data.get();
            this.data.set('_PROPS_', props);
            this.dialog = new Dialog({
                owner: this,
                source: `
                    <s-dialog s-bind="{{_PROPS_}}"
                        title="{=title=}"
                        visible="{=visible=}"
                        wrapClassName="{{wrapClass}}"
                        on-close="handleCancel"
                        on-afterClose="afterClose"
                    >
                        <slot/>
                        <slot name="footer" slot="footer">
                            <s-button s-bind="{{cancelButtonProps}}"
                                on-click="handleCancel"
                            >{{cancelText || locale.cancelText}}</s-button>
                            <s-button s-bind="{{okButtonProps}}"
                                type="{{okType}}"
                                loading="{{confirmLoading}}"
                                on-click="handleOk"
                            >{{okText || locale.okText}}</s-button>
                        </slot>
                    </s-dialog>
                `
            });

            const container = getContainer ? getContainer() : document.body;
            this.dialog.attach(container);
        }
    },
    handleCancel(e) {
        this.fire('cancel', e);
    },
    handleOk(e) {
        this.fire('ok', e);
    },
    afterClose() {
        this.fire('afterClose');
    }
});
