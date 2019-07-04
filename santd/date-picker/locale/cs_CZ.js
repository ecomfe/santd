import CalendarLocale from '../../calendar/src/locale/cs_CZ';
import TimePickerLocale from '../../timepicker/locale/cs_CZ';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Vybrat datum',
        rangePlaceholder: ['Od', 'Do'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
