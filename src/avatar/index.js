/**
 * @file 组件 avatar
 * @author wangyongqing01 <wangyongqing01@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import Icon from '../icon';
import {classCreator, guid} from '../core/util';

const prefixCls = classCreator('avatar')();

export default san.defineComponent({
    dataTypes: {
        shape: DataTypes.oneOf(['circle', 'square']),
        size: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        gap: DataTypes.number
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
            scaleId: guid(prefixCls),
            gap: 4
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
            const size = +this.data.get('size');
            const icon = this.data.get('icon');

            if (isNaN(size)) {
                return '';
            }

            return `width: ${size}px;height:${size}px; line-height:${size}px; font-size: ${icon ? `${size / 2}px` : '18px'}`;
        }
    },

    handleImgLoadError() {
        this.fire('error');
    },

    updated() {
        let gap = this.data.get('gap');
        const childrenNode = document.getElementById(this.data.get('scaleId'));

        // update scaleStyle
        if (childrenNode) {
            const childrenWidth = childrenNode.offsetWidth;
            const avatarWidth = this.el.getBoundingClientRect().width;
            gap = gap * 2 < avatarWidth ? gap : 4;
            const scale = (avatarWidth - gap * 2 < childrenWidth) ? (avatarWidth - gap * 2) / childrenWidth : 1;

            const transformString = `scale(${scale}) translateX(-50%)`;
            let scaleStyle = [
                `-ms-transform:${transformString}`,
                `-webkit-transform:${transformString}`,
                `transform:${transformString}`
            ];

            const size = +this.data.get('size');
            if (!isNaN(size)) {
                scaleStyle.push(`line-height: ${size}px`);
            }
            this.data.set('scaleStyle', scaleStyle.join(';'));
        }
    },

    inited() {
        if (this.sourceSlots.noname && this.sourceSlots.noname.length) {
            this.data.set('hasSlot', true);
        }
    },

    attached() {
        this.updated();
    },

    template: `
        <span class="{{classes}}" style="{{styles}}">
            <img s-if="src && isImgExist"
                src="{{src}}"
                srcset="{{srcSet}}"
                on-error="handleImgLoadError"
                alt="{{alt}}"
            />
            <s-icon s-if="icon" type="{{icon}}"/>
            <span
                s-if="hasSlot"
                class="{{scaleStyle && hasSlot ? prefixCls + '-string' : ''}}"
                id="{{scaleId}}"
                style="{{scaleStyle}}"
            ><slot/></span>
        </span>
    `
});
