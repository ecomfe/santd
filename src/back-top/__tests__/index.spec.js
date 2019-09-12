/**
 * @file 单元测试代码
 * @author raowenjuan(raowenjuan@baidu.com)
 */
import san from 'san';
import BackTop from '../index';

const sanInstance = () => {
    const BTop = san.defineComponent({
        components: {
            'san-backtop': BackTop
        },
        template: `
            <div>
                <san-backtop></san-backtop>
            </div>
        `
    });
    new BTop().attach(document.body);
};
sanInstance();
describe('BackTop', () => {
});