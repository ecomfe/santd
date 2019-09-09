/**
 * @file Santd transfer operation file
 * @author mayihui@baidu.com
 **/
import san from 'san';
import Button from '../button';

export default san.defineComponent({
    handleMoveToRight() {
        this.fire('moveToRight');
    },
    handleMoveToLeft() {
        this.fire('moveToLeft');
    },
    components: {
        's-button': Button
    },
    template: `
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
});
