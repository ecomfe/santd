/**
 * @file 组件 comment
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from '../core/util';

const prefix = classCreator('comment')();

export default san.defineComponent({
    template: `
    	<div class="${prefix}">
            <div class="${prefix}-inner">
                <div class="${prefix}-avatar">
                    <slot name="avatar"/>
                </div>
                <div class="${prefix}-content">
                    <div class="${prefix}-content-author" s-if="{{showAuthor}}">
                        <span class="${prefix}-content-author-name">
                            <slot name="author"/>
                        </span>
                        <span class="${prefix}-content-author-time">
                            <slot name="datetime"/>
                        </span>
                    </div>
                    <div class="${prefix}-content-detail">
                        <slot name="content"/>
                    </div>
                    <ul class="${prefix}-actions" s-if="{{showActions}}">
                        <slot name="actions"/>
                    </ul>
                </div>
            </div>
            <div class="${prefix}-nested" s-if="{{showChildren}}">
                <slot name="children"/>
            </div>
        </div>
    `,
    inited() {
        let {author, datetime, actions, children} = this.sourceSlots.named;
        this.data.set('showAuthor', author || datetime);
        this.data.set('showActions', !!actions);
        this.data.set('showChildren', !!children);
    }
});
