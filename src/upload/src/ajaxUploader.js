/**
 * @file Santd upload ajax uploader file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import defaultRequest from './request';
import {getUid, attrAccept, traverseFileTree} from './util';

export default san.defineComponent({
    dataTypes: {
        id: DataTypes.string,
        component: DataTypes.string,
        prefixCls: DataTypes.string,
        multiple: DataTypes.bool,
        directory: DataTypes.bool,
        disabled: DataTypes.bool,
        accept: DataTypes.string,
        data: DataTypes.oneOfType([
            DataTypes.object,
            DataTypes.func
        ]),
        action: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.func
        ]),
        headers: DataTypes.object,
        beforeUpload: DataTypes.func,
        customRequest: DataTypes.func,
        withCredentials: DataTypes.bool,
        openFileDialogOnClick: DataTypes.bool
    },
    initData() {
        return {
            uid: getUid(),
            reqs: {}
        };
    },
    attached() {
        this._isMounted = true;
    },
    detached() {
        this._isMounted = false;
        this.abort();
    },
    handleClick(e) {
        const openFileDialogOnClick = this.data.get('openFileDialogOnClick');
        if (openFileDialogOnClick) {
            const el = this.ref('fileInput');
            el && el.click();
        }
    },
    handleKeyDown(e) {
        const openFileDialogOnClick = this.data.get('openFileDialogOnClick');
        if (openFileDialogOnClick) {
            if (e.key === 'Enter') {
                const el = this.ref('fileInput');
                el && el.click();
            }
        }
    },
    uploadFiles(files, e) {
        const postFiles = Array.prototype.slice.call(files);
        postFiles
            .map(file => {
                file.uid = getUid();
                return file;
            })
            .forEach(file => {
                this.upload(file, postFiles, e);
            });
    },
    upload(file, fileList, e) {
        if (!this.data.get('beforeUpload')) {
            // always async in case use react state to keep fileList
            return setTimeout(() => this.post(file, e), 0);
        }

        const before = this.data.get('beforeUpload')(file, fileList, e);
        if (before && before.then) {
            before.then(processedFile => {
                const processedFileType = Object.prototype.toString.call(processedFile);
                if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
                    return this.post(processedFile, e);
                }
                return this.post(file, e);
            }).catch(e => {
                console && console.log(e); // eslint-disable-line
            });
        }
        else if (before !== false) {
            setTimeout(() => this.post(file, e), 0);
        }
    },
    post(file, event) {
        if (!this._isMounted) {
            return;
        }
        let data = this.data.get('data');
        if (typeof data === 'function') {
            data = data(file);
        }
        new Promise(resolve => {
            const action = this.data.get('action');
            if (typeof action === 'function') {
                return resolve(action(file));
            }
            resolve(action);
        }).then(action => {
            const uid = file.uid;
            const request = this.data.get('customRequest') || defaultRequest;
            const req = request({
                action,
                filename: this.data.get('name'),
                file,
                data,
                headers: this.data.get('headers'),
                withCredentials: this.data.get('withCredentials'),
                onProgress: e => {
                    this.fire('progress', {e, file});
                },
                onSuccess: (ret, xhr) => {
                    const reqs = this.data.get('reqs');
                    delete reqs[uid];
                    this.data.set('reqs', reqs);
                    this.fire('success', {ret, file, xhr, e: event});
                },
                onError: (err, ret) => {
                    const reqs = this.data.get('reqs');
                    delete reqs[uid];
                    this.data.set('reqs', reqs);
                    this.fire('error', {err, ret, file, e: event});
                }
            });
            this.data.set('reqs[' + uid + ']', req);
            this.fire('start', file);
        });
    },
    handleFileDrop(e) {
        e.preventDefault();

        if (e.type === 'dragover') {
            return;
        }

        if (this.data.get('directory')) {
            traverseFileTree(
                e.dataTransfer.items,
                this.uploadFiles,
                innerFile => attrAccept(innerFile, this.data.get('accept')),
                e
            );
        }
        else {
            const files = Array.prototype.slice.call(e.dataTransfer.files).filter(
                file => attrAccept(file, this.data.get('accept'))
            );
            this.uploadFiles(files, e);
        }
    },
    handleChange(e) {
        const files = e.target.files;
        this.uploadFiles(files, e);
        this.reset();
    },
    abort(file) {
        const reqs = this.data.get('reqs');
        if (file) {
            let uid = file;
            if (file && file.uid) {
                uid = file.uid;
            }
            if (reqs[uid]) {
                reqs[uid].abort();
                delete reqs[uid];
            }
        }
        else {
            Object.keys(reqs).forEach(uid => {
                if (reqs[uid] && reqs[uid].abort) {
                    reqs[uid].abort();
                }

                delete reqs[uid];
            });
        }
        this.data.set('reqs', reqs);
    },
    reset() {
        this.data.set('uid', getUid());
        const fileInput = this.ref('fileInput');
        fileInput.value = null;
    },
    template: `
        <div
            class="{{prefixCls}} {{disabled ? prefixCls + '-disabled' : ''}}"
            role="button"
            tabIndex="0"
            on-click="handleClick"
            on-keydown="handleKeyDown"
            on-drop="handleFileDrop"
            on-dragover="handleFileDrop"
        >
            <input
                id="{{id}}"
                type="file"
                s-ref="fileInput"
                key="{{uid}}"
                style="display: none;"
                accept="{{accept}}"
                directory="{{directory ? 'directory' : null}}"
                webkitdirectory="{{directory ? 'webkitdirectory' : null}}"
                multiple="{{multiple}}"
                on-change="handleChange"
            />
            <slot />
        </div>
    `
});
