/**
 * @file Santd locale provider file
 * @author mayihui@baidu.com
 **/

import * as dayjs from 'dayjs';
import Base from 'santd/base';
import defaultLocale from './zh_CN';
import {Component} from 'san/types';
import {Messages, State} from './interface';

export default class extends Base {
    receivers!: never[];

    initData(): State {
        return {
            locale: defaultLocale,
            localeProvider: true
        };
    };

    inited(): void {
        this.receivers = [];

        const locale = this.data.get('locale');
        if (locale && locale.locale) {
            require(`dayjs/locale/${locale.locale}.js`);
            dayjs.locale(locale.locale);
        }
        else {
            dayjs.locale('en');
        }
    };

    updated(): void {
        const locale = this.data.get('locale');

        this.receivers.forEach((child: Component) => {
            child.data.set('localeContext', locale);
        });
    };

    static messages: Messages = {
        santd_add_locale_receiver(payload) {
            this.receivers.push(payload.value);
            this.updated();
        }
    };

    static template = '<div><slot /></div>';
};
