/**
 * @file Santd icon iconfont file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import icon from './index';

const customCache = new Set();
export default function (options = {}) {
    const {
        scriptUrl,
        extraCommonProps = {}
    } = options;

    if (typeof document !== 'undefined'
        && typeof window !== 'undefined'
        && typeof document.createElement === 'function'
        && typeof scriptUrl === 'string'
        && scriptUrl.length
        && !customCache.has(scriptUrl)
    ) {
        let script = document.createElement('script');
        script.setAttribute('src', scriptUrl);
        script.setAttribute('data-namespace', scriptUrl);
        customCache.add(scriptUrl);
        document.body.appendChild(script);
    }

    return san.defineComponent({
        components: {
            's-icon': icon
        },
        initData() {
            return {
                extraCommonProps
            };
        },
        attached() {
            const type = this.data.get('type');
            let useNode = this.el.querySelector('use');
            useNode.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + type);
        },
        handleClick(e) {
            this.fire('click', e);
        },
        template: `
            <span on-click="handleClick">
                <s-icon
                    theme="{{theme}}"
                    spin="{{spin}}"
                    rotate="{{rotate}}"
                    bodyStyle="{{bodyStyle}}"
                    twoToneColor="{{twoToneColor}}"
                    viewBox="0 0 1024 1024"
                    s-bind="{{extraCommonProps}}"
                >
                    <use></use>
                </s-icon>
            </span>
        `
    });
}
