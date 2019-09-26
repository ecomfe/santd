/**
 * @file Santd locale provider file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import defaultLocale from './zh_CN';
import * as moment from 'moment';


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
            locale: defaultLocale,
            localeProvider: true
        };
    },

    inited() {
        this.reveviers = [];
        const locale = this.data.get('locale');
        setMomentLocale(locale);
    },

    disposed() {
        this.reveviers = null;
    },

    updated() {
        const locale = this.data.get('locale');

        this.reveviers.forEach(child => {
            child.data.set('localeContext', locale);
        });
    },

    messages: {
        santd_add_locale_receiver(payload) {
            this.reveviers.push(payload.value);
        }
    },

    template: '<div><slot /></div>'
});