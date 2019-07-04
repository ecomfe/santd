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
            const locale = defaultLocale || defaultLocaleData[componentName || 'global'];

            const sanLocale = this.data.get('localeContext');
            const localeFromContext = componentName && sanLocale ? sanLocale[componentName] : {};

            const result = {
                ...locale,
                ...localeFromContext
            };
            return result;
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
    inited() {
        this.dispatch('addLocaleReceiver', this);
    }
});
