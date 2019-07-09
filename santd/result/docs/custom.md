<cn>
#### Error
复杂的错误反馈。
</cn>

```html
<template>
    <div>
        <s-result
            status="error"
            title="Submission Failed"
            subTitle="Please check and modify the following information before resubmitting."
            extra="{{extra}}"
        >
            <div class="desc">
                <s-paragraph>
                    <s-text strong style="font-size: 16px;">The content you submitted has the following error:</s-text>
                </s-paragraph>
                <s-paragraph>
                    <s-icon style="color: red;" type="close-circle" />
                    Your account has been frozen <a>Thaw immediately &gt;</a>
                </s-paragraph>
                <s-paragraph>
                    <s-icon style="color: red;" type="close-circle" />
                    Your account is not yet eligible to apply <a>Apply Unlock &gt;</a>
                </s-paragraph>
            </div>
        </s-result>
    </div>
</template>
<script>
import Result from 'santd/result';
import Button from 'santd/button';
import Icon from 'santd/icon';
import Typography from 'santd/typography';
import san from 'san';

export default {
    components: {
        's-result': Result,
        's-paragraph': Typography.Paragraph,
        's-text': Typography.Text,
        's-icon': Icon
    },
    initData() {
        return {
            extra: san.defineComponent({
                components: {
                    's-button': Button
                },
                template: `<div>
                    <s-button type="primary" key="console">Go Console</s-button>
                    <s-button key="buy">Buy Again</s-button>
                </div>`
            })
        }
    }
}
</script>
```
