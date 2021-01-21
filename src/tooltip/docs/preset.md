<text lang="cn">
#### 多彩文字提示
我们添加了多种预设色彩的文字提示样式，用作不同场景使用。
</text>

```html
<template>
    <div>
        <div>
            <s-tooltip color="pink"  style="margin: 10px;" title="prompt text">
                <s-button>pink</s-button>
            </s-tooltip>
            <s-tooltip color="red" style="margin-right: 10px;" title="prompt text">
                <s-button>red</s-button>
            </s-tooltip>
            <s-tooltip color="yellow" style="margin-right: 10px;"  title="prompt text">
                <s-button>yellow</s-button>
            </s-tooltip>
             <s-tooltip color="orange" style="margin-right: 10px;" title="prompt text">
                <s-button>orange</s-button>
            </s-tooltip>
             <s-tooltip color="cyan" style="margin-right: 10px;" title="prompt text">
                <s-button>cyan</s-button>
            </s-tooltip>
             <s-tooltip color="green" style="margin-right: 10px;" title="prompt text">
                <s-button>green</s-button>
            </s-tooltip>
        </div>
        <div style="margin-top: 20px;">
            <s-tooltip color="purple" style="margin-right: 10px; "title="prompt text">
                <s-button>purple</s-button>
            </s-tooltip>
             <s-tooltip color="geekblue" style="margin-right: 10px;" title="prompt text">
                <s-button>geekblue</s-button>
            </s-tooltip>
             <s-tooltip color="magenta" style="margin-right: 10px;"  title="prompt text">
                <s-button>magenta</s-button>
            </s-tooltip>
             <s-tooltip color="volcano" style="margin-right: 10px;" title="prompt text">
                <s-button>volcano</s-button>
            </s-tooltip>
             <s-tooltip color="gold" style="margin-right: 10px;" title="prompt text">
                <s-button>gold</s-button>
            </s-tooltip>
            <s-tooltip color="lime" style="margin-right: 10px;" title="prompt text">
                <s-button>lime</s-button>
            </s-tooltip>
        </div>
        <div style="margin-top: 20px;">
            <s-tooltip color="#f50" style="margin-right: 10px; "title="prompt text">
                <s-button>#f50</s-button>
            </s-tooltip>
             <s-tooltip color="#2db7f5" style="margin-right: 10px;" title="prompt text">
                <s-button>#2db7f5</s-button>
            </s-tooltip>
             <s-tooltip color="#87d068" style="margin-right: 10px;"  title="prompt text">
                <s-button>#87d068</s-button>
            </s-tooltip>
             <s-tooltip color="#108ee9" style="margin-right: 10px;" title="prompt text">
                <s-button>#108ee9</s-button>
            </s-tooltip>
        </div>
    </div>
</template>
<script>
import {Tooltip, Button} from 'santd';

export default {
    components: {
        's-tooltip': Tooltip,
        's-button': Button
    }
}
</script>
```
