/**
 * @file upload
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import Upload from './src/ajaxUploader';
import UploadList from './uploadlist';
import uniqBy from 'lodash/uniqBy';
import findIndex from 'lodash/findIndex';
import {classCreator} from '../core/util';
import {fileToObject, genPercentAdd, getFileItem, removeFileItem} from './utils';
import localeReceiver from '../localeprovider/receiver';

const prefixCls = classCreator('upload')();


const uploadButtonTemplate = `
<div
    class="${prefixCls} ${prefixCls}-select ${prefixCls}-select-{{listType}} {{disabled ? '${prefixCls}-disabled': ''}}"
    style="{{showButton ? '' : 'display:none;'}}"
>
    <s-upload
        showButton="{{showButton}}"
        prefixCls="${prefixCls}"
        listType="{{listType}}"
        action="{{action}}"
        directory="{{directory}}"
        beforeUpload="{{beforeUpload}}"
        customRequest="{{customRequest}}"
        data="{{data}}"
        disabled="{{disabled}}"
        headers="{{headers}}"
        multiple="{{multiple}}"
        name="{{name}}"
        openFileDialogOnClick="{{openFileDialogOnClick}}"
        beforeUpload="{{beforeUploadFunc(beforeUpload, fileList)}}"
        s-ref="button"
        on-start="handleStart"
        on-error="handleError"
        on-progress="handleProgress"
        on-success="handleSuccess"
    ><slot /></s-upload>
</div>
`;

const uploadListTemplate = `
    <s-uploadlist
        s-if="showUploadList"
        listType="{{listType}}"
        fileList="{{fileList}}"
        previewFile="{{previewFile}}"
        showRemoveIcon="{{!disabled && showRemoveIcon}}"
        showPreviewIcon="{{showPreviewIcon}}"
        locale="{{locale}}"
        on-remove="handleManualRemove"
        on-preview="handlePreview"
    />
`;

export default san.defineComponent({
    computed: {
        ...localeReceiver.computed,

        dragClass() {
            const fileList = this.data.get('fileList') || [];
            const dragState = this.data.get('dragState');
            const disabled = this.data.get('disabled');

            let classArr = [prefixCls, `${prefixCls}-drag`];
            let uploadingExsit = fileList.some(
                file => file.status === 'uploading'
            );
            uploadingExsit && classArr.push(`${prefixCls}-drag-uploading`);
            dragState === 'dragover' && classArr.push(`${prefixCls}-drag-hover`);
            disabled && classArr.push(`${prefixCls}-disabled`);

            return classArr;
        }
    },

    initData() {
        return {
            componentName: 'Upload',
            type: 'select',
            multiple: false,
            action: '',
            data: {},
            accept: '',
            beforeUpload() {
                return true;
            },
            showUploadList: true,
            listType: 'text',
            disabled: false,
            openFileDialogOnClick: true,
            dragState: 'drop',
            showButton: true
        };
    },

    inited() {
        localeReceiver.inited.call(this);
        this.data.set('fileList', this.data.get('fileList') || this.data.get('defaultFileList') || []);
    },

    components: {
        's-uploadlist': UploadList,
        's-upload': Upload
    },

    beforeUploadFunc(beforeUpload, prevFileList) {
        return (file, fileList, e) => {
            if (!beforeUpload) {
                return true;
            }

            const result = beforeUpload(file, fileList);
            if (result === false) {
                this.handleChange({
                    file,
                    fileList: uniqBy(prevFileList.concat(fileList.map(fileToObject)), item => item.uid),
                    e
                });
                return false;
            }
            if (result && result.then) {
                return result;
            }
            return true;
        };
    },
    clearProgressTimer() {
        clearInterval(this.progressTimer);
    },
    autoUpdateProgress(file) {
        const getPercent = genPercentAdd();
        let curPercent = 0;
        this.clearProgressTimer();
        this.progressTimer = setInterval(() => {
            curPercent = getPercent(curPercent);
            this.handleProgress({
                percent: curPercent * 100,
                file
            });
        }, 200);
    },
    handleStart(file) {
        const targetItem = fileToObject(file);
        targetItem.status = 'uploading';

        const nextFileList = this.data.get('fileList').concat();

        const fileIndex = findIndex(nextFileList, ({uid}) => uid === targetItem.uid);
        if (fileIndex === -1) {
            nextFileList.push(targetItem);
        }
        else {
            nextFileList[fileIndex] = targetItem;
        }

        this.handleChange({
            file: targetItem,
            fileList: nextFileList
        });
        // fix ie progress
        if (!window.FormData) {
            this.autoUpdateProgress(targetItem);
        }
    },
    handleError({err, ret, file, e}) {
        this.clearProgressTimer();
        const fileList = this.data.get('fileList');
        const targetItem = getFileItem(file, fileList);
        // removed
        if (!targetItem) {
            return;
        }
        targetItem.error = err;
        targetItem.response = ret;
        targetItem.status = 'error';
        const fileIndex = findIndex(fileList, ({uid}) => uid === targetItem.uid);
        this.data.set('fileList[' + fileIndex + ']', targetItem);
        this.handleChange({
            file: {...targetItem},
            fileList,
            e
        });
    },
    handleProgress({e, file}) {
        const fileList = this.data.get('fileList');
        const targetItem = getFileItem(file, fileList);
        // removed
        if (!targetItem) {
            return;
        }
        targetItem.percent = e.percent;
        const fileIndex = findIndex(fileList, ({uid}) => uid === targetItem.uid);
        this.data.set('fileList[' + fileIndex + ']', targetItem);
        this.handleChange({
            e,
            file: {...targetItem},
            fileList
        });
    },
    handleSuccess({ret, file, e}) {
        this.clearProgressTimer();
        try {
            if (typeof ret === 'string') {
                ret = JSON.parse(ret);
            }
        }
        catch (e) {}
        const fileList = this.data.get('fileList');
        const targetItem = getFileItem(file, fileList);
        // removed
        if (!targetItem) {
            return;
        }
        targetItem.status = 'done';
        targetItem.response = ret;
        const fileIndex = findIndex(fileList, ({uid}) => uid === targetItem.uid);
        this.data.set('fileList[' + fileIndex + ']', targetItem);
        this.handleChange({
            file: {...targetItem},
            fileList,
            e
        });
    },
    handleChange(info) {
        this.data.set('fileList', Array.from(info.fileList));
        this.fire('change', info);
        this.dispatch('UI:form-item-interact', {fieldValue: info, type: 'change', e: info.e});
    },
    handleRemove(file) {
        const status = file.status;
        file.status = 'removed';
        const that = this;

        Promise.resolve((function () {
            that.fire('remove', file);
        })()).then(ret => {
            // Prevent removing file
            if (ret === false) {
                file.status = status;
                return;
            }

            const removedFileList = removeFileItem(file, this.data.get('fileList'));
            if (removedFileList) {
                this.handleChange({
                    file,
                    fileList: removedFileList
                });
            }
        });
    },
    handleManualRemove(file) {
        const button = this.ref('button');
        const upload = button.ref('upload');
        if (upload) {
            upload.abort(file);
        }
        this.handleRemove(file);
    },
    handlePreview(file) {
        this.fire('preview', file);
    },
    handleFileDrop(e) {
        this.data.set('dragState', e.type);
    },
    template: `<span>
        <template s-if="type === 'drag'">
        <div
            class="{{dragClass}}"
            on-drop="handleFileDrop"
            on-dragover="handleFileDrop"
            on-dragLeave="handleFileDrop"
        >
            <s-upload
                prefixCls="${prefixCls}"
                listType="{{listType}}"
                action="{{action}}"
                directory="{{directory}}"
                beforeUpload="{{beforeUpload}}"
                customRequest="{{customRequest}}"
                data="{{data}}"
                disabled="{{disabled}}"
                headers="{{headers}}"
                multiple="{{multiple}}"
                name="{{name}}"
                openFileDialogOnClick="{{openFileDialogOnClick}}"
                beforeUpload="{{beforeUploadFunc(beforeUpload, fileList)}}"
                s-ref="button"
                class="${prefixCls}-btn"
                on-start="handleStart"
                on-error="handleError"
                on-progress="handleProgress"
                on-success="handleSuccess"
            ><div class="${prefixCls}-drag-container"><slot /></div></s-upload>
        </div>
        ${uploadListTemplate}
        </template>
        <template s-else-if="listType === 'picture-card'">
            ${uploadListTemplate}
            ${uploadButtonTemplate}
        </template>
        <template s-else>
            ${uploadButtonTemplate}
            ${uploadListTemplate}
        </template>
    </span>`
});
