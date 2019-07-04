import CalendarLocale from '../../calendar/src/locale/pl_PL';
import TimePickerLocale from '../../timepicker/locale/pl_PL';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Wybierz datę',
        rangePlaceholder: ['Data początkowa', 'Data końcowa'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
