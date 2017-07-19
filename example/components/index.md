
## 使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
可以将多个 `Button` 放入 `Button.Group` 的容器中.

通过设置 `size` 为 `large` `small` 分别把按钮组合设为大、小尺寸。若不设置 `size`，则尺寸为中。


```html
<template>
    <t-button></t-button>
</template>
```

````javascript
import TButton from 'components/button'

export default {
    components: {
        TButton
    }
}
````

```css
button {
    color: red;
}
```