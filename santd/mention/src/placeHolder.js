/**
 * @file 组件 Nav
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */
import '../style/index.less';
import san from 'san';

export default san.defineComponent({
    computed: {
        className() {
            return ['public-DraftEditorPlaceholder-root'];
        }
    },
    template: `
		<div className="{{className}}">
	        <div className="public-DraftEditorPlaceholder-inner"><slot></slot></div>
		</div>
	`
});
