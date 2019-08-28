/**
 * @file 组件 Nav
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */
import '../style/index.less';
import san from 'san';

export default san.defineComponent({
    template: `
        <div className="public-DraftEditorPlaceholder-root">
            <div className="public-DraftEditorPlaceholder-inner"><slot></slot></div>
        </div>
    `
});
