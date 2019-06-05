/**
 * @file 组件 upload
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator, guid} from 'santd/core/util';
import classNames from 'classnames';
import progress from 'santd/progress';
import icon from 'santd/icon';
import tooltip from 'santd/tooltip';
import preview from './preview';
import uploadicon from './icon';

const cc = classCreator('upload');
const prefix = cc('');


export default san.defineComponent({
    template: `
        <div class="{{cls}}">
            <div
                s-for="file in items"
                class="${prefix}-list-item ${prefix}-list-item-{{file.status}}"
            >
                <div class="${prefix}-list-item-info">
                    <!--iconAndPreview-->
                    <s-tooltip
                        s-if="{{file.status === 'error'}}"
                        title="{{getErrMsg(file)}}">
                        <s-uploadicon file="{{file}}" listType="{{listType}}"/>
                        <s-preview file="{{file}}"/>
                    </s-tooltip>
                    <span s-else>
                        <s-uploadicon file="{{file}}" listType="{{listType}}"/>
                        <s-preview file="{{file}}"/>
                    </span>
                    <!--iconAndPreview-->
                </div>
                <span
                    s-if="{{listType === 'picture-card' && file.status !== 'uploading'}}"
                    class="${prefix}-list-item-actions"
                >
                    <a
                        s-if="showPreviewIcon"
                        href="{{file.url || file.thumbUrl}}" target="_blank" rel="noopener noreferrer"
                        style="{{(file.url || file.thumbUrl) ? '' : 'pointer-events:none;opacity:0.5'}}"
                        on-click="handlePreview({e:$event, file})"
                        title="预览文件"
                    >
                        <s-icon type="eye"  theme="twoTone" twoToneColor="#fff"/>
                        <!--<s-icon type="eye-o"/>-->
                    </a>
                    <s-icon s-if="showRemoveIcon" type="delete" on-click="handleClose($event, file)" title="删除文件"/>
                </span>
                <s-icon s-else="showRemoveIcon" type="close" on-click="handleClose($event, file)" title="删除文件"/>
                <div  s-if="{{file.status === 'uploading'}}" class="${prefix}-list-item-progress">
                    <s-progress s-if="{{'percent' in file}}" type="line" percent="{{file.percent}}"/>
                </div>
            </div>
        </div>
    `,
    components: {
        's-icon': icon,
        's-progress': progress,
        's-tooltip': tooltip,
        's-preview': preview,
        's-uploadicon': uploadicon
    },
    initData() {
        return {
            listType: 'text',
            progressAttr: {
                strokeWidth: 2,
                showInfo: false
            },
            showRemoveIcon: true,
            showPreviewIcon: true,
            items: []
        };
    },
    computed: {
        cls() {
            let listType = this.data.get('listType');
            return classNames(prefix, {
                [`${prefix}-list`]: true,
                [`${prefix}-list-${listType}`]: true
            });
        }
    },
    messages: {
        'iconPreview': function(param) {
            this.handlePreview(param);
        }
    },
    inited() {
    },
    getErrMsg(file) {
        let message = '上传错误';
        if (file.response && typeof file.response === 'string') {
            message = file.response;
        } else if (file.error && file.error.statusText){
            message = statusText;
        }
        return message;
    },
    handlePreview(param) {
        this.dispatch('preview', param);
    },
    handleClose(e, file) {
        this.dispatch('UI:upload-item-close', {
            e,
            file
        });
    }
});
