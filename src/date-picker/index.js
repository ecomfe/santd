/**
 * @file Santd datepicker
 * @author mayihui@baidu.com
 */

import './style/index';
import Calendar from '../calendar/src/Calendar';
import MonthCalendar from '../calendar/src/MonthCalendar';
import RangePicker from './RangePicker';
import createPicker from './createPicker';
import wrapPicker from './wrapPicker';
import WeekPicker from './WeekPicker';
import dayjs from 'dayjs';
import weekYear from 'dayjs/plugin/weekYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(weekYear);
dayjs.extend(advancedFormat);

const DatePicker = wrapPicker(createPicker(Calendar), 'date');

DatePicker.MonthPicker = wrapPicker(createPicker(MonthCalendar), 'month');
DatePicker.WeekPicker = wrapPicker(WeekPicker, 'week');
DatePicker.RangePicker = wrapPicker(RangePicker, 'date');

export default DatePicker;

