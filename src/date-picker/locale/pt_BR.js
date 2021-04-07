import CalendarLocale from '../../calendar/src/locale/pt_BR';
import TimePickerLocale from '../../time-picker/locale/pt_BR';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Selecionar data',
        rangePlaceholder: ['Data de início', 'Data de fim'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
