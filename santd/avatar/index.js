/**
 * @file 组件 avatar
 * @author wangyongqing01 <wangyongqing01@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import Icon from '../icon';
import {classCreator, guid, type} from '../core/util';

const prefixCls = classCreator('avatar')();

export default san.defineComponent({
    dataTypes: {
        shape: DataTypes.oneOf(['circle', 'square']),
        size: DataTypes.oneOfType([DataTypes.string, DataTypes.number])
    },

    components: {
        's-icon': Icon
    },

    initData() {
        return {
            prefixCls,
            shape: 'circle',
            size: 'default',
            isImgExist: true,
            guid: guid(prefixCls)
        };
    },

    computed: {
        classes() {
            const isImgExist = this.data.get('isImgExist');
            const src = this.data.get('src');
            const size = this.data.get('size');
            const shape = this.data.get('shape');
            const icon = this.data.get('icon');

            let classArr = [prefixCls];
            size === 'large' && classArr.push(`${prefixCls}-lg`);
            size === 'small' && classArr.push(`${prefixCls}-sm`);
            shape && classArr.push(`${prefixCls}-${shape}`);
            src && isImgExist && classArr.push(`${prefixCls}-image`);
            icon && classArr.push(`${prefixCls}-icon`);

            return classArr;
        },
        styles() {
            const size = this.data.get('size');
            const icon = this.data.get('icon');

            return type(size, 'number') || /\d+/.test(size)
                ? `width: ${size}px;height:${size}px; line-height:${size}px; font-size: ${icon ? `${size / 2}px` : '18px'} `
                : '';
        }
    },

    setScale() {
        const childrenNode = document.getElementById(this.data.get('guid'));
        if (childrenNode) {
            const childrenWidth = childrenNode.offsetWidth;
            const avatarWidth = this.el.getBoundingClientRect().width;
            const scale = (avatarWidth - 8 < childrenWidth)
                ? (avatarWidth - 8) / childrenWidth
                : 1;

            const transformString = `scale(${scale}) translateX(-50%)`;
            let scaleStyle = [
                `-ms-transform:${transformString}`,
                `-webkit-transform:${transformString}`,
                `transform:${transformString}`
            ].join(';');

            const size = this.data.get('size');
            if (type(size, 'number') || /\d+/.test(size)) {
                scaleStyle += `line-height: ${size}px`;
            }
            this.data.set('scaleStyle', scaleStyle);
        }
    },

    handleImgLoadError() {
        this.fire('error');
    },

    updated() {
        this.setScale();
    },

    inited() {
        if (this.sourceSlots.noname && this.sourceSlots.noname.length) {
            this.data.set('hasSlot', true);
        }
    },

    template: `
        <span class="{{classes}}" style="{{styles}}">
            <img s-if="{{src && isImgExist}}"
                src="{{src}}"
                srcset="{{srcSet}}"
                on-error="handleImgLoadError"
                alt="{{alt}}"
            />
            <s-icon s-if="{{icon}}" type="{{icon}}"></s-icon>
            <span
                s-if="{{hasSlot}}"
                class="{{scaleStyle && hasSlot ? prefixCls + '-string' : ''}}"
                id="{{guid}}"
                style="{{scaleStyle}}"
            >
            <slot></slot>
          </span>
        </span>
    `
});