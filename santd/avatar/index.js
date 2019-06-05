/**
 * @file 组件 avatar
 * @author wangyongqing01 <wangyongqing01@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import Icon from 'santd/icon';

// 注意公共方法提取到 util，送人玫瑰手有余香~
import {
    classCreator,
    guid,
    type
} from 'santd/core/util';
import classnames from 'classnames';

// cc()就是 prefix class，cc('xxx')返回 prefixClass-xxx
const cc = classCreator('avatar');

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
            shape: 'circle',
            size: 'default',
            isImgExist: true
        };
    },
    computed: {
        id() {
            return cc() + guid(cc());
        },
        classes() {
            const data = this.data;
            // 处理class
            const prefixCls = cc();

            const isImgExist = data.get('isImgExist');
            const src = data.get('src');
            const size = data.get('size');
            const shape = data.get('shape');
            const icon = data.get('icon');

            const classString = {
                [prefixCls]: true,
                [`${prefixCls}-lg`]: size === 'large',
                [`${prefixCls}-sm`]: size === 'small',
                [`${prefixCls}-${shape}`]: shape,
                [`${prefixCls}-image`]: src && isImgExist,
                [`${prefixCls}-icon`]: icon
            };
            return classnames(classString);
        },
        styles() {
            const data = this.data;
            const size = data.get('size');
            const icon = data.get('icon');

            return type(size, 'number') || /\d+/.test(size)
                ? `width: ${size}px;height:${size}px; line-height:${size}px; font-size: ${
                icon ? `${size / 2}px` : '18px'
                } `
                : '';
        }
    },
    setScale() {
        const childrenNode = document.getElementById(this.data.get('id'));
        if (childrenNode) {
            const childrenWidth = childrenNode.offsetWidth;
            const avatarWidth = this.el.getBoundingClientRect().width;
            let scale = 1;
            if (avatarWidth - 8 < childrenWidth) {
                scale = (avatarWidth - 8) / childrenWidth;
            }
            else {
                scale = 1;
            }

            if (scale !== 1) {
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
        }

    },
    handleImgLoadError() {
        this.fire('error');
    },
    attached() {
        this.nextTick(() => {
            this.setScale();
        });
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
            <span s-if="hasSlot"
                class="${cc('string')}"
                id="{{id}}"
                style="{{scaleStyle}}"
            >
            <slot></slot>
          </span>
        </span>
    `
});
