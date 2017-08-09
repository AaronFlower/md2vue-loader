
## Usage

Use the button component

```html
<h2>This is the Vue Component!</h2>
<t-button></t-button>
<t-button class="scoped-button"></t-button>
<p>{{msg}}</p>
```

````javascript
import TButton from 'components/button'

export default {
    components: {
        TButton
    },
    data () {
        return {
            msg: 'Helllo md2vue-loader'
        }
    }
}
````

```css
button {
    color: red;
}
```

```css@scoped
.scoped-button {    
    background: rebeccapurple;
}
```