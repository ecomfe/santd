import CalendarLocale from '../../calendar/src/locale/id_ID';
import TimePickerLocale from '../../timepicker/locale/id_ID';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Pilih tanggal',
        rangePlaceholder: ['Mulai tanggal', 'Tanggal akhir'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
