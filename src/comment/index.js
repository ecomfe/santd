/**
 * @file 组件 comment
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from '../core/util';

const prefixCls = classCreator('comment')();

const Action = san.defineComponent({
    template: `<li><slot /></li>`
});

const Comment = san.defineComponent({
    template: `
    	<div class="${prefixCls}">
            <div class="${prefixCls}-inner">
                <div class="${prefixCls}-avatar"><slot name="avatar" /></div>
                <div class="${prefixCls}-content">
                    <div class="${prefixCls}-content-author" s-if="{{hasAuthor}}">
                        <span class="${prefixCls}-content-author-name">
                            <slot name="author" />
                        </span>
                        <span class="${prefixCls}-content-author-time">
                            <slot name="datetime" />
                        </span>
                    </div>
                    <div class="${prefixCls}-content-detail">
                        <slot name="content" />
                    </div>
                    <ul class="${prefixCls}-actions" s-if="{{hasActions}}">
                        <slot name="actions"/>
                    </ul>
                </div>
            </div>
            <div class="${prefixCls}-nested" s-if="{{hasNested}}">
                <slot name="nested" />
            </div>
        </div>
    `,

    inited() {
        let {author, datetime, actions, nested} = this.sourceSlots.named;
        this.data.set('hasAuthor', author || datetime);
        this.data.set('hasActions', !!actions);
        this.data.set('hasNested', !!nested);
    }
});

Comment.Action = Action;

export default Comment;
