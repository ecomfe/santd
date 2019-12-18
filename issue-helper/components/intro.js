/**
 * @file issue helper header file
 **/

import san from 'san';
import Button from 'santd/button';
import Modal from 'santd/modal';
import i18n from '../i18n';

export default san.defineComponent({
    initData() {
        return {
            show: false
        };
    },

    components: {
        's-button': Button,
        's-i18n': i18n,
        's-modal': Modal
    },

    showModal(visible) {
        this.data.set('show', visible);
    },

    template: `<div class="form-intro paragraph">
        <s-i18n id="intro" on-click-intro-modal="showModal(true)" lang="{{lang}}" />
        <s-modal
            visible="{{show}}"
            title="{{i18n['intro.modal']}}"
            class="medium"
            width="680"
            on-cancel="showModal(false)"
        >
            <s-i18n id="introModal" lang="{{lang}}" />
        </s-modal>
    </div>`
});
