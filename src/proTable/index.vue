<script>
import {renderScopeSlot} from './render'
import {store} from './share'
export default {
    name:'pro-table',
    data(){
        return {
            remoteStore:store.state
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
        console.log(this.$scopedSlots)
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
                            filterMethod,
                            ...rest
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
                                        return renderScopeSlot(h,r,props,this.remoteStore)
                                    }
                                }}
                            >
                            </el-table-column>
                        )
                    })
                }
            </el-table>
        )
    }
}
</script>
<style scoped>

</style>