<script>
import {wraper} from './render'
import Vue from 'vue';
export default {
    name:'pro-form',
    data(){
        return {
            from:{}
        }
    },
    props: {
        config:{
            type:Array,
            default(){
                return []
            }
        },
        fromData:Object,
        labelWidth: Number,
        rules:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    watch:{
        fromData(){
            this.initForm()
        }
    },
    created(){
        this.initForm()
    },
    methods:{
        initForm(){
            const fileds={}
            this.config.forEach(o=>{
                // 这里验证每一个子项构造
                if(fileds.hasOwnProperty(o.field)){
                    throw(`配置中含有相同的字段：field:${o.field}`)
                }
                fileds[o.field] = this.fromData?this.fromData[o.field]:null
                Vue.set(this.from,o.field,fileds[o.field])
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
        }
    },
    render(h){
        const {footer,container} = this.$scopedSlots;
        return (
            <div>
                <el-form 
                    ref="form" 
                    model={this.from}
                    vBind={this.$attrs}
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
                        formData:this.from,
                        validate:()=>{
                            return this.validate()
                        }
                    })
                }
                {
                    footer&&
                    footer({
                        formData:this.from,
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