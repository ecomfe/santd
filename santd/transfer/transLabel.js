/**
 * @file 组件 transLabel
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {NodeType} from 'san';

export default san.defineComponent({
    template: `
        <template>
            {{text}}
        </template>
    `,
    baseRender() {
        const {render, data} = this.data.get();
        this.data.set('text', render(data));
    },
    attached() {
        const Component = this.data.get('render');
        if (Component && typeof Component === 'function') {
            const notArrow = (Component.hasOwnProperty('prototype'));
            if (notArrow) {
                let instance = new Component({
                    data: this.data.get('data'),
                    owner: this
                });
                if (instance.nodeType === NodeType.CMPT) {
                    this.el.innerHTML = '';
                    instance.parentComponent = this;
                    this.childComponent = instance;
                    instance.attach(this.el);
                } else {
                    this.baseRender();
                }
            } else {
                this.baseRender();
            }
        }
    }
});