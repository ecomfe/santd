import CalendarLocale from '../../calendar/src/locale/ca_ES';
import TimePickerLocale from '../../timepicker/locale/ca_ES';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Seleccionar data',
        rangePlaceholder: ['Data inicial', 'Data final'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
