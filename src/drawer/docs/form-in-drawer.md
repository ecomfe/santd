<text lang="cn">
#### 抽屉表单
在抽屉中使用表单。
</text>

```html
<template>
    <div>
        <s-button type="primary" on-click="toggleDrawer"><s-icon type="plus"/> New account</s-button>
        <s-drawer
            title="Create a new account"
            visible="{=visible=}"
            width="{{720}}"
            on-close="onClose"
        >
            <s-form layout="vertical" hideRequiredMark="{{true}}">
                <s-row gutter="16">
                    <s-col span="12">
                        <s-item label="Name">
                            <s-input decorator="{{nameDecorator}}" placeholder="Please enter user name"></s-input>
                        </s-item>
                    </s-col>
                    <s-col span="12">
                        <s-item label="Url">
                            <s-input decorator="{{urlDecorator}}" placeholder="Please enter url" addonBefore="http://" addonAfter=".com"></s-input>
                        </s-item>
                    </s-col>
                </s-row>
                <s-row gutter="16">
                    <s-col span="12">
                        <s-item label="Owner">
                            <s-select placeholder="Please choose the Owner" decorator="{{ownerDecorator}}">
                                <s-option value="xiao">Xiaoxiao</s-option>
                                <s-option value="mao">Maomao</s-option>
                            </s-select>
                        </s-item>
                    </s-col>
                    <s-col span="12">
                        <s-item label="Type">
                            <s-select placeholder="Please choose the type" decorator="{{typeDecorator}}">
                                <s-option value="private">Private</s-option>
                                <s-option value="public">Public</s-option>
                            </s-select>
                        </s-item>
                    </s-col>
                </s-row>
                <s-row gutter="16">
                    <s-col span="12">
                        <s-item label="Approver">
                            <s-select placeholder="Please choose the approver" decorator="{{approverDecorator}}">
                                <s-option value="jack">Jack Ma</s-option>
                                <s-option value="tom">Tom Liu</s-option>
                            </s-select>
                        </s-item>
                    </s-col>
                    <s-col span="12">
                        <s-item label="DateTime">
                            <s-rangepicker decorator="{{datetimeDecorator}}"></s-rangepicker>
                        </s-item>
                    </s-col>
                </s-row>
                <s-row gutter="16">
                    <s-col span="24">
                        <s-item label="Description">
                            <s-textarea rows="4" placeholder="Please enter url description" decorator="{{descriptionDecorator}}"></s-textarea>
                        </s-item>
                    </s-col>
                </s-row>
            </s-form>
            <div class="form-button-wrap">
                <s-button on-click="toggleDrawer" type="default">Cancel</s-button>
                <s-button on-click="toggleDrawer" type="primary">Submit</s-button>
            </div>
        </s-drawer>
    </div>
</template>

<script>
import button from 'santd/button';
import drawer from 'santd/drawer';
import icon from 'santd/icon';
import form from 'santd/form';
import grid from 'santd/grid';
import input from 'santd/input';
import select from 'santd/select';
import datepicker from 'santd/date-picker';

export default form.create({})({
    components: {
        's-button': button,
        's-drawer': drawer,
        's-icon': icon,
        's-row': grid.Row,
        's-col': grid.Col,
        's-form': form,
        's-item': form.FormItem,
        's-input': input,
        's-select': select,
        's-option': select.Option,
        's-textarea': input.TextArea,
        's-rangepicker': datepicker.RangePicker
    },
    initData() {
        return {
            visible: false,
            nameDecorator: {
                name: 'name',
                rules: [{required: true, message: 'Please enter user name'}]
            },
            urlDecorator: {
                name: 'url',
                rules: [{required: true, message: 'Please enter url'}]
            },
            ownerDecorator: {
                name: 'owner',
                rules: [{required: true, message: 'Please choose the owner'}]
            },
            typeDecorator: {
                name: 'type',
                rules: [{required: true, message: 'Please choose the type'}]
            },
            approverDecorator: {
                name: 'approver',
                rules: [{required: true, message: 'Please choose the approver'}]
            },
            datetimeDecorator: {
                name: 'datetime',
                rules: [{required: true, message: 'Please choose the date time'}]
            },
            descriptionDecorator: {
                name: 'description',
                rules: [{required: true, message: 'Please enter url description'}]
            }
        };
    },
    toggleDrawer() {
        const visible = this.data.get('visible');
        this.data.set('visible', !visible);
    },
    onClose(e) {
        console.log(e, 'I was closed.');
    }
})
</script>

<style>
.form-button-wrap {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 4px 4px;
}
</style>
```
