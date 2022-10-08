/**
 * @file image 预览组
 * @author liulu36
 */

import san from 'san';
import Preview from './Preview';
import {classCreator} from '../core/util';

const prefixCls = classCreator('image-group')();

export default san.defineComponent({
    template: `
        <div
            class="${prefixCls}">
            <slot />
            <s-preview
                isPreviewGroup="{{true}}"
                previewUrls="{{previewUrls}}"
                current="{{current}}"
                visible="{{isShowPreview}}"
                on-close="onPreviewClose"
            />
        </div>
     `,

    components: {
        's-preview': Preview
    },
    messages: {
        santd_image_add(payload) {
            payload.target.data.set('isPreviewGroup', true);
            this.data.merge('previewUrls', {
                [payload?.value.currentId]: payload.value?.src
            });
        },
        santd_image_remove(payload) {
            this.data.merge('previewUrls', {
                [+payload?.value]: null
            });
        },
        santd_image_click(payload) {
            this.data.set('isShowPreview', Boolean(payload?.value));
            this.data.assign({
                isShowPreview: true,
                current: payload?.value.currentId
            });
        },
        santd_image_preview_set_current(payload) {
            this.data.set('current', +payload?.value);
        }
    },
    initData() {
        return {
            imageList: [],
            current: 0,
            isShowPreview: false,
            previewUrls: {}
        };
    },
    onPreviewClose() {
        this.data.set('isShowPreview', false);
    }
});
