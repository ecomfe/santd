// Thanks to https://github.com/andreypopp/react-textarea-autosize/

/**
 * @file calculateNodeHeight(uiTextNode, useCache = false)
 * @author fuqiangqiang edited this file
 */
type NodeInfo = {
    sizingStyle: string;
    paddingSize: number;
    borderSize: number;
    boxSizing: string;
}

const HIDDEN_TEXTAREA_STYLE = `
min-height:0 !important;
max-height:none !important;
height:0 !important;
visibility:hidden !important;
overflow:hidden !important;
position:absolute !important;
z-index:-1000 !important;
top:0 !important;
right:0 !important
`;

const SIZING_STYLE = [
    'letter-spacing',
    'line-height',
    'padding-top',
    'padding-bottom',
    'font-family',
    'font-weight',
    'font-size',
    'text-rendering',
    'text-transform',
    'width',
    'text-indent',
    'padding-left',
    'padding-right',
    'border-width',
    'box-sizing'
] as const;

const computedStyleCache: {[key: string]: NodeInfo} = {};
let hiddenTextarea: HTMLTextAreaElement | undefined;

function calculateNodeStyling(node: HTMLTextAreaElement, useCache = false) {
    const nodeRef = (
        node.getAttribute('id')
        || node.getAttribute('data-reactid')
        || node.getAttribute('name')
    );

    if (useCache && nodeRef && computedStyleCache[nodeRef]) {
        return computedStyleCache[nodeRef];
    }

    const style = window.getComputedStyle(node);

    const boxSizing = (
        style.getPropertyValue('box-sizing')
        || style.getPropertyValue('-moz-box-sizing')
        || style.getPropertyValue('-webkit-box-sizing')
    );

    const paddingSize = (
        parseFloat(style.getPropertyValue('padding-bottom'))
        + parseFloat(style.getPropertyValue('padding-top'))
    );

    const borderSize = (
        parseFloat(style.getPropertyValue('border-bottom-width'))
        + parseFloat(style.getPropertyValue('border-top-width'))
    );

    const sizingStyle = SIZING_STYLE
        .map(name => `${name}:${style.getPropertyValue(name)}`)
        .join(';');

    const nodeInfo = {
        sizingStyle,
        paddingSize,
        borderSize,
        boxSizing
    };

    if (useCache && nodeRef) {
        computedStyleCache[nodeRef] = nodeInfo;
    }

    return nodeInfo;
}

export default function calculateNodeHeight(
    uiTextNode: HTMLTextAreaElement,
    useCache = false,
    minRows?: number,
    maxRows?: number) {
    if (!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea');
        document.body.appendChild(hiddenTextarea);
    }

    // Fix wrap="off" issue
    // https://github.com/ant-design/ant-design/issues/6577
    const attributeWrap = uiTextNode.getAttribute('wrap');
    if (attributeWrap) {
        hiddenTextarea.setAttribute('wrap', attributeWrap);
    }
    else {
        hiddenTextarea.removeAttribute('wrap');
    }

    // Copy all CSS properties that have an impact on the height of the content in
    // the textbox
    const {
        paddingSize,
        borderSize,
        boxSizing,
        sizingStyle
        } = calculateNodeStyling(uiTextNode, useCache);

    // Need to have the overflow attribute to hide the scrollbar otherwise
    // text-lines will not calculated properly as the shadow will technically be
    // narrower for content
    hiddenTextarea.setAttribute('style', `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`);
    hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || '';

    let minHeight = -Infinity;
    let maxHeight = Infinity;
    let height = hiddenTextarea.scrollHeight;
    let overflowY: string | undefined;

    if (boxSizing === 'border-box') {
        // border-box: add border, since height = content + padding + border
        height = height + borderSize;
    }
    else if (boxSizing === 'content-box') {
        // remove padding, since height = content
        height = height - paddingSize;
    }

    if (minRows !== undefined || maxRows !== undefined) {
        // measure height of a textarea with a single row
        hiddenTextarea.value = '';
        const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
        if (minRows !== undefined) {
            minHeight = singleRowHeight * minRows;
            if (boxSizing === 'border-box') {
                minHeight = minHeight + paddingSize + borderSize;
            }
            height = Math.max(minHeight, height);
        }
        if (maxRows !== undefined) {
            maxHeight = singleRowHeight * maxRows;
            if (boxSizing === 'border-box') {
                maxHeight = maxHeight + paddingSize + borderSize;
            }
            overflowY = height > maxHeight ? '' : 'hidden';
            height = Math.min(maxHeight, height);
        }
    }
    // Remove scroll bar flash when autosize without maxRows
    if (!maxRows) {
        overflowY = 'hidden';
    }
    return {
        height: `${height}px`,
        'min-height': `${minHeight}px`,
        'max-height': `${maxHeight}px`,
        overflowY
    };
}
