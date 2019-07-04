<cn>
#### 国际化
用 `LocaleProvider` 包裹你的应用，并引用对应的语言包。
</cn>

```html
<template>
    <div>
        <div class="change-locale">
        <span style="margin-right: 16px">Change locale of components: </span>
        <s-radiogroup defaultValue="enUS" on-change="handleChangeLocale">
            <s-radiobutton key="en" value="enUS">English</s-radiobutton>
            <s-radiobutton key="cn" value="zhCN">中文</s-radiobutton>
        </s-radiogroup>
        </div>
        <s-localeprovider locale="{{locale}}">
            <div class="locale-components">
                <div class="example">
                    <s-pagination defaultCurrent="{{1}}" total="{{50}}" showSizeChanger />
                </div>
                <div class="example">
                    <s-datepicker/>
                    <s-timepicker/>
                    <s-rangepicker style="width: 200px" />
                </div>
                <div class="example">
                    <s-button type="primary" on-click="showModal">Show Modal</s-button>
                    <s-popconfirm title="Question?">
                        <a href="#">Click to confirm</a>
                    </s-popconfirm>
                </div>
                <div class="example">
                    <s-transfer dataSource="{{[]}}" showSearch targetKeys="{{[]}}" render="{{render}}"/>
                <div>
                <div class="example" style="width: 319px; border: 1px solid #d9d9d9; border-radius: 4px">
                    <s-calendar fullscreen="{{false}}"  />
                </div>
                <div class="example">
                    <s-table dataSource="{{[]}}" columns="{{columns}}" />
                </div>
                <s-modal title="Locale Modal" visible="{{visible}}" on-cancel="hideModal">
                    <p>Locale Modal</p>
                </s-modal>
            </div>
        </s-localeprovider>
    </div>
</template>
<script>
import Pagination from 'santd/pagination';
import LocaleProvider from 'santd/localeprovider';
import zhCN from 'santd/localeprovider/zh_CN';
import enUS from 'santd/localeprovider/en_US';
import Radio from 'santd/radio';
import Select from 'santd/select';
import DatePicker from 'santd/date-picker';
import TimePicker from 'santd/timepicker';
import Button from 'santd/button';
import Modal from 'santd/modal';
import Popconfirm from 'santd/popconfirm';
import Transfer from 'santd/transfer';
import Calendar from 'santd/calendar';
import Table from 'santd/table';

export default {
    initData() {
        return {
            locale: null,
            visible: false,
            render(item) {
                return item.title;
            },
            columns: [{
                title: 'Name',
                dataIndex: 'name'
            }, {
                title: 'Age',
                dataIndex: 'age'
            }]
        }
    },
    components: {
        's-localeprovider': LocaleProvider,
        's-pagination': Pagination,
        's-radiogroup': Radio.Group,
        's-radiobutton': Radio.Button,
        's-select': Select,
        's-selectoption': Select.Option,
        's-datepicker': DatePicker,
        's-timepicker': TimePicker,
        's-rangepicker': DatePicker.RangePicker,
        's-button': Button,
        's-modal': Modal,
        's-popconfirm': Popconfirm,
        's-transfer': Transfer,
        's-calendar': Calendar,
        's-table': Table
    },
    handleChangeLocale(e) {
        const value = e.target.value;
        this.data.set('locale', value === 'zhCN' ? zhCN : enUS);
    },
    showModal() {
        this.data.set('visible', true);
    },
    hideModal() {
        this.data.set('visible', false);
    },
    info() {
        Modal.info({
            title: 'some info',
            content: 'some info'
        });
    }
}
</script>
<style>
.locale-components {
    border-top: 1px solid #d9d9d9;
    padding-top: 16px;
}

.example {
    margin: 16px 0;
}

.example > * {
    margin-right: 8px;
}

.change-locale {
    margin-bottom: 16px;
}
</style>
```
