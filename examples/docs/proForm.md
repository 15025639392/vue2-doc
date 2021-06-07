
### 基本用法

Pro-Form
- 支持el-from所有属性
- 支持在单项配置中所有原组件自带方法
- 支持el-from所有属性
- 支持在单项配置中所有原组件自带方法
- 支持操作按钮插槽
- 支持单项上一属性安装插槽
- 支持单项属性 自定义render
- 支持单项属性 传入组件（未支持）
- 支持单项组件状态变更通知 （未支持）
- 支持表单之间状态联动

:::demo 这是组件的基本用法

```html
<el-button type="text" @click="onChangeFrom">测试改变From的值</el-button>
<el-button type="text" @click="dialogFormVisible = true">打开表单的 Dialog</el-button>
<el-dialog title="表单" :visible.sync="dialogFormVisible">
<pro-form
    :config="fromConfig"
    :label-width="120"
    label-position="left"
    v-bind.sync="fromData"
    :rules="rules"
>
    <template v-slot:slottest="{validate}">
        自定义插槽位置测试
    </template>
    <template v-slot:footer="{validate}">
        <div class="dialog-footer" style="text-align:right">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit(validate)">确定</el-button>
        </div>
    </template>
</pro-form>
</el-dialog>
<script>
  export default {
      name: 'pro-form-demo',
    data() {
        const types = this.$fieldTypes
      return {
          dialogFormVisible:false,
          fromData:{
                name:'',
                test:'',
                test2:1,
                test3:'',
                test4:10,
                test5:'',
                test6:'',
                test7:4,
                test8:'',
                test9:'',
                test10:''
          },
          rules:{
              name:[{
                  required: true
              }]
          },
        fromConfig: [
            {
                field:'name',
                label:'test',
                type:types.isInput,
                maxlength:10,
                onChange(config){
                    
                }
            },
            {
                field:'test',
                label:'本地选择',
                type:types.isSelect,
                slotName:'slottest',//测试任意地方插入插槽
                disabled:()=>{
                    return this.name ==='ldy'
                },
                data:[
                    {
                        label:'test',
                        value:'test'
                    }
                ],
                attrs:{
                    remoteMethod:(query,item)=>{
                        item.data = [
                            {
                                label:'test2',
                                value:'test2'
                            },
                            {
                                label:'test',
                                value:'test'
                            }
                        ].filter(o=>o.value.includes(query))
                    }
                },
                onChange(config){
                    
                }
            },
            {
                field:'test2',
                label:'test',
                type:types.isNumber,
                hide:()=>{
                    return this.name ==='ldy'
                },
                onChange(config){
                    
                }
            },
            {
                field:'test3',
                label:'test',
                type:types.isSwitch,
                onChange(config){
                    
                }
            },
            {
                field:'test4',
                label:'test',
                type:types.isSlider,
                onChange(config){
                    
                }
            },
            {
                field:'test5',
                label:'test',
                type:types.isTimePicker,
                onChange(config){
                    
                }
            },

            {
                field:'test6',
                label:'test',
                type:types.isDatePicker,
                onChange(config){
                    
                }
            },
            {
                field:'test10',
                label:'test',
                type:types.isDatePicker,
                attrs:{
                    type:'daterange'
                },
                onChange(config){
                    
                }
            },
            {
                field:'test11',
                label:'test',
                type:types.isDatePicker,
                attrs:{
                    type:'datetime'
                },
                onChange(config){
                    
                }
            },
            {
                field:'test7',
                label:'test7',
                type:types.isRage,
                onChange(config){
                    
                }
            },
            {
                field:'test8',
                label:'test8',
                type:types.isColorPicker,
                onChange(config){
                    
                }
            },
            {
                field:'divtest',
                label:'test8',
                type:'div',
                onChange(config){
                    
                },
                render(h,item){
                    console.log(item)
                    return <div>自定义render测试</div>
                }
            },
            {
                field:'test9',
                label:'test',
                type:types.isUpLoad,
                attrs:{
                    action:'https://jsonplaceholder.typicode.com/posts/'
                },
                onChange(config){
                    
                },
                class:{
                    'upload':true
                },
                render(h,item){
                    return (<div>
                        {item.value&&<img  src={item.value} class="avatar"/>}
                        {!item.value&&<i  class="el-icon-plus avatar-uploader-icon"/>}
                    </div>)
                }
            }
        ]
      };
    },
    mounted(){
        this.fromData.name='11111'
    },
    methods:{
        onChangeFrom(){
            this.fromData.name='what,Fuck'
        },
        onSubmit(validate){
            validate().then(res=>{
                console.log(this.fromData)
                console.log(res)
            })
        }
    }
  };
</script>
```
:::

### 支持类型
| 参数      | 说明 
|---------- |-------------- |
|所有类型	|如：el-input