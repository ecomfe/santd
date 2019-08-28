import CalendarLocale from '../../calendar/src/locale/bg_BG';
import TimePickerLocale from '../../timepicker/locale/bg_BG';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Избор на дата',
        rangePlaceholder: ['Начална', 'Крайна'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
