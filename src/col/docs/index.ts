import Readme from '../README.md';
import Base from 'santd/base';

export default class extends Base {
    static components = {
        readme: Readme
    };
    static template: /* html */ `
        <div>
            <readme/>
        </div>
    `;
}