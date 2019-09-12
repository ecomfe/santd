import CalendarLocale from '../../calendar/src/locale/nl_BE';
import TimePickerLocale from '../../timepicker/locale/nl_BE';

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
