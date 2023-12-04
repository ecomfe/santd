/**
 * @file Santd locale receiver
 **/

import defaultLocaleData from './zh_CN';
import Base from 'santd/base';

export default {
    computed: {
        locale<TBase extends Base>(this: TBase) {
            const componentName = this.data.get('componentName') || 'global';
            const defaultLocale = this.data.get('defaultLocale');
            const locale = defaultLocale || defaultLocaleData[componentName];

            const sanLocale = this.data.get('localeContext') || defaultLocaleData;
            const localeFromContext = componentName && sanLocale ? sanLocale[componentName] : {};

            const result = {
                ...locale,
                ...localeFromContext
            };
            return result;
        },
        localeCode<TBase extends Base>(this: TBase) {
            const sanLocale = this.data.get('localeContext') || defaultLocaleData;
            const localeCode = sanLocale && sanLocale.locale;
            if (sanLocale && sanLocale.exist && !localeCode) {
                return defaultLocaleData.locale;
            }
            return localeCode;
        }
    },

    inited<TBase extends Base>(this: TBase) {
        this.dispatch('santd_add_locale_receiver', this);
    }
};
