<text lang="cn">
#### 自动调整字符大小
对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。
</text>

```html
<template>
    <div>
        <s-avatar size="large" style="background-color: {{color}};vertical-align: middle">{{avatarValue}}</s-avatar>
        <s-button size="small" style="margin-left: 16px; vertical-a=lign:middle" on-click="changeValue"
            >Change</s-button
        >
    </div>
</template>

<script>
    import Avatar from 'santd/avatar';
    import Button from 'santd/button';

    const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
    const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    export default {
        components: {
            's-avatar': Avatar,
            's-button': Button
        },
        initData() {
            return {
                avatarValue: UserList[0],
                color: colorList[0]
            };
        },
        changeValue() {
            const index = UserList.indexOf(this.data.get('avatarValue'));
            this.data.set('avatarValue', index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
            this.data.set('color', index < colorList.length - 1 ? colorList[index + 1] : colorList[0]);
        }
    };
</script>
```
