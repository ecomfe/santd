import CalendarLocale from '../../calendar/src/locale/he_IL';
import TimePickerLocale from '../../timepicker/locale/he_IL';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'בחר תאריך',
        rangePlaceholder: ['תאריך התחלה', 'תאריך סיום'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
