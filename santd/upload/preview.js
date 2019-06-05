/**
 * @file 组件 upload
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator, guid} from 'santd/core/util';
import classNames from 'classnames';

const cc = classCreator('upload');
const prefix = cc('');


export default san.defineComponent({
    template: `
        <template>
            <a
                s-if="file.url"
                target="_blank"
                rel="noopener noreferrer"
                class="${prefix}-list-item-name"
                title="{{file.name}}"
                href="{{file.url}}"
                on-click="handlePreview($event)"
            >
                {{file.name}}
            </a>
            <span
                s-else
                class="${prefix}-list-item-name"
                on-click="handlePreview($event)"
                title="{{file.name}}"
            >
                {{file.name}}
            </span>
        </template>
    `,
    initData() {
        return {
            file: {}
        };
    },
    computed: {
    },
    inited() {
    },
    handlePreview(e) {
        let file = this.data.get('file');
        this.dispatch('iconPreview', {
            e,
            file
        });
    }
});