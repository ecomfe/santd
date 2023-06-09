import CalendarLocale from '../../calendar/src/locale/da_DK';
import TimePickerLocale from '../../time-picker/locale/da_DK';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Vælg dato',
        rangePlaceholder: ['Startdato', 'Slutdato'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
