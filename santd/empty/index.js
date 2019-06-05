/**
 * @file 组件 empty
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import emptyImg from './empty.svg';

const cc = classCreator('empty');
const prefix = cc();

export default san.defineComponent({
    template: `
        <div class="${prefix}">
            <div class="${prefix}-image">
                <img alt="暂无数据" src="{{imageSrc}}">
            </div>
            <p class="${prefix}-description">
                <slot name="description" s-if="isCustomDes"/>
                <template s-else>暂无数据</template>
            </p>
            <div class="${prefix}-footer" s-if="isCustomFooter">
                <slot name="footer"/>  
            </div>
        </div>
    `,
    computed: {
        imageSrc() {
            let image = this.data.get('image');
            return image ? image : emptyImg;
        }
    },
    inited() {
        let {description, footer} = this.sourceSlots.named;
        description && this.data.set('isCustomDes', true);
        footer && this.data.set('isCustomFooter', true);
    }
});