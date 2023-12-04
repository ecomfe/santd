/**
 * @file image 组件
 * @author liulu36
 */

import './style/index.less';

import Base from 'santd/base';

import Icon from '../icon';
import Preview from './Preview';
import PreviewGroup from './PreviewGroup';
import {classCreator} from '../core/util';

const prefixCls = classCreator('image')();

let uuid = 0;

const locale = {
    preview: '预览'
};
import {IImageProps} from './interface';

export default class Image extends Base<IImageProps> {
    static PreviewGroup = PreviewGroup;
    static template = `
        <div
            class="${prefixCls}"
            style="width: {{width}}px; height: {{height}}px;"
            on-click="clickWrap">
            <img
                s-ref="imgRef"
                src="{{mergedSrc}}"
                on-load="imgLoad"
                on-error="imgError"
                width={{width}}
                height={{height}}
                s-bind="{{imgCommonProps}}"
            />
            <div s-if="{{canPreview}}" class="${prefixCls}-mask">
                <div class="${prefixCls}-mask-info">
                    <s-icon type="eye" />
                    ${locale.preview}
                </div>
            </div>
            <s-preview
                s-if="{{!isPreviewGroup && canPreview}}"
                visible="{{isShowPreview}}"
                on-close="onPreviewClose"
                src="{{mergedSrc}}"
            />
        </div>
    `;

    static components = {
        's-icon': Icon,
        's-preview': Preview
    };

    initData(): IImageProps {
        return {
            status: 'normal',
            currentId: uuid++,
            isShowPreview: false,
            imgCommonProps: {},
            preview: true
        };
    }
    static computed = {
        isError(this: Image) {
            return this.data.get('status') === 'error';
        },
        canPreview(this: Image) {
            const preview = this.data.get('preview');
            const isError = this.data.get('isError');

            return preview && !isError;
        },
        mergedSrc(this: Image) {
            const isError = this.data.get('isError');
            const fallback = this.data.get('fallback');
            const imgSrc = this.data.get('src');
            return isError && fallback ? fallback : imgSrc;
        }
    }
    inited() {
    }
    attached() {
        const {
            crossorigin = null,
            decoding = null,
            alt = null,
            sizes = null,
            srcset = null,
            usemap = null,
            style = null
        } = this.data.get();
        const imgCommonProps = {
            crossorigin,
            decoding,
            alt,
            sizes,
            srcset,
            usemap,
            style
        };
        this.data.set('imgCommonProps', imgCommonProps);

        const currentId = this.data.get('currentId');
        const src = this.data.get('src');
        this.dispatch('santd_image_add', {
            currentId,
            src
        });
    }
    detached() {
        this.dispatch('santd_image_remove', this.data.get('src'));
    }
    imgLoad() {
        if (this.data.get('isError')) {
            return;
        }
        this.data.set('status', 'loading');
        this.fire('load');
    }
    imgError() {
        this.data.set('status', 'error');
        this.fire('error');
    }
    clickWrap(e: Event) {
        const canPreview = this.data.get('canPreview');
        const isPreviewGroup = this.data.get('isPreviewGroup');
        if (canPreview) {
            if (isPreviewGroup) {
                this.dispatch('santd_image_click', {
                    currentId: this.data.get('currentId')
                });
            } else {
                this.data.set('isShowPreview', true);
            }
        }
        this.fire('click', e);
    }
    onPreviewClose() {
        this.data.set('isShowPreview', false);
    }
};
