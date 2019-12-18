/**
 * @file issue helper preview modal file
 **/

import san from 'san';
import Button from 'santd/button';
import Modal from 'santd/modal';
import marked from 'marked';

export default san.defineComponent({
    components: {
        's-modal': Modal,
        's-button': Button
    },

    computed: {
        info() {
            return marked(this.data.get('content') || '');
        }
    },

    cancel() {
        this.fire('cancel');
    },

    create() {
        this.fire('create');
    },

    template: `<div class="form-intro paragraph">
        <s-modal
            title="{{i18n['previewModal.title']}}"
            visible="{{visible}}"
            on-cancel="cancel"
        >
            {{info | raw}}
            <s-button slot="footer" on-click="create" type="primary">{{i18n['issue.create']}}</s-button>
        </s-modal>
    </div>`
});
