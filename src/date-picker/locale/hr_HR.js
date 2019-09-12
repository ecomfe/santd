import CalendarLocale from '../../calendar/src/locale/hr_HR';
import TimePickerLocale from '../../timepicker/locale/hr_HR';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Odaberite datum',
        rangePlaceholder: ['Početni datum', 'Završni datum'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
