/**
 * @file Santd datepicker
 * @author mayihui@baidu.com
 */
import Calendar from '../calendar/src/Calendar';
import MonthCalendar from '../calendar/src/MonthCalendar';
import RangePicker from './RangePicker';
import createPicker from './createPicker';
import wrapPicker from './wrapPicker';
import WeekPicker from './WeekPicker';
import './style/index';

type TBasePicker = ReturnType<typeof wrapPicker>;

interface TDatePicker extends TBasePicker {
    MonthPicker: TBasePicker;
    WeekPicker: ReturnType<typeof wrapPicker<'week'>>;
    RangePicker: ReturnType<typeof wrapPicker<'range'>>;
}


const DatePicker = wrapPicker<'date'>(createPicker(Calendar), 'date') as TDatePicker;

DatePicker.MonthPicker = wrapPicker<'month'>(createPicker(MonthCalendar), 'month');
DatePicker.WeekPicker = wrapPicker<'week'>(WeekPicker, 'week');
DatePicker.RangePicker = wrapPicker<'range'>(RangePicker, 'date');

export default DatePicker;

