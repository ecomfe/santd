/**
 * @file Santd locale receiver file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import defaultLocaleData from './zh_CN';

export default san.defineComponent({
    computed: {
        locale() {
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
        localeCode() {
            const sanLocale = this.data.get('localeContext') || defaultLocaleData;
            const localeCode = sanLocale && sanLocale.locale;
            if (sanLocale && sanLocale.exist && !localeCode) {
                return defaultLocaleData.locale;
            }
            return localeCode;
        }
    },
    inited() {
        this.dispatch('addLocaleReceiver', this);
    }
});
