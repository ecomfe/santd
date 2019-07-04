import CalendarLocale from '../../calendar/src/locale/sk_SK';
import TimePickerLocale from '../../timepicker/locale/sk_SK';

// 统一合并为完整的 Locale
export default {
    lang: {
        placeholder: 'Vybrať dátum',
        rangePlaceholder: ['Od', 'Do'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
