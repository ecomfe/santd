import CalendarLocale from '../../calendar/src/locale/nb_NO';
import TimePickerLocale from '../../timepicker/locale/nb_NO';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Velg dato',
        rangePlaceholder: ['Startdato', 'Sluttdato'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
