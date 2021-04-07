import CalendarLocale from '../../calendar/src/locale/sv_SE';
import TimePickerLocale from '../../time-picker/locale/sv_SE';

export default {
    lang: {
        placeholder: 'Välj datum',
        rangePlaceholder: ['Startdatum', 'Slutdatum'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
