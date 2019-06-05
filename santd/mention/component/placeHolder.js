/**
 * @file 组件 Nav
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */
import '../style/index.less';
import san from 'san';
import classNames from 'classnames';

// 注意公共方法提取到 util，送人玫瑰手有余香~
// import {classCreator} from 'santd/core/util';

export default san.defineComponent({
    computed: {
        className() {
            return classNames({
                ['public-DraftEditorPlaceholder-root']: true,
                ['public-DraftEditorPlaceholder-hasFocus']: false
            });
        }
    },
    template: `
		<div className="{{className}}">
	        <div className="public-DraftEditorPlaceholder-inner"><slot></slot></div>
		</div>
	`
});
