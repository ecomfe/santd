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
            isImgExist: true
        };
    },
    computed: {
        // 这里修改成guid，因为id会被加到root元素上，导致取到的元素不正确
        guid() {
            return guid(prefixCls);
        },
        classes() {
            const data = this.data;
            // 处理class
            const isImgExist = data.get('isImgExist');
            const src = data.get('src');
            const size = data.get('size');
            const shape = data.get('shape');
            const icon = data.get('icon');

            let classArr = [prefixCls];
            size === 'large' && classArr.push(`${prefixCls}-lg`);
            size === 'small' && classArr.push(`${prefixCls}-sm`);
            shape && classArr.push(`${prefixCls}-${shape}`);
            src && isImgExist && classArr.push(`${prefixCls}-image`);
            icon && classArr.push(`${prefixCls}-icon`);

            return classArr;
        },
        styles() {
            const data = this.data;
            const size = data.get('size');
            const icon = data.get('icon');

            return type(size, 'number') || /\d+/.test(size)
                ? `width: ${size}px;height:${size}px; line-height:${size}px; font-size: ${icon ? `${size / 2}px` : '18px'} `
                : '';
        },
        scaleClass() {
            const scaleStyle = this.data.get('scaleStyle');
            const hasSlot = this.data.get('hasSlot');
            if (scaleStyle && hasSlot) {
                return prefixCls + '-string';
            }
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
    attached() {
        if (this.sourceSlots.noname && this.sourceSlots.noname.length) {
            const data = this.data;
            data.set('hasSlot', true);
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
                class="{{scaleClass}}"
                id="{{guid}}"
                style="{{scaleStyle}}"
            >
            <slot></slot>
          </span>
        </span>
    `
});
