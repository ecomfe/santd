<text lang="cn">
#### 设置只读
设置输入框为只读。
</text>

```html
<template>
    <div>
        <s-datepicker inputReadOnly="{{true}}" on-change="handleChange" locale="{{mylocale}}" align="{{align}}"/>
        <br /><br />
        <s-monthpicker placeholder="Select month" on-change="handleChange"/>
        <br /><br />
        <s-rangepicker on-change="handleChange" />
        <br /><br />
        <s-weekpicker placeholder="Select week" on-change="handleChange" />
    </div>
</template>

<script>
import {DatePicker} from 'santd';

export default {
    initData() {
        return {
            align: {
                points: ['tr', 'tr'], 
                offset: [0, -3],
                overflow: {
                    adjustX: 1,
                    adjustY: 1
                },
                targetOffset: [0, 0]
            },
            mylocale: {
              lang: {
                today: '今天',
                now: '此刻',
                backToToday: '返回今天',
                ok: '确定',
                timeSelect: '选择时间',
                dateSelect: '选择日期',
                weekSelect: '选择周',
                clear: '清除',
                month: '月',
                year: '年',
                previousMonth: '上个月 (翻页上键)',
                nextMonth: '下个月 (翻页下键)',
                monthSelect: '选择月份',
                yearSelect: '选择年份',
                decadeSelect: '选择年代',
                yearFormat: 'YYYY年',
                dayFormat: 'D日',
                dateFormat: 'YYYY年M月D日',
                dateTimeFormat: 'YYYY年M月D日 HH时mm分ss秒',
                previousYear: '上一年 (Control键加左方向键)',
                nextYear: '下一年 (Control键加右方向键)',
                previousDecade: '上一年代',
                nextDecade: '下一年代',
                previousCentury: '上一世纪',
                nextCentury: '下一世纪',
                placeholder: '请选择时间',
                rangePlaceholder: ["开始日期", "结束日期"]

              },
              timePickerLocale: {
                placeholder: '请选择时间',
              },
            }
        }
    },
    components: {
        's-datepicker': DatePicker,
        's-monthpicker': DatePicker.MonthPicker,
        's-weekpicker': DatePicker.WeekPicker,
        's-rangepicker': DatePicker.RangePicker
    },
    handleChange({date, dateString}) {
        console.log(date, dateString);
    }
}
</script>

```