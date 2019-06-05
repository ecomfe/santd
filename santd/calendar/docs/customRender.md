<cn>
#### 通知事项日历
一个复杂的应用示例，用插槽 `dateContent` 和 `monthContent` 函数来自定义需要追加的渲染的数据。
</cn>

```html
<template>
    <div>
        <s-calendar dateCellRender="{{dateCellRender}}" monthCellRender="{{monthCellRender}}" />
    </div>
</template>
<script>
import san from 'san';
import Calendar from 'santd/calendar';
import Badge from 'santd/badge';
import moment from 'moment';

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
        's-calendar': Calendar
    },
    initData() {
        return {
            dateCellRender: san.defineComponent({
                computed: {
                    listData() {
                        const value = this.data.get('value');
                        return getListData(value);
                    }
                },
                components: {
                    's-badge': Badge
                },
                template: `<ul class="events">
                    <li s-for="item in listData">
                        <s-badge status="{{item.type}}" text="{{item.content}}" />
                    </li>
                </ul>`
            }),
            monthCellRender: san.defineComponent({
                computed: {
                    num() {
                        const value = this.data.get('value');
                        return getMonthData(value);
                    }
                },
                template: `<div><div class="notes-month" s-if="num">
                    <section>{{num}}</section>
                    <span>Backlog number</span>
                </div><div>`
            })
        }
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
