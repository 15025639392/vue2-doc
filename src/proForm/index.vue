<script lang="jsx">
import {wraper} from './render'
const randomKey = Math.random().toString(32).slice(2);
export default {
    name:'pro-form',
    data(){
        return {
            [randomKey]:false
        }
    },
    props: {
        config:{
            type:Array,
            default(){
                return []
            }
        },
        labelWidth: Number,
        rules:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    created(){
        this.validateForm()
    },
    mounted(){
        this.$nextTick(()=>{
            this[randomKey]=true
        })
    },
    methods:{
        validateForm(){
            const fileds={}
            this.config.forEach(o=>{
                // 这里验证每一个子项构造
                if(fileds.hasOwnProperty(o.field)){
                    throw(`配置中含有相同的字段：field:${o.field}`)
                }
                fileds[o.field] = null
            })
        },
        validate() {
            return new Promise((resolve,reject)=>{
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        resolve(this.from)
                    } else {
                        reject()
                    }
                });
            })
        },

        setState(obj,fn){
            console.log('触发了，，，，，', obj)
            if(!this[randomKey]){
                return
            }
            if(!obj){
                throw('请传入正确的结构，正确的表达式为：this.setSatte({name:xxx})')
                return
            }
            for(const key in obj){
                const value = obj[key]
                this.$emit(`update:${key}`,value)
            }
            if(fn){
                this.$nextTick(()=>{
                    fn()
                })
            }
        }
    },
    render(h){
        const {footer,container} = this.$scopedSlots;
        return (
            <div>
                <el-form 
                    ref="form" 
                    model={this.$attrs}
                    labelWidth={this.labelWidth?this.labelWidth+'px':"80px" }
                    rules={this.rules}
                >
                    {
                        this.config.map(item=>{
                            // 隐藏联动条件成立
                            return wraper.call(this,h,item)
                        })
                    }
                </el-form>
                {
                    container&&
                    container({
                        validate:()=>{
                            return this.validate()
                        }
                    })
                }
                {
                    footer&&
                    footer({
                        validate:()=>{
                            return this.validate()
                        }
                    })
                }
            </div>
        )
    }
}
</script>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .upload{
       width: 178px;
    height: 178px;
    display: block;
          border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
</style>