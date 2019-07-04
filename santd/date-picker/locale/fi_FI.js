import CalendarLocale from '../../calendar/src/locale/fi_FI';
import TimePickerLocale from '../../timepicker/locale/fi_FI';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Valitse päivä',
        rangePlaceholder: ['Alku päivä', 'Loppu päivä'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
