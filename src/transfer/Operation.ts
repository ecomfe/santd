/**
 * @file Santd transfer operation file
 * @author mayihui@baidu.com
 **/
import Button from '../button';
import Base from 'santd/base';

export default class Operation extends Base {
    handleMoveToRight() {
        this.fire('moveToRight');
    }
    handleMoveToLeft() {
        this.fire('moveToLeft');
    }
    static components = {
        's-button': Button
    }
    static template = `
        <div>
            <s-button
                type="primary"
                size="small"
                disabled="{{disabled || !rightActive}}"
                icon="right"
                on-click="handleMoveToRight"
            >
                {{rightArrowText || ''}}
            </s-button>
            <s-button
                type="primary"
                size="small"
                disabled="{{disabled || !leftActive}}"
                icon="left"
                on-click="handleMoveToLeft"
            >
                {{leftArrowText || ''}}
            </s-button>
        </div>
    `
};
