import CalendarLocale from '../../calendar/src/locale/ru_RU';
import TimePickerLocale from '../../timepicker/locale/ru_RU';

export default {
    lang: {
        placeholder: 'Выберите дату',
        rangePlaceholder: ['Начальная дата', 'Конечная дата'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
