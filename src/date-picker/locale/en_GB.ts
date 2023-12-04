import CalendarLocale from '../../calendar/src/locale/en_GB';
import TimePickerLocale from '../../time-picker/locale/en_GB';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Select date',
        rangePlaceholder: ['Start date', 'End date'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
