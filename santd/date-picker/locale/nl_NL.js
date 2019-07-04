import CalendarLocale from '../../calendar/src/locale/nl_NL';
import TimePickerLocale from '../../timepicker/locale/nl_NL';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Selecteer datum',
        rangePlaceholder: ['Begin datum', 'Eind datum'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
