/**
 * @file upload
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import Upload from './src/ajaxUploader';
import UploadList from './uploadList';
import uniqBy from 'lodash/uniqBy';
import findIndex from 'lodash/findIndex';
import {classCreator} from 'santd/core/util';
import {fileToObject, genPercentAdd, getFileItem, removeFileItem} from './utils';
import classNames from 'classnames';

const prefixCls = classCreator('upload')();

const UploadButton = san.defineComponent({
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const disabled = this.data.get('disabled');
            const listType = this.data.get('listType');

            return classNames(prefixCls, `${prefixCls}-select`, `${prefixCls}-select-${listType}`, {
                [`${prefixCls}-disabled`]: disabled
            });
        }
    },
    components: {
        's-upload': Upload
    },
    handleStart(params) {
        this.fire('start', params);
    },
    handleError(params) {
        this.fire('error', params);
    },
    handleProgress(params) {
        this.fire('progress', params);
    },
    handleSuccess(params) {
        this.fire('success', params);
    },
    template: `<div class="{{classes}}" style="{{hasChildren ? '' : 'display: none;'}}">
        <s-upload
            prefixCls="{{prefixCls}}"
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
            beforeUpload="{{beforeUpload}}"
            s-ref="upload"
            on-start="handleStart"
            on-error="handleError"
            on-progress="handleProgress"
            on-success="handleSuccess"
        >
            <slot />
        </s-upload>
    </div>`
});

export default san.defineComponent({
    updated() {
        const instance = this.data.get('instance');
        const slotChildren = instance && instance.slotChildren || [];
        const children = slotChildren.length && slotChildren[0].children || [];

        let result = false;
        children.forEach(child => {
            if (child.nodeType === 4 || child.nodeType === 5
                || (child.nodeType === 2 && child.children.length)
            ) {
                result = true;
            }
        });

        this.data.set('hasChildren', result);
    },
    computed: {
        beforeUploadFunc() {
            const beforeUpload = this.data.get('beforeUpload');
            const instance = this.data.get('instance');
            const prevFileList = this.data.get('fileList');

            return function (file, fileList) {
                if (!beforeUpload) {
                    return true;
                }

                const result = beforeUpload(file, fileList);
                if (result === false) {
                    instance.handleChange({
                        file,
                        fileList: uniqBy(prevFileList.concat(fileList.map(fileToObject)), item => item.uid)
                    });
                    return false;
                }
                if (result && result.then) {
                    return result;
                }
                return true;
            };
        },
        dragClass() {
            const prefixCls = this.data.get('prefixCls');
            const fileList = this.data.get('fileList') || [];
            const dragState = this.data.get('dragState');
            const disabled = this.data.get('disabled');

            return classNames(prefixCls, `${prefixCls}-drag`, {
                [`${prefixCls}-drag-uploading`]: fileList.some(
                    file => file.status === 'uploading',
                ),
                [`${prefixCls}-drag-hover`]: dragState === 'dragover',
                [`${prefixCls}-disabled`]: disabled
            });
        }
    },
    initData() {
        return {
            prefixCls,
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
            dragState: 'drop'
        };
    },
    inited() {
        const fileList = this.data.get('fileList');
        const defaultFileList = this.data.get('defaultFileList');

        this.data.set('fileList', fileList || defaultFileList || []);
    },
    attached() {
        this.data.set('instance', this);
    },
    components: {
        's-uploadbutton': UploadButton,
        's-uploadlist': UploadList,
        's-upload': Upload
    },
    clearProgressTimer() {
        clearInterval(this.progressTimer);
    },
    autoUpdateProgress(_, file) {
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
            this.autoUpdateProgress(0, targetItem);
        }
    },
    handleError({err, ret, file}) {
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
            fileList
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
            event: e,
            file: {...targetItem},
            fileList
        });
    },
    handleSuccess({ret, file}) {
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
            fileList
        });
    },
    handleChange(info) {
        this.data.set('fileList', [...info.fileList]);
        this.fire('change', info);
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
    template: `<span class="{{className}}">
        <template s-if="type === 'drag'">
        <div
            class="{{dragClass}}"
            on-drop="handleFileDrop"
            on-dragover="handleFileDrop"
            on-dragLeave="handleFileDrop"
        >
            <s-upload
                prefixCls="{{prefixCls}}"
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
                beforeUpload="{{beforeUploadFunc}}"
                s-ref="button"
                hasChildren="{{hasChildren}}"
                className="{{prefixCls}}-btn"
                on-start="handleStart"
                on-error="handleError"
                on-progress="handleProgress"
                on-success="handleSuccess"
            ><div class="{{prefixCls}}-drag-container"><slot/></div></s-upload>
        </div>
        <s-uploadlist
            s-if="showUploadList"
            listType="{{listType}}"
            fileList="{{fileList}}"
            previewFile="{{previewFile}}"
            showRemoveIcon="{{!disabled && showRemoveIcon}}"
            showPreviewIcon="{{showPreviewIcon}}"
            on-remove="handleManualRemove"
            on-preview="handlePreview"
        />
        </template>
        <template s-else-if="listType === 'picture-card'">
        <s-uploadlist
            s-if="showUploadList"
            listType="{{listType}}"
            fileList="{{fileList}}"
            previewFile="{{previewFile}}"
            showRemoveIcon="{{!disabled && showRemoveIcon}}"
            showPreviewIcon="{{showPreviewIcon}}"
            on-remove="handleManualRemove"
            on-preview="handlePreview"
        />
        <s-uploadbutton
            prefixCls="{{prefixCls}}"
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
            beforeUpload="{{beforeUploadFunc}}"
            s-ref="button"
            hasChildren="{{hasChildren}}"
            on-start="handleStart"
            on-error="handleError"
            on-progress="handleProgress"
            on-success="handleSuccess"
        ><slot /></s-uploadbutton>
        </template>
        <template s-else>
        <s-uploadbutton
            prefixCls="{{prefixCls}}"
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
            beforeUpload="{{beforeUploadFunc}}"
            s-ref="button"
            hasChildren="{{hasChildren}}"
            on-start="handleStart"
            on-error="handleError"
            on-progress="handleProgress"
            on-success="handleSuccess"
        ><slot /></s-uploadbutton>
        <s-uploadlist
            s-if="showUploadList"
            listType="{{listType}}"
            fileList="{{fileList}}"
            previewFile="{{previewFile}}"
            showRemoveIcon="{{!disabled && showRemoveIcon}}"
            showPreviewIcon="{{showPreviewIcon}}"
            on-remove="handleManualRemove"
            on-preview="handlePreview"
        />
        </template>
    </span>`
});
