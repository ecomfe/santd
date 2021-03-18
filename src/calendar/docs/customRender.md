<codebox>
#### 通知事项日历
一个复杂的应用示例，用插槽 `dateCellRender` 和 `monthCellRender` 来自定义需要追加的渲染的数据。

```html
<template>
    <div>
        <s-calendar>
            <ul class="events" slot="dateCellRender">
                <li s-for="item in getListData(value)">
                    <s-badge status="{{item.type}}" text="{{item.content}}" />
                </li>
            </ul>
            <template slot="monthCellRender">
                <div class="notes-month" s-if="getMonthData(value)">
                    <section>{{getMonthData(value)}}</section>
                    <span>Backlog number</span>
                </div>
            </template>
        </s-calendar>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import {Calendar, Badge} from 'santd';

function getListData(value) {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' }
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' }
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event。。....' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' }
            ];
            break;
        default:
    }
    return listData || [];
}

function getMonthData(value) {
    if (value.month() === 8) {
        return 1394;
    }
}

export default {
    components: {
        's-calendar': Calendar,
        's-badge': Badge
    },
    getListData(value) {
        return getListData(value);
    },
    getMonthData(value) {
        return getMonthData(value);
    }
}
</script>

<style>
.events {
    list-style: none;
    margin: 0;
    padding: 0;
}
.events .san-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
   font-size: 12px;
}
.notes-month {
    text-align: center;
    font-size: 28px;
}
.notes-month section {
    font-size: 28px;
}
</style>
```
</codebox>
