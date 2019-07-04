import CalendarLocale from '../../calendar/src/locale/ku_IQ';
import TimePickerLocale from '../../timepicker/locale/ku_IQ';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Dîrok hilbijêre',
        rangePlaceholder: ['Dîroka destpêkê', 'Dîroka dawîn'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
