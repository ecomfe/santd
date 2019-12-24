import CalendarLocale from '../../calendar/src/locale/it_IT';
import TimePickerLocale from '../../timepicker/locale/it_IT';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Selezionare la data',
        rangePlaceholder: ['Data d\'inizio', 'Data di fine'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
