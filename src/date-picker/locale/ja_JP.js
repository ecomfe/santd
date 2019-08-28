import CalendarLocale from '../../calendar/src/locale/ja_JP';
import TimePickerLocale from '../../timepicker/locale/ja_JP';

export default {
    lang: {
        placeholder: '日付を選択',
        rangePlaceholder: ['開始日付', '終了日付'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
