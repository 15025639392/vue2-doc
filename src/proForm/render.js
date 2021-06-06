import {types} from './types'
import {isArray,hasOwnProperty} from './utils'
// 渲染每一个子项目
export function renderItem(h,item){
    const {field,value,...rest} = item
     // 隐藏联动条件成立
     if(item.hide&&item.hide.call(this,this.from)){
        return null
    }
    return (
        <el-form-item label={item.label} prop={item.field}>
            {
                h(
                    item.type,
                    {
                        ...rest,
                        props:{
                            value: this.from[item.field]
                        },
                        ...buildAttrs.bind(this)(item),
                        on:{
                            input:(v)=>{
                                this.from[item.field]=v
                                console.log(this.from)
                                this.$emit('onFormDataChange',{
                                    key:item.field,
                                    value:v,
                                    fromData:this.from
                                })
                                item.onChange.bind(this)(this.from)
                            }
                        }
                    },
                    renderChilren.bind(this)(h,item)
                )
            }
        </el-form-item>
    )
}

// 获取元素属性构造
function buildAttrs(config){
    const {maxlength,showlimit} = config;
    let showWord = !(config?.attrs?.['show-word-limit']===false||showlimit===false)
    let attrs={
        maxlength,
        'show-word-limit': showWord,
        ...config.attrs,
        disabled:config.disabled&&config.disabled(this.from)===true,
    }
    if(hasOwnProperty(config.attrs,'remoteMethod')){
        const {remoteMethod} = config.attrs
        attrs.remoteMethod=(query)=>{
            return remoteMethod.bind(this)(query,config)
        }
        Object.assign(attrs,{
            // multiple:true,
            filterable:true,
            remote:true
        })
    }
    return {
        attrs
    }
}

function renderChilren(h,item){
    if(item.render){
        return [item.render.call(this,h,this.from,item)]
    }
    if(item.type===types.isSelect){
        if(isArray(item.data)){
            // 初始数据渲染
            return renderOptions(h,item.data)
        }
        return []
    }
}
// 渲染下拉框的 options
function renderOptions(h,data){
    if(!data){
        return []
    }
    return data.map(o=>(
        <el-option
            key={o.value}
            label={o.label}
            value={o.value}
        >
        </el-option>
    ))
}

export function wraper(h,item){
    const $scopedSlots = this.$scopedSlots;
    const slot = item.slotName
    if(slot){
        const scopeSlot = $scopedSlots[slot]
        return (<div>
            {
                scopeSlot&&
                scopeSlot({
                    formData:this.from,
                    validate:()=>{
                        return this.validate()
                    }
                })
            }
            {
                renderItem.call(this,h,item)
            }
        </div>)
    }
    return renderItem.call(this,h,item)
}