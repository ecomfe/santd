/**
 * @file 组件 upload
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator, guid} from 'santd/core/util';
import classNames from 'classnames';
import upload from './upload';
import uploadlist from './uploadlist';

const cc = classCreator('upload');
const prefix = cc('');
const ID_SYMBOL = Symbol();

export default san.defineComponent({
    template: `
        <template>
            <span s-if="{{type === 'drag'}}" class="{{class}}">
                <div
                    class="{{dragCls}}"
                    on-drop="onFileDrop($event)"
                    on-dragover="onFileDrop($event)"
                    on-dragleave="onFileDrop($event)"
                    on-click="onSelect"
                >
                    <span tabindex="0" class="${prefix} ${prefix}-btn" role="button">
                        <input
                            type="file"
                            style="display: none;"
                            s-ref="inputFile"
                            multiple="{{multiple ? 'multiple' : ''}}"
                            accept="{{accept}}"
                            on-change="onReceiveFiles($event)"
                            directory="{{directory}}"/>
                        <div class="${prefix}-drag-container">
                            <slot></slot>
                        </div>
                    </span>
                </div>
                <s-uploadlist
                    s-if="{{showUploadList}}"
                    items="{{fileList}}"
                    listType="{{listType}}"
                    showRemoveIcon="{{showRemoveIcon}}"
                    showPreviewIcon="{{showPreviewIcon}}"/>
            </span>
            <span s-else class="{{class}}">
                <s-uploadlist
                    s-if="{{listType === 'picture-card' && showUploadList}}"
                    items="{{fileList}}"
                    listType="{{listType}}"
                    showRemoveIcon="{{showRemoveIcon}}"
                    showPreviewIcon="{{showPreviewIcon}}"/>
                <div class="{{buttonCls}}" on-click="onSelect">
                    <span tabindex="0" class="${prefix} ${prefix}-btn" role="button">
                        <input
                            type="file"
                            style="display: none;"
                            s-ref="inputFile"
                            multiple="{{multiple ? 'multiple' : ''}}"
                            accept="{{accept}}"
                            on-change="onReceiveFiles($event)"
                            directory="{{directory}}"
                            disabled="{{disabled}}"/>
                        <slot></slot>
                    </span>
                </div>
                <s-uploadlist
                    s-if="{{listType !== 'picture-card' && showUploadList}}"
                    items="{{fileList}}"
                    listType="{{listType}}"
                    showRemoveIcon="{{showRemoveIcon}}"
                    showPreviewIcon="{{showPreviewIcon}}"/>
            </span>
        </template>
    `,
    components: {
        's-uploadlist': uploadlist
    },
    initData() {
        return {
            listType: 'text',
            multiple: false,
            accept: '*',
            disabled: false,
            directory: false,
            dragState: 'drop',
            showUploadList: true,
            openFileDialogOnClick: true
        };
    },
    computed: {
        showRemoveIcon() {
            let showUploadList = this.data.get('showUploadList');
            if (showUploadList && (typeof showUploadList === 'object')) {
                return showUploadList.showRemoveIcon;
            }
        },
        showPreviewIcon() {
            let showUploadList = this.data.get('showUploadList');
            if (showUploadList && (typeof showUploadList === 'object')) {
                return showUploadList.showPreviewIcon;
            }
        },
        buttonCls() {
            let listType = this.data.get('listType');
            return classNames(prefix, {
                [`${prefix}-select`]: true,
                [`${prefix}-select-${listType}`]: true,
                [`${prefix}-disabled`]: this.data.get('disabled')
            });
        },
        dragCls() {
            let fileList = this.data.get('fileList');
            let dragState = this.data.get('dragState');
            return classNames(prefix, {
                [`${prefix}-drag`]: true,
                [`${prefix}-drag-uploading`]: fileList.some(file => file.status === 'uploading'),
                [`${prefix}-drag-hover`]: dragState === 'dragover',
                [`${prefix}-disabled`]: this.data.get('disabled')
            });
        },
        fileList() {
            let fileList = this.data.get('fileList');
            let defaultFileList = this.data.get('defaultFileList');
            return fileList || defaultFileList || [];
        }
    },
    messages: {
        'UI:upload-item-close': function ({value}) {
            let {file} = value;
            this.abort(file.uid);
            file.status = 'removed';
            this.fire('remove', file);
            this.removeFileItem(file);
        },
        'preview': function(param) {
            this.fire('preview', param);
        }
    },
    removeFileItem(file) {
        const matchKey = file.uid !== undefined ? 'uid' : 'name';
        let fileList = this.data.get('fileList');
        fileList = fileList.filter(item => item[matchKey] !== file[matchKey]);
        this.data.set('fileList', fileList);
    },
    abort(uid) {
        this.uploadMap[uid] && this.uploadMap[uid].abort();
    },
    inited() {

        let {files = [], extentions} = this.data.get();

        this.data.set(
            'files',
            files.map(file => {
                return {
                    ...file,
                    status: 'uploaded',
                    uid: guid()
                };
            })
        );

        if (typeof extentions === 'string') {
            this.data.set('extentions', extentions.split(/\s*,\s*/));
        }

        this.uploadMap = {};
    },
    onReceiveFiles(e) {
        let files = e.target.files;
        this.uploadFiles(files);
    },
    uploadFiles(files) {
        this.fire('select', files);
        for (let file of files) {
            this.uploadFile(file);
        }
    },
    isSameFile(f1, f2) {
        return f1 === f2 || f1.uid === f2.uid;
    },
    getFileByUid(uid) {
        let fileList = this.data.get('fileList');
        return fileList.find(file => file.uid === uid);
    },
    updateFileList(file) {
        let fileList = this.data.get('fileList');
        fileList = fileList.map(item => {
            if (item.uid === file.uid) {
                return file;
            }
            return item;
        });
        this.data.set('fileList', fileList);
    },
    uploadFile(rawFile) {
        let plainFile = {
            name: rawFile.name,
            size: rawFile.size,
            status: 'uploading',
            uid: guid()
        };

        // let errorMessage = this.validateFile(plainFile);

        // if (errorMessage) {
        //     plainFile = {
        //         ...plainFile,
        //         status: 'error',
        //         errorMessage
        //     };
        //     this.data.push('files', plainFile);
        //     return;
        // }

        this.data.push('fileList', plainFile);

        let {
            name,
            action,
            headers,
            data,
            withCredentials
        } = this.data.get();

        /**
         * 创建一个保护起来的回调函数
         *
         * 由于在上传过程中，可能会有某个文件被删除或者取消或者整个组件都被干掉了
         * 因此每个回调处理函数都需要进行一次包裹：
         *
         * 如果事件触发时，文件描述对象还在 files 中，那么就执行原有回调处理函数，并添加当前最新的下标和最新的 file
         *
         * @param  {Function} handler 回调处理
         * @return {Function}
         */
        const createProtectedHandler = handler => (...args) => {

            if (!this.data) {
                return;
            }

            let files = this.data.get('fileList');
            for (let i = 0, len = files.length; i < len; i++) {
                let file = files[i];
                if (this.isSameFile(file, plainFile)) {
                    return handler(i, file, ...args);
                }
            }
        };

        const progressHandler = createProtectedHandler((index, file, e) => {
            let {loaded, total} = e;
            let progress = Math.round(loaded / total * 100);
            let nextFile = {...file, percent: progress};
            this.updateFileList(nextFile);
            this.onChange({
                file: nextFile,
                event: e
            });
        });

        const uploadSuccessHandler = createProtectedHandler((index, file, result) => {
            let upfile = result.data;
            if (upfile.files && upfile.files.length) {
                upfile = upfile.files[0];
            }
            if (typeof upfile === 'string') {
                upfile = {
                    url: upfile
                };
            }

            let nextFile = {
                ...plainFile,
                ...upfile,
                status: 'done'
            };
            this.updateFileList(nextFile);
            this.onChange({
                file: nextFile,
                event: result.e
            });
        });

        const uploadFailedHandler = createProtectedHandler((index, file, error) => {

            let nextFile = {
                ...file,
                status: 'error',
                error
            };
            this.updateFileList(nextFile);
            this.onChange({
                file: nextFile,
                event: error
            });
        });
        this.uploadMap[plainFile.uid] = upload(
            rawFile,
            {name, action, headers, withCredentials, data, json: true},
            {
                progress: progressHandler,
                done: uploadSuccessHandler,
                fail: uploadFailedHandler
            }
        );
    },
    onSelect() {
        if (this.data.get('openFileDialogOnClick')) {
            this.ref('inputFile').click();
        }
    },
    onChange({file, event}) {
        let fileList = this.data.get('fileList');
        this.fire('change', Object.assign({}, {
            fileList,
            file,
            event
        }));
    },
    onFileDrop(e) {
        console.log('onFileDrop', e.type);
        this.data.set('dragState', e.type);
        if (e.type === 'drop') {
            console.log(e.dataTransfer.files);
            this.uploadFiles(e.dataTransfer.files);
        }
        e.preventDefault();
    }
});
