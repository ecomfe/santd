/**
 * @file 组件 Nav
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */
import '../style/index.less';
import san from 'san';

export default san.defineComponent({
    template: `
        <div class="public-DraftEditorPlaceholder-root">
            <div class="public-DraftEditorPlaceholder-inner"><slot /></div>
        </div>
    `
});
