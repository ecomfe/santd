/**
 * @file Santd locale provider file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import defaultLocale from './zh_CN';
import * as moment from 'moment';


export default san.defineComponent({
    initData() {
        return {
            locale: defaultLocale,
            localeProvider: true
        };
    },

    inited() {
        this.receivers = [];

        const locale = this.data.get('locale');
        if (locale && locale.locale) {
            moment.locale(locale.locale);
        }
        else {
            moment.locale('en');
        }
    },

    disposed() {
        this.receivers = null;
    },

    updated() {
        const locale = this.data.get('locale');

        this.receivers.forEach(child => {
            child.data.set('localeContext', locale);
        });
    },

    messages: {
        santd_add_locale_receiver(payload) {
            this.receivers.push(payload.value);
            this.updated();
        }
    },

    template: '<div><slot /></div>'
});
