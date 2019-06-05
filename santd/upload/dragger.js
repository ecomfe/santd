/**
 * @file 组件 upload
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator, guid} from 'santd/core/util';
import classNames from 'classnames';
import uploader from './uploader';

const cc = classCreator('upload');
const prefix = cc('');

export default san.defineComponent({
    template: `
        <template>
            <s-uploader
                type="drag"
                style="{{style}}"
                action="{{action}}"
                directory="{{action}}"
                defaultFileList="{{defaultFileList}}"
                disabled="{{disabled}}"
                fileList="{{fileList}}"
                headers="{{headers}}"
                listType="{{listType}}"
                multiple="{{multiple}}"
                name="{{name}}"
                showUploadList="{{showUploadList}}"
                withCredentials="{{withCredentials}}"
                openFileDialogOnClick="{{openFileDialogOnClick}}"
                on-change="onChange"
                on-remove="onRemove"
                on-preview="onPreview"
            >
                <slot></slot>
            </s-uploader>
        </template>
    `,
    components: {
        's-uploader': uploader
    },
    computed: {
    },
    onChange(arg) {
        this.fire('change', arg);
    },
    onPreview(arg) {
        this.fire('preview', arg);
    },
    onRemove(arg) {
        this.fire('remove', arg);
    },
});
