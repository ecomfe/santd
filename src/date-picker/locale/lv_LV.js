import CalendarLocale from '../../calendar/src/locale/lv_LV';
import TimePickerLocale from '../../time-picker/locale/lv_LV';

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
