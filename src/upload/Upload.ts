/**
 * @file upload
 * @author leon <ludafa@outlook.com>
 */

import AjaxUploader from './src/AjaxUploader';
import UploadList from './UploadList';
import uniqBy from 'lodash/uniqBy';
import findIndex from 'lodash/findIndex';
import {classCreator} from '../core/util';
import {fileToObject, genPercentAdd, getFileItem, removeFileItem} from './utils';
import localeReceiver from '../locale-provider/receiver';
import Base from 'santd/base';
import type {UploadProps, UploadState, UploadComputed} from './interface';

const prefixCls = classCreator('upload')();


const uploadButtonTemplate = `
<div
    class="${prefixCls} ${prefixCls}-select ${prefixCls}-select-{{listType}} {{disabled ? '${prefixCls}-disabled': ''}}"
    style="{{showButton ? '' : 'display:none;'}}"
>
    <s-upload
        accept="{{accept}}"
        showButton="{{showButton}}"
        prefixCls="${prefixCls}"
        listType="{{listType}}"
        action="{{action}}"
        withCredentials="{{withCredentials}}"
        directory="{{directory}}"
        beforeUpload="{{beforeUpload}}"
        customRequest="{{customRequest}}"
        data="{{data}}"
        disabled="{{disabled}}"
        headers="{{headers}}"
        multiple="{{multiple}}"
        name="{{name}}"
        method="{{method}}"
        openFileDialogOnClick="{{openFileDialogOnClick && !disabled}}"
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

export default class Upload extends Base<UploadState, UploadProps, UploadComputed> {
    static template = `<span>
        <template s-if="type === 'drag'">
        <div
            class="{{dragClass}}"
            on-drop="handleFileDrop"
            on-dragover="handleFileDrop"
            on-dragLeave="handleFileDrop"
        >
            <s-upload
                accept="{{accept}}"
                prefixCls="${prefixCls}"
                listType="{{listType}}"
                action="{{action}}"
                withCredentials="{{withCredentials}}"
                directory="{{directory}}"
                beforeUpload="{{beforeUpload}}"
                customRequest="{{customRequest}}"
                data="{{data}}"
                disabled="{{disabled}}"
                headers="{{headers}}"
                multiple="{{multiple}}"
                name="{{name}}"
                openFileDialogOnClick="{{openFileDialogOnClick && !disabled}}"
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

    static computed = {
        ...localeReceiver.computed,

        dragClass(this: Upload) {
            const fileList = this.data.get('fileList') || [];
            const dragState = this.data.get('dragState');
            const disabled = this.data.get('disabled');

            let classArr = [prefixCls, `${prefixCls}-drag`];
            let uploadingExsit = fileList.some(
                (file: any) => file.status === 'uploading'
            );
            uploadingExsit && classArr.push(`${prefixCls}-drag-uploading`);
            dragState === 'dragover' && classArr.push(`${prefixCls}-drag-hover`);
            disabled && classArr.push(`${prefixCls}-disabled`);

            return classArr;
        }
    }

    static Dragger: object

    initData() {
        return {
            componentName: 'Upload',
            type: 'select',
            multiple: false,
            action: '',
            withCredentials: false,
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
            showButton: true,
            method: 'post'
        };
    }

    inited() {
        localeReceiver.inited.call(this);
        this.data.set('fileList', this.data.get('fileList') || this.data.get('defaultFileList') || []);
    }

    static components = {
        's-uploadlist': UploadList,
        's-upload': AjaxUploader
    }

    beforeUploadFunc(beforeUpload: UploadState['beforeUpload'], prevFileList: any[]) {
        return (file: any, fileList: any[], e: any) => {
            if (!beforeUpload) {
                return true;
            }

            const result = beforeUpload(file, fileList);
            if (result === false) {
                this.handleChange({
                    file,
                    fileList: uniqBy(prevFileList.concat(fileList.map(fileToObject)), (item: {uid: string | number}) => item.uid),
                    e,
                });
                return false;
            }
            if (result && typeof result !== 'boolean') {
                return result;
            }
            return true;
        };
    }
    progressTimer?: any

    clearProgressTimer() {
        this.progressTimer && clearInterval(this.progressTimer);
    }
    autoUpdateProgress(file: any) {
        const getPercent = genPercentAdd();
        let curPercent = 0;
        this.clearProgressTimer();
        this.progressTimer = setInterval(() => {
            curPercent = getPercent(curPercent);
            this.handleProgress({
                file
            });
        }, 200);
    }
    handleStart(file: any) {
        const targetItem = fileToObject(file);
        targetItem.status = 'uploading';

        const nextFileList = this.data.get('fileList').concat();
        const maxCount = +this.data.get('maxCount');

        // Cut to match count
        if (maxCount === nextFileList.length) {
            if (maxCount === 1) {
                nextFileList.shift();
            }
            else {
                return;
            }
        }

        const fileIndex = findIndex(nextFileList, ({uid}: {uid: string | number}) => uid === targetItem.uid);
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
    }
    handleError({err, ret, file, e}: any) {
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
        const fileIndex = findIndex(fileList, ({uid}: {uid: string | number}) => uid === targetItem.uid);
        this.data.set('fileList[' + fileIndex + ']', targetItem);
        this.handleChange({
            file: {...targetItem},
            fileList,
            e
        });
    }
    handleProgress({e, file}: {e?: any, file?: any}) {
        const fileList = this.data.get('fileList');
        const targetItem = getFileItem(file, fileList);
        // removed
        if (!targetItem) {
            return;
        }
        targetItem.percent = e.percent;
        const fileIndex = findIndex(fileList, ({uid}: {uid: number | string}) => uid === targetItem.uid);
        this.data.set('fileList[' + fileIndex + ']', targetItem);
        this.handleChange({
            e,
            file: {...targetItem},
            fileList
        });
    }
    handleSuccess({ret, file, e}: {ret?: string, file?: any, e?: object}) {
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
        const fileIndex = findIndex(fileList, ({uid}: {uid: string | number}) => uid === targetItem.uid);
        this.data.set('fileList[' + fileIndex + ']', targetItem);
        this.handleChange({
            file: {...targetItem},
            fileList,
            e
        });
    }
    handleChange(info: any) {
        this.data.set('fileList', Array.from(info.fileList));
        this.fire('change', info);
        this.dispatch('UI:form-item-interact', {fieldValue: info, type: 'change', e: info.e});
    }
    handleRemove(file: any) {
        const status = file.status;
        file.status = 'removed';
        const that = this;

        Promise.resolve((function () {
            that.fire('remove', file);
        })()).then((ret:any) => {
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
    }
    handleManualRemove(file: any) {
        this.handleRemove(file);
    }
    handlePreview(file: any) {
        this.fire('preview', file);
    }
    handleFileDrop(e: {type: string}) {
        this.data.set('dragState', e.type);
    }
}
