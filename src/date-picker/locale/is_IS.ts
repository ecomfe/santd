import CalendarLocale from '../../calendar/src/locale/is_IS';
import TimePickerLocale from '../../time-picker/locale/is_IS';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Veldu dag',
        rangePlaceholder: ['Upphafsdagur', 'Lokadagur'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
