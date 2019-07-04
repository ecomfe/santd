/**
 * @file Santd datepicker
 * @author mayihui@baidu.com
 */

import './style/index';
import Calendar from '../calendar/src/calendar';
import MonthCalendar from '../calendar/src/monthCalendar';
import RangePicker from './rangePicker';
import createPicker from './createPicker';
import wrapPicker from './wrapPicker';
import WeekPicker from './weekPicker';

const DatePicker = wrapPicker(createPicker(Calendar), 'date');

DatePicker.MonthPicker = wrapPicker(createPicker(MonthCalendar), 'month');
DatePicker.WeekPicker = wrapPicker(WeekPicker, 'week');
DatePicker.RangePicker = wrapPicker(RangePicker, 'date');

export default DatePicker;

