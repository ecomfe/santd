import CalendarLocale from '../../calendar/src/locale/sr_RS';
import TimePickerLocale from '../../timepicker/locale/sr_RS';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Izaberite datum',
        rangePlaceholder: ['Početni datum', 'Krajnji datum'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
