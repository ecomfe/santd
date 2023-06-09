import CalendarLocale from '../../calendar/src/locale/es_ES';
import TimePickerLocale from '../../time-picker/locale/es_ES';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Seleccionar fecha',
        rangePlaceholder: ['Fecha inicial', 'Fecha final'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
