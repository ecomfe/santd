/**
 * @file issue helper repro modal file
 **/

import san from 'san';
import Modal from 'santd/modal';
import i18n from '../i18n';

export default san.defineComponent({
    components: {
        's-modal': Modal,
        's-i18n': i18n
    },

    initData() {
        return {
            show: false
        };
    },

    showModal(visible) {
        this.data.set('show', visible);
    },

    template: `<div class="form-intro paragraph">
        <s-i18n id="reproHelp" on-click-repro-modal="showModal(true)" lang="{{lang}}" />
        <s-modal
            visible="{{show}}"
            title="{{i18n['repro.about']}}"
            class="medium"
            width="680"
            on-cancel="showModal(false)"
        >
            <div class="default-body">
                <s-i18n id="reproModal" />
            </div>
        </s-modal>
    </div>`
});
