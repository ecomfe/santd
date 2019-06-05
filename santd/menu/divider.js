/**
* @file divider 分割线
* @author fuqiangqiang@baidu.com
*/

import san from 'san';
import Divider from 'santd/divider';

export default san.defineComponent({
    components: {
        's-divider': Divider
    },
    template: `
        <span>
            <s-divider style="margin: 0"></s-divider>
        </span>
    `
});
