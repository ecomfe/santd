import CalendarLocale from '../../calendar/src/locale/et_EE';
import TimePickerLocale from '../../timepicker/locale/et_EE';

// 统一合并为完整的 Locale
export default {
    lang: {
        placeholder: 'Vali kuupäev',
        rangePlaceholder: ['Algus kuupäev', 'Lõpu kuupäev'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
