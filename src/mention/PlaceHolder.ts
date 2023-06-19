/**
 * @file 组件 Nav
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */
import './style/index.less';
import Base from 'santd/base';

export default class PlaceHolder extends Base {
    static template = `
        <div class="public-DraftEditorPlaceholder-root">
            <div class="public-DraftEditorPlaceholder-inner"><slot /></div>
        </div>
    `
};
