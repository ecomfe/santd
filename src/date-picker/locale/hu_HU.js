import CalendarLocale from '../../calendar/src/locale/hu_HU';
import TimePickerLocale from '../../timepicker/locale/hu_HU';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Válasszon dátumot',
        rangePlaceholder: ['Kezdő dátum', 'Befejezés dátuma'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
