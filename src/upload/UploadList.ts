/**
 * @file 组件 upload
 * @author chenkai13 <chenkai13@baidu.com>
 */

import {previewImage, isImageUrl} from './utils';
import Progress from '../progress';
import Icon from '../icon';
import Tooltip from '../tooltip';
import {classCreator} from '../core/util';
import Base from 'santd/base';
import type {
    FileIconProps,
    FileIconState,
    FileIconComputed,
    UploadListProps,
    UploadListState,
    UploadListComputed
} from './interface';

const prefixCls = classCreator('upload')();

class FileIcon extends Base<FileIconState, FileIconProps, FileIconComputed> {
    static template = `<span>
        <template s-if="listType === 'picture' || listType === 'picture-card'">
            <div
                s-if="listType === 'picture-card' && file.status === 'uploading'"
                class="${prefixCls}-list-item-uploading-text"
            >{{locale.uploading}}</div>
            <s-icon
                s-else-if="!file.thumbUrl && !file.url"
                class="${prefixCls}-list-item-thumbnail"
                type="picture"
            />
            <a
                s-else
                class="${prefixCls}-list-item-thumbnail"
                href="{{file.url || file.thumUrl}}"
                target="_blank"
                rel="noopener noreferrer"
                on-click="handlePreview(file, $event)"
            >
                <img src="{{file.thumbUrl || file.url}}" alt="{{file.name}}" s-if="isImage && (file.thumbUrl || file.url)" />
                <s-icon type="file" class="${prefixCls}-list-item-icon" theme="twoTone" s-else />
            </a>
        </template>
        <s-icon s-else type="{{file.status === 'uploading' ? 'loading' : 'paper-clip'}}" />
    </span>`

    static computed = {
        isImage(this: FileIcon) {
            const file = this.data.get('file');
            return isImageUrl(file);
        }
    }

    static components = {
        's-icon': Icon
    }

    handlePreview(file: any, e: Event) {
        this.fire('preview', {file, e});
    }
};

export default class UploadList extends Base<UploadListState, UploadListProps, UploadListComputed>{

    static computed = {
        items(this:UploadList) {
            const fileList = this.data.get('fileList');
            const locale = this.data.get('locale');

            return fileList.map((file: any) => {
                file.message = file.response && file.response === 'string'
                    ? file.response
                    : (file.error && file.error.statusText) || locale.uploadError;
                return {
                    ...file
                };
            });
        }
    }

    parentComponent: any = null;
    
    initData() {
        return {
            listType: 'text',
            progressAttr: {
                strokeWidth: 2,
                showInfo: false
            },
            showRemoveIcon: true,
            showPreviewIcon: true,
            previewFile: previewImage,
            fileList: []
        };
    }

    updated() {
        const {
            listType,
            previewFile,
            fileList
        } = this.data.get();

        if (listType !== 'picture' && listType !== 'picture-card') {
            return;
        }

        fileList!.forEach((file, index) => {
            if (
                typeof document === 'undefined' || typeof window === 'undefined'
                || !window.FileReader || !window.File
                || !(file.originFileObj instanceof File) || file.thumbUrl !== undefined
            ) {
                return;
            }
            file.thumbUrl = '';
            if (previewFile) {
                previewFile(file.originFileObj).then(previewDataUrl => {
                    file.thumbUrl = previewDataUrl || '';
                    this.data.set('fileList[' + index + ']', file);
                });
            }
        });
    }
    handleClose(file: any) {
        this.fire('remove', file);
    }
    handlePreview({file, e}: {file: any, e: Event}) {
        if (!this?.parentComponent?.listeners?.preview) {
            return;
        }
        e.preventDefault();
        this.fire('preview', file);
    }
    static components = {
        's-tooltip': Tooltip,
        's-fileicon': FileIcon,
        's-progress': Progress,
        's-icon': Icon
    }
    static template = `
        <div class="${prefixCls}-list ${prefixCls}-list-{{listType}}">
            <div
                s-for="file in items trackBy file.uid"
                class="${prefixCls}-list-item ${prefixCls}-list-item-{{file.status}}"
            >
                <div class="${prefixCls}-list-item-info">
                    <s-tooltip title="{{file.message}}" s-if="file.status === 'error'" class="${prefixCls}-list-item-info-error">
                        <s-fileicon
                            prefixCls="${prefixCls}"
                            file="{{file}}"
                            listType="{{listType}}"
                            locale="{{locale}}"
                            on-preview="handlePreview"
                        />
                        <a
                            s-if="file.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="${prefixCls}-list-item-name"
                            title="{{title.name}}"
                            href="{{file.url}}"
                            on-click="handlePreview({file, e: $event})"
                        >{{file.name}}</a>
                        <span
                            s-else
                            class="${prefixCls}-list-item-name"
                            title="{{file.name}}"
                            on-click="handlePreview({file, e: $event})"
                        >
                            {{locale.errorText || file.name}}
                        </span>
                    </s-tooltip>
                    <span s-else>
                        <s-fileicon
                            prefixCls="${prefixCls}"
                            file="{{file}}"
                            listType="{{listType}}"
                            locale="{{locale}}"
                            on-preview="handlePreview"
                        />
                        <a
                            s-if="file.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="${prefixCls}-list-item-name"
                            title="{{title.name}}"
                            href="{{file.url}}"
                            on-click="handlePreview({file, e: $event})"
                        >{{file.name}}</a>
                        <span
                            s-else
                            class="${prefixCls}-list-item-name"
                            title="{{file.name}}"
                            on-click="handlePreview({file, e: $event})"
                        >
                            {{file.name}}
                        </span>
                    </span>
                </div>
                <span
                    s-if="listType === 'picture-card' && file.status !== 'uploading'"
                    class="${prefixCls}-list-item-actions"
                >
                    <a
                        s-if="showPreviewIcon"
                        href="{{file.url || file.thumbUrl}}"
                        target="_blank"
                        rel="noopener noreferrer"
                        style="{{file.url || file.thumbUrl ? '' : style}}"
                        title="{{locale.previewFile}}"
                        on-click="handlePreview({file, e: $event})"
                    >
                        <s-icon type="eye-o" />
                    </a>
                    <s-icon s-if="showRemoveIcon" type="delete" title="{{locale.removeFile}}" on-click="handleClose(file)" />
                </span>
                <s-icon s-else-if="showRemoveIcon" type="close" title="{{locale.removeFile}}" on-click="handleClose(file)" />
                <div class="${prefixCls}-list-item-progress" s-if="file.status === 'uploading'">
                    <s-progress s-if="file.percent" type="line" s-bind="{{progressAttr}}" percent="{{file.percent}}" />
                </div>
            </div>
        </div>
    `
};
