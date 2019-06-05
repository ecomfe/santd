/**
 * @file Santd trigger utils portal file
 * @author mayihui@baidu.com
 **/

import san, {Component} from 'san';

export default san.defineComponent({
    attached() {
        this.createContainer();
        const Comp = this.data.get('getComponent');
        if (Comp && typeof Comp === 'function') {
            const instance = new Comp({
                owner: this
            });
            if (instance instanceof Component && this._container) {
                instance.attach(this._container);
                this.data.set('instance', instance);
            }
        }
        this.watch('getComponent', val => {
            const popup = val.prototype.components['s-popup'];
            const initData = val.prototype.initData.bind(val)();
            const instance = this.data.get('instance');
            const popupData = popup.prototype.initData && popup.prototype.initData.bind(popup)() || {};
            for (const key in initData) {
                instance && instance.data.set(key, initData[key]);
            }
            for (const key in popupData) {
                // 解决popupInstance不存在的问题
                this.nextTick(() => {
                    const popupInstance = instance.ref('popup');
                    popupInstance && popupInstance.data.set(key, popupData[key]);
                });
            }
        });
        this.el.parentNode.removeChild(this.el);
    },
    updated() {
        const didUpdate = this.data.get('didUpdate');
        if (didUpdate) {
            didUpdate(this.data.get());
        }
    },
    detached() {
        const instance = this.data.get('instance');
        instance && instance.detach();
        this.removeContainer();
    },
    createContainer() {
        const getContainer = this.data.get('getContainer');
        this._container = getContainer();
    },
    removeContainer() {
        if (this._container) {
            this._container.parentNode.removeChild(this._container);
        }
    },
    template: '<template />'
});
