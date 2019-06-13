/**
 * @file 工具函数
 * @author author
 */
/**
 * 获取匹配prefix的正则表达式
 *
 * @param  {Array} prefix 匹配符
 * @return {[RegExp]}  以匹配符开头的正则表达式
 */
export const getRegExp = prefix => {
    const prefixArray = Array.isArray(prefix) ? prefix : [prefix];
    let prefixToken = prefixArray.join('').replace(/(\$|\^)/g, '\\$1');

    if (prefixArray.length > 1) {
        prefixToken = `[${prefixToken}]`;
    }

    return new RegExp(`(\\s|^)(${prefixToken})([^\\s]*)$`, 'g');
};

/**
 * 在字符串指定位置插入要替换的字符，并在替换字符后加上空格
 * todo 如果被替换字符后有空格 则插入字符后没有新增空格，这个需要优化下
 *
 * @param  {string} str    原先的字符串
 * @param  {number} start  要插入的起始位置
 * @param  {number} end    要插入的终点位置
 * @param  {string} newStr 要插入的字符
 * @return {[type]}        返回结果
 */
export const insertString = (str, start, end, newStr) => (
    str.slice(0, start) + newStr + ' ' + str.slice(end)
);

/**
 * setCursorPosition 移动光标到最后的位置
 *
 * @param {string} selector dom元素
 * @param  {number} pos 要移动位置
 */
export const setCursorPosition = (selector, pos) => {
    let range;
    if (document.createRange) { // Firefox, Chrome, Opera, Safari, IE 9+
        range = document.createRange(); // 创建一个选中区域
        range.selectNodeContents(selector); // 选中节点的内容
        if (selector.innerText.length > 0) {
            range.setStart(selector.childNodes[0], pos); // 设置光标起始为指定位置
        }
        range.collapse(true); // 设置选中区域为一个点
        let selection = window.getSelection();// 获取当前选中区域
        selection.removeAllRanges(); // 移出所有的选中范围
        selection.addRange(range); // 添加新建的范围
    }
    else if (document.selection) { // IE 8 and lower
        range = document.body.createTextRange();
        range.moveToElementText(selector);
        range.collapse(false);
        range.select();
    }
};

/**
 * getSearchWordPos 移动光标到最后的位置
 *
 * @param {string} el dom元素
 * @return  {Object} 位置
 */
export const getSearchWordPos = el => {
    let range = window.getSelection().getRangeAt(0).cloneRange();
    let rects = range.getClientRects();
    if (!rects[0]) {
        return {};
    }
    let {left, top} = rects[0];
    let clientRect = el.getBoundingClientRect();
    let computedStyle = getComputedStyle(el);
    return {
        left: left - clientRect.left,
        top: top - clientRect.top,
        height: parseInt(computedStyle.lineHeight, 10)
    };
};
