
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


### 测试包含expand的情况

:::demo 测试包含children 的情况

```html
<pro-table
    :columns="columns"
    :dataSource="dataSource"
    :actions="actions"
>
      <template v-slot:expand="props">
            <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
            </el-form-item>
            </el-form>
      </template>
</pro-table>
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
                    title:'render',
                    dataIndex:'name',
                    render(h,{row}){
                        return <div>{row.name}/{row.age}</div>
                    }
                },
                {
                    title:'普通data',
                    dataIndex:'age',
                    data:{
                        1:'27',
                        2:'18岁？'
                    }
                },
                {
                    title:'jsx写法',
                    dataIndex:'sex',
                    data:[<span>男生</span>,<span>女生</span>]
                },
                {
                    title:'异步',
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
                    title:'过滤器',
                    dataIndex:'title',
                    filters,
                    filterMethod:this.filterMethod
                },
                {
                    title:'图片',
                    dataIndex:'imgUrls',
                    isImg:true
                }
            ],
            dataSource:[
                {
                    name:'ldy',
                    age:2,
                    sex:1,
                    xxx:'sssss',
                    title:'后端',
                    imgUrls:['https://pic4.zhimg.com/v2-7c0b75c1b162cc97496f140a69e1b671_qhd.jpg?source=172ae18b','https://pic4.zhimg.com/v2-7c0b75c1b162cc97496f140a69e1b671_qhd.jpg?source=172ae18b']
                },
                {
                    name:'ldy',
                    age:1,
                    sex:0,
                    xxx:'ssldy',
                    title:'前端',
                    imgUrls:null
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


### 测试独立性

:::demo 测试独立性

```html
<pro-table
    :columns="columns"
    :dataSource="dataSource"
    :actions="actions"
/>
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
                    title:'render',
                    dataIndex:'name',
                    render(h,{row}){
                        return <div>{row.name}/{row.age}</div>
                    }
                },
                {
                    title:'普通data',
                    dataIndex:'age',
                    data:{
                        1:'27',
                        2:'18岁？'
                    }
                },
                {
                    title:'jsx写法',
                    dataIndex:'sex',
                    data:[<span>男生</span>,<span>女生</span>]
                },
                {
                    title:'异步',
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
                    title:'过滤器',
                    dataIndex:'title',
                    filters,
                    filterMethod:this.filterMethod
                },
                {
                    title:'图片',
                    dataIndex:'imgUrls',
                    isImg:true
                }
            ],
            dataSource:[
                {
                    name:'ldy',
                    age:2,
                    sex:1,
                    xxx:'sssss',
                    title:'后端',
                    imgUrls:['https://pic4.zhimg.com/v2-7c0b75c1b162cc97496f140a69e1b671_qhd.jpg?source=172ae18b','https://pic4.zhimg.com/v2-7c0b75c1b162cc97496f140a69e1b671_qhd.jpg?source=172ae18b']
                },
                {
                    name:'ldy',
                    age:1,
                    sex:0,
                    xxx:'ssldy',
                    title:'前端',
                    imgUrls:null
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

### 测试树形数据与懒加载

:::demo 测试独立性

```html
<!-- <pro-table
    :columns="columns"
    :dataSource="dataSource"
    :actions="actions"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
/> -->
<br/>
<pro-table
    :columns="columns"
    :dataSource="dataSource"
    :actions="actions"
    :load="load"
    :border="false"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
/>
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
                    title:'extra',
                    dataIndex:'extra'
                },
                {
                    title:'render',
                    dataIndex:'name',
                    render(h,{row}){
                        return <div>{row.name}/{row.age}</div>
                    }
                },
                {
                    title:'普通data',
                    dataIndex:'age',
                    data:{
                        1:'27',
                        2:'18岁？'
                    }
                },
                {
                    title:'jsx写法',
                    dataIndex:'sex',
                    data:[<span>男生</span>,<span>女生</span>]
                },
                {
                    title:'异步',
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
                    title:'过滤器',
                    dataIndex:'title',
                    filters,
                    filterMethod:this.filterMethod
                },
                {
                    title:'图片',
                    dataIndex:'imgUrls',
                    isImg:true
                }
            ],
            dataSource:[
                {
                    name:'ldy',
                    age:2,
                    sex:1,
                    xxx:'sssss',
                    title:'后端',
                    imgUrls:['https://pic4.zhimg.com/v2-7c0b75c1b162cc97496f140a69e1b671_qhd.jpg?source=172ae18b','https://pic4.zhimg.com/v2-7c0b75c1b162cc97496f140a69e1b671_qhd.jpg?source=172ae18b']
                },
                {
                    hasChildren: true,
                    name:'ldy',
                    age:1,
                    sex:0,
                    extra:'extra',
                    xxx:'ssldy',
                    title:'前端',
                    imgUrls:null
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
        load(tree, treeNode, resolve) {
            setTimeout(() => {
                resolve([
                    {
                    id: 31,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                    id: 32,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                    }
                ])
            }, 1000)
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