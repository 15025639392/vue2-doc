
### 基本用法

Pro-Table

:::demo 这是组件的基本用法

```html
<pro-table
    :columns="columns"
    :dataSource="dataSource"
    :actions="actions"
/>
</el-dialog>
<script>
  const filters = [{text: '后端', value: '后端'}, {text: '前端', value: '前端'}]
  export default {
    name: 'pro-table-demo',
    data() {
        const types = this.$fieldTypes
        return {
            filters:filters,
            actions:[
                {
                    icon:'edit',
                    type: 'primary',
                    show(){
                        return false
                    },
                    onClick:({row})=>{
                        this.getScope(row)
                    }
                },
                {
                    icon:'delete',
                    onClick:({row})=>{
                        this.getScope(row)
                    }
                }
            ],
            columns:[
                {
                    title:'ldy',
                    dataIndex:'name',
                    render(h,{row}){
                        return <div>{row.name}/{row.age}</div>
                    }
                },
                {
                    title:'ldy',
                    dataIndex:'age',
                    data:{
                        1:'27',
                        2:'18岁？'
                    }
                },
                {
                    title:'ldy',
                    dataIndex:'sex',
                    data:[<span>男生</span>,<span>女生</span>]
                },
                {
                    title:'ldy',
                    dataIndex:'xxx',
                    getData(){
                        return new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dd = [`找了个寂寞`]
                                resolve(dd)
                            },1000)
                        })
                    },
                    render(h,{row},data){
                        return <div class="class-test">{row.xxx},{data}</div>
                    }
                },
                {
                    title:'ldy',
                    dataIndex:'title',
                    filters,
                    filterMethod:this.filterMethod
                }
            ],
            dataSource:[
                {
                    name:'ldy',
                    age:2,
                    sex:1,
                    xxx:'sssss',
                    title:'后端',
                },
                {
                    name:'ldy',
                    age:1,
                    sex:0,
                    xxx:'ssldy',
                    title:'前端'
                }
            ]
        };
    },
    mounted(){
    },
    methods:{
        filterMethod(value,row){
            return value === row.title
        },
        getScope(row){
            console.log(row,'当前作用域')
        },
    }
  };
</script>
<style>
    .class-test{
        color:red
    }
</style>
```
:::



:::demo 测试独立性

```html
<pro-table
    :columns="columns"
    :dataSource="dataSource"
    :actions="actions"
/>
</el-dialog>
<script>
  const filters = [{text: '后端', value: '后端'}, {text: '前端', value: '前端'}]
  export default {
    name: 'pro-table-demo',
    data() {
        const types = this.$fieldTypes
        return {
            filters:filters,
            actions:[
                {
                    icon:'edit',
                    type: 'primary',
                    onClick({row}){
                    }
                },
                {
                    icon:'delete',
                    onClick({row}){
                    }
                }
            ],
            columns:[
                {
                    title:'ldy',
                    dataIndex:'name',
                    render(h,{row}){
                        return <div>{row.name}/{row.age}</div>
                    }
                },
                {
                    title:'ldy',
                    dataIndex:'age',
                    data:{
                        1:'27',
                        2:'18岁？'
                    }
                },
                {
                    title:'ldy',
                    dataIndex:'sex',
                    data:[<span>男生</span>,<span>女生</span>]
                },
                {
                    title:'ldy',
                    dataIndex:'xxx',
                    getData(){
                        return new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dd = [`找了个🥜`]
                                resolve(dd)
                            },1000)
                        })
                    },
                    render(h,{row},data){
                        return <div class="class-test">{row.xxx},{data}</div>
                    }
                },
                {
                    title:'ldy',
                    dataIndex:'title',
                    filters,
                    filterMethod:this.filterMethod
                }
            ],
            dataSource:[
                {
                    name:'ldy',
                    age:2,
                    sex:1,
                    xxx:'sssss',
                    title:'后端',
                },
                {
                    name:'ldy',
                    age:1,
                    sex:0,
                    xxx:'ssldy',
                    title:'前端'
                }
            ]
        };
    },
    mounted(){
    },
    methods:{
        filterMethod(value,row){
            return value === row.title
        }
    }
  };
</script>
<style>
    .class-test{
        color:red
    }
</style>
```
:::

### 支持类型
| 参数      | 说明 
|---------- |-------------- |
|所有类型	|如：el-input