/**
 * @file Santd upload ajax uploader file
 * @author mayihui@baidu.com
 **/

import defaultRequest from './request';
import {getUid, attrAccept, traverseFileTree} from './util';
import Base from 'santd/base';
import type {State, Props, Computed} from './interface';

export default class extends Base <State, Props, Computed>{
    initData() {
        return {
            uid: getUid(),
            reqs: {}
        };
    }
    _isMounted: boolean = false;
    attached() {
        this._isMounted = true;
    }
    detached() {
        this._isMounted = false;
        this.abort(undefined);
    }
    handleClick() {
        const openFileDialogOnClick = this.data.get('openFileDialogOnClick');
        if (openFileDialogOnClick) {
            const el: any = this.ref('fileInput');
            el && el.click();
        }
    }
    handleKeyDown(e: {key: string}) {
        const openFileDialogOnClick = this.data.get('openFileDialogOnClick');
        if (openFileDialogOnClick) {
            if (e.key === 'Enter') {
                const el: any = this.ref('fileInput');
                el && el.click();
            }
        }
    }
    uploadFiles(files: any, e: any) {
        const postFiles = Array.prototype.slice.call(files);
        postFiles
            .map(file => {
                file.uid = getUid();
                return file;
            })
            .forEach(file => {
                this.upload(file, postFiles, e);
            });
    }
    upload(file: any, fileList: any[], e: any) {
        if (!this.data.get('beforeUpload')) {
            // always async in case use react state to keep fileList
            return setTimeout(() => this.post(file, e), 0);
        }

        const before = this.data.get('beforeUpload')(file, fileList);
        if (before && typeof before !== 'boolean') {
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
    }
    post(file: any, event: any) {
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
                method: this.data.get('method'),
                headers: this.data.get('headers'),
                withCredentials: this.data.get('withCredentials'),
                onProgress: (e: any) => {
                    this.fire('progress', {e, file});
                },
                onSuccess: (ret: any, xhr: any) => {
                    const reqs = this.data.get('reqs');
                    delete reqs[uid];
                    this.data.set('reqs', reqs);
                    this.fire('success', {ret, file, xhr, e: event});
                },
                onError: (err: any, ret: any) => {
                    const reqs = this.data.get('reqs');
                    delete reqs[uid];
                    this.data.set('reqs', reqs);
                    this.fire('error', {err, ret, file, e: event});
                }
            });
            this.data.set('reqs[' + uid + ']', req);
            this.fire('start', file);
        });
    }
    handleFileDrop(e: any) {
        e.preventDefault();

        if (e.type === 'dragover') {
            return;
        }

        if (this.data.get('directory')) {
            traverseFileTree(
                e.dataTransfer.items,
                this.uploadFiles,
                (innerFile: any) => attrAccept(innerFile, this.data.get('accept')),
            );
        }
        else {
            const files = Array.prototype.slice.call(e.dataTransfer.files).filter(
                file => attrAccept(file, this.data.get('accept'))
            );
            this.uploadFiles(files, e);
        }
    }
    handleChange(e: any) {
        const files = Array.prototype.slice.call(e.target.files).filter(
            file => attrAccept(file, this.data.get('accept'))
        );
        this.uploadFiles(files, e);
        this.reset();
    }
    abort(file: any) {
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
    }
    reset() {
        this.data.set('uid', getUid());
        const fileInput: any = this.ref('fileInput');
        fileInput.value = null;
    }
    static template = `
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
};
