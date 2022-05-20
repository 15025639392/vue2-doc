<script>
import {renderScopeSlot, renderActions, renderExpand} from './render'
import {store as share} from './share'
import {calcAction,middlelineToCamelCase} from './utils'
import s from './style.module.scss'
export default {
    name:'pro-table',
    data(){
        return {
            randomKey:Math.random().toString(32).slice(2),
            store:share.state
        }
    },
    props: {
        dataSource:{
            type:Array,
            default(){
                return []
            }
        },
        columns:{
            type:Array,
            default(){
                return []
            }
        },
        actions:{
            type:Array||Function||undefined||null||false,
            default(){
                return undefined
            }
        },
        pagination:{
            type:Object,
            default(){
                return {
                    current:1,
                    pageSize:10
                }
            }
        }
    },
    methods:{
    },
    render(h){
        let action= null
        if(this.actions&&this.dataSource&&this.dataSource.length){
            action = calcAction(this.dataSource,this.actions)
        }
        // 在渲染之前,先将传过来的配置进行分割
        const camelCaseAttrs = middlelineToCamelCase(this.$attrs)
        return (
            h('el-table',{
                ...this.$attrs,
                attrs:{
                    lazy:true,
                    border: true,
                    ...this.$attrs,
                    data:this.dataSource||[],
                }
            },[
                ...renderExpand(this.$scopedSlots),
                this.columns.map((r,i)=>{
                    const {
                        key,
                        dataIndex,
                        title,
                        width,
                        filters,
                        filterMethod,
                        fixed
                    } = r;
                    return h('el-table-column',{
                        attrs:{
                            fixed,
                            key:key||i,
                            prop:dataIndex,
                            label:title,
                            align:'center',
                            className:r.isImg?s.imgrow:'',
                            width,
                            filters,
                            filterMethod,
                        },
                        scopedSlots:{
                            default: props => {
                                return renderScopeSlot.call(this,r,props,this.store,this.randomKey)
                            }
                        }
                    })
                }),
                action&&renderActions(this.actions,this.store,action)
            ])
        )
    }
}
</script>