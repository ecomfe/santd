/**
 * @file Santd locale provider file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import defaultLocale from './default';
import moment from 'moment';

let locale = defaultLocale;

function setMomentLocale(locale) {
    if (locale && locale.locale) {
        moment.locale(locale.locale);
    }
    else {
        moment.locale('en');
    }
}

export default san.defineComponent({
    initData() {
        return {
            locale,
            children: [],
            localeProvider: true
        };
    },
    inited() {
        const locale = this.data.get('locale');
        setMomentLocale(locale);
    },
    updated() {
        const children = this.data.get('children');
        const locale = this.data.get('locale');

        children.forEach(child => {
            child.data.set('localeContext', locale);
        });
    },
    messages: {
        addLocaleReceiver(payload) {
            this.data.push('children', payload.value);
        }
    },
    template: '<div><slot /></div>'
});

