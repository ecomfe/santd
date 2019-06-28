/**
 * @file Santd locale receiver file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import defaultLocaleData from './default';

export default san.defineComponent({
    initData() {
        return {
            componentName: 'global'
        };
    },
    computed: {
        locale() {
            const componentName = this.data.get('componentName');
            const defaultLocale = this.data.get('defaultLocale');
            const locale = defaultLocale || defaultLocale[componentName || 'global'];

            const sanLocale = this.data.get('localeContext');
            const localeFromContext = componentName && sanLocale ? sanLocale[componentName] : {};

            return {
                ...locale,
                ...localeFromContext
            };
        },
        localeCode() {
            const sanLocale = this.data.get('localeContext');
            const localeCode = sanLocale && sanLocale.locale;
            if (sanLocale && sanLocale.exist && !localeCode) {
                return defaultLocaleData.locale;
            }
            return localeCode;
        }
    },
    attached() {
        this.dispatch('addLocaleReceiver', this);
    }
});
