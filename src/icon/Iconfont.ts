/**
 * @file Santd icon iconfont file
 * @author mayihui@baidu.com
 **/
import san from 'san';
import icon from './index';
import {CustomIconOption} from './interface';

const customCache = new Set();


export default function (options: CustomIconOption = {}) {
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

    class CumstomIcon extends san.Component {
        static components = {
            's-icon': icon
        }
        static template = `
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
        initData() {
            return {
                extraCommonProps
            };
        }
        attached() {
            const type = this.data.get('type');
            let useNode = this.el?.querySelector('use');
            useNode?.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + type);
        }

        handleClick(e: MouseEvent) {
            this.fire('click', e);
        }


    }
    return CumstomIcon;

}
