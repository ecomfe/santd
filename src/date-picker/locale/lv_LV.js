import CalendarLocale from '../../calendar/src/locale/lv_LV';
import TimePickerLocale from '../../timepicker/locale/lv_LV';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Izvēlieties datumu',
        rangePlaceholder: ['Sākuma datums', 'Beigu datums'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
