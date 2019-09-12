import san from 'san';
import Icon from '../index';

const sanInstance = (type = 'search', color = '#1890ff') => {
    const IconTest = san.defineComponent({
        components: {
            'san-icon': Icon
        },
        template: `<div><san-icon type="${type}" theme="twoTone" twoToneColor="${color}"></san-icon></div>`
    });
    new IconTest().attach(document.body);
};
sanInstance('search', '#eb2f96');
describe('Icon', () => {
    let aicon;
    beforeEach(() => {
        aicon = document.getElementsByTagName('i')[0];
    });
    // 创建icon
    it('create icon', () => {
        expect(aicon).toHaveClass('sanicon-search');
    });
    // check自定义双色icon
    it('check color change icon', () => {
        const iconColor = aicon.getElementsByTagName('path')[0].getAttribute('fill');
        expect(iconColor).toEqual('#eb2f96');
    });
});