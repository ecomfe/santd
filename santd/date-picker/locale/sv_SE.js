import CalendarLocale from '../../calendar/src/locale/sv_SE';
import TimePickerLocale from '../../timepicker/locale/sv_SE';

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
