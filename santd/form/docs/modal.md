<text lang="cn">
#### 弹出层中的新建表单
当用户访问一个展示了某个列表的页面，想新建一项但又不想跳转页面时，可以用 Modal 弹出一个表单，用户填写必要信息后创建新的项。
</text>

```html
<template>
    <div>
        <s-button type="primary" on-click="showModal">New Collection</s-button>
        <s-collectioncreateform visible="{{visible}}" on-cancel="hideModal" on-ok="hideModal"></s-collectioncreateform>
  </div>
</template>
<script>
import Form from 'santd/form';
import Input from 'santd/input';
import Radio from 'santd/radio';
import Button from 'santd/button';
import Modal from 'santd/modal';

const collectionCreateForm = Form.create({name: 'form_in_modal'})({
    components: {
        's-modal': Modal,
        's-form': Form,
        's-formitem': Form.FormItem,
        's-input': Input,
        's-textarea': Input.TextArea,
        's-radiogroup': Radio.Group,
        's-radio': Radio
    },
    initData() {
        return {
            titleDecorator: {
                name: 'title',
                rules: [{required: true, message: 'Please input the title of collection!'}]
            },
            descriptionDecorator: {
                name: 'description'
            },
            modifierDecorator: {
                name: 'modifier',
                initialValue: 'public'
            }
        }
    },
    handleCancel() {
        this.fire('cancel');
    },
    handleCreate() {
        const form = this.data.get('form');
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();
            this.fire('ok');
        });
    },
    template: `
        <div>
            <s-modal
                title="Create a new collection"
                okText="Create"
                visible="{{visible}}"
                on-cancel="handleCancel"
                on-ok="handleCreate"
            >
                <s-form layout="vertical">
                    <s-formitem label="Title">
                        <s-input decorator="{{titleDecorator}}"></s-input>
                    </s-formitem>
                    <s-formitem label="Description">
                        <s-textarea decorator="{{descriptionDecorator}}"></s-textarea>
                    </s-formitem>
                    <s-formitem className="collection-create-form_last-form-item">
                        <s-radiogroup decorator="{{modifierDecorator}}">
                            <s-radio value="public">Public</s-radio>
                            <s-radio value="private">Private</s-radio>
                        </s-radiogroup>
                    </s-formitem>
                </s-form>
            </s-modal>
        </div>
    `
});

export default {
    components: {
        's-button': Button,
        's-modal': Modal,
        's-collectioncreateform': collectionCreateForm
    },
    initData() {
        visible: false
    },
    showModal() {
        this.data.set('visible', true);
    },
    hideModal() {
        this.data.set('visible', false);
    }
};
</script>

<style>
.collection-create-form_last-form-item {
    margin-bottom: 0;
}
</style>
```
