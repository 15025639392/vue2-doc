

### 基本用法

HellWorld

:::demo 这是组件的基本用法

```html
<div>{{stare.name}}</div>
<script>
    const store={
        state:{
            name:''
        },
        setState(obj){
            for(const key in obj){
                this.state[key]=obj[key]
            }
        }
    }
    export default{
        name:'StoreDemo',
        data(){
            return {
                stare:store.state
            }
        },
        mounted(){
           store.setState({
               name:'ldy'
           })
        }
    }
</script>
```
:::