import CalendarLocale from '../../calendar/src/locale/tr_TR';
import TimePickerLocale from '../../timepicker/locale/tr_TR';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Tarih Seç',
        rangePlaceholder: ['Başlangıç Tarihi', 'Bitiş Tarihi'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
