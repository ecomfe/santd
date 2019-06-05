import san from 'san';
import Button from '../index';

const sanInstance = (type = 'default', enter = '', icon = '') => {
    const Btton = san.defineComponent({
        components: {
            'san-button': Button
        },
        template: `<div><san-button type="${type}" icon="{{icon}}">${enter}</san-button></div>`
    });
    new Btton().attach(document.body);
};
sanInstance('primary', '确定', 'search');
describe('Button', () => {
    let btn;
    beforeEach(() => {
        btn = document.getElementsByTagName('button')[0]
    });
    it('create primary button', () => {
        expect(btn).toHaveClass('san-btn-primary');
    });

    it('create slot button text', () => {
        expect(btn.getElementsByTagName('span')[0].innerHTML).toMatch(/确定/);
    });

    it('should call click function', () => {
        btn.click();
        expect(btn.getAttribute('ant-click-animating-without-extra-node')).toBe('true');
    });
});







