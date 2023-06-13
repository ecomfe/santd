import CalendarLocale from '../../calendar/src/locale/uk_UA';
import TimePickerLocale from '../../time-picker/locale/uk_UA';

export default {
    lang: {
        placeholder: 'Оберіть дату',
        rangePlaceholder: ['Початкова дата', 'Кінцева дата'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
