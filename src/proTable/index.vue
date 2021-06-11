<script>
import {renderScopeSlot, renderActions} from './render'
import {store as share} from './share'
import {calcAction} from './utils'
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
    render(){
        let action= null
        if(this.actions&&this.dataSource&&this.dataSource.length){
            action = calcAction(this.dataSource,this.actions)
        }
        // 在渲染之前,先将传过来的配置进行分割
        return (
            <el-table
                data={this.dataSource||[]}
                border
            >
                {
                    this.columns.map((r,i)=>{
                        const {
                            key,
                            dataIndex,
                            title,
                            width,
                            filters,
                            filterMethod
                        } = r;
                        return (
                            <el-table-column
                                key={key||i}
                                prop={dataIndex}
                                label={title}
                                width={width}
                                filters={filters}
                                filterMethod={filterMethod}
                                scopedSlots={{
                                    default: props => {
                                        return renderScopeSlot.call(this,r,props,this.store,this.randomKey)
                                    }
                                }}
                            >
                            </el-table-column>
                        )
                    })
                }
                {
                    renderActions(this.actions,this.store,action)
                }
            </el-table>
        )
    }
}
</script>
<style scoped>

</style>