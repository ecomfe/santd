/**
 * @file 组件 upload
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator, guid} from 'santd/core/util';
import classNames from 'classnames';
import icon from 'santd/icon';

const cc = classCreator('upload');
const prefix = cc('');

const imageTypes = ['image', 'webp', 'png', 'svg', 'gif', 'jpg', 'jpeg', 'bmp'];

const extname = url => {
    if (!url) {
        return '';
    }
    const temp = url.split('/');
    const filename = temp[temp.length - 1];
    const filenameWithoutSuffix = filename.split(/#|\?/)[0];
    return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};

const checkImageUrl = file=> {
    if (imageTypes.includes(file.type)) {
        return true;
    }
    const url = (file.thumbUrl || file.url);
    const extension = extname(url);
    if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|bmp)$/i.test(extension)) {
        return true;
    } else if (/^data:/.test(url)) { // other file types of base64
        return false;
    } else if (extension) { // other file types which have extension
        return false;
    }
    return true;
};

export default san.defineComponent({
    template: `
        <template>
            <template s-if="{{listType === 'picture' || listType === 'picture-card'}}">
                <div
                    s-if="listType === 'picture-card' && fileStatus === 'uploading'"
                    class="${prefix}-list-item-uploading-text"
                >
                    文件上传中
                </div>
                <s-icon
                    s-elif="{{!file.thumbUrl && !file.url}}"
                    class="${prefix}-list-item-thumbnail"
                    type="picture"
                />
                <a
                    s-else
                    class="${prefix}-list-item-thumbnail"
                    on-click="iconPreview($event)"
                    href="{{file.url || file.thumbUrl}}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img s-if="isImageUrl" src="{{file.thumbUrl || file.url}}" alt="{{file.name}}"/>
                    <s-icon s-else type="file" class="${prefix}-list-item-icon"/>
                </a>
            </template>
            <s-icon s-else type="{{fileStatus === 'uploading' ? 'loading' : 'paper-clip'}}" />
        </template>
    `,
    components: {
        's-icon': icon
    },
    initData() {
        return {
            file: {},
            listType: 'text'
        };
    },
    computed: {
        isImageUrl() {
            let file = this.data.get('file');
            return checkImageUrl(file);
        }
    },
    inited() {
    },
    iconPreview(e) {
        this.dispatch('iconPreview', {
            e,
            file: this.data.get('file')
        });
    }
});
