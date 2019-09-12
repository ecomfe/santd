import CalendarLocale from '../../calendar/src/locale/de_DE';
import TimePickerLocale from '../../timepicker/locale/de_DE';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Datum auswählen',
        rangePlaceholder: ['Startdatum', 'Enddatum'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
