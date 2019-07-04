import CalendarLocale from '../../calendar/src/locale/el_GR';
import TimePickerLocale from '../../timepicker/locale/el_GR';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Επιλέξτε ημερομηνία',
        rangePlaceholder: ['Αρχική ημερομηνία', 'Τελική ημερομηνία'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
