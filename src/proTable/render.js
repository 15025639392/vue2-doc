import Vue from 'vue'
import {isArray,isObject,isFn,isNormalAction,getCurrentIcon,hasOwnProperty} from './utils';
import {store} from './share'
import s from './style.module.scss'
const h = new Vue().$createElement
export function renderScopeSlot(cloumn,scope,remoteStore,randomKey){
    if(cloumn.getData){
        if(!store.state[randomKey+cloumn.dataIndex]){
            cloumn.getData().then(res=>{
                store.setState({
                    [randomKey+cloumn.dataIndex]:res
                })
            })
            return <div>加载中...</div>
        }
        return cloumn.render.call(this,h,scope,remoteStore[randomKey+cloumn.dataIndex])
    }
    if(cloumn.render){
        return cloumn.render.call(this,h,scope)
    }
    const {row} = scope
    const cell = row[cloumn.dataIndex] //取出单元数据
    if(cloumn.data){
        const tag = cloumn.data[cell] //匹配单元数据
        return tag
    }
    if(cloumn.component){
        cloumn.component
    }
    if(cloumn.isImg){
        return renderImgUrls(row,cloumn)
    }
    return cell
}

// 这里留着参考vue源码后写，先用renderString代替
function renderHTML(){}

export function renderActions(actions,store,action,parent){
    const {permisson} = this?.$route?.meta||{}
    const isFnAction = isFn(actions);
    const isArrayAction = isArray(actions);
    if(!isFn&&!isArray){
        return null
    }
    if(isFn(actions)){
        // 传入的是函数
    }
    if(isArray(actions)){
        // 传入的是数组
        return (<el-table-column
                    key="actions"
                    prop="actions"
                    label="操作"
                    width={action.width}
                    scopedSlots={{
                        default: (props,index) => {
                            return <div>
                                {
                                    action.actions[props.$index].map((r)=>{
                                        const currentIcon = getCurrentIcon(r) // normal 注意，这里有问题，需使用记忆函数来提高性能
                                        const fn = ()=> {
                                            r.onClick&&r.onClick(props)
                                        }
                                        return <el-button type={r.type} size="mini" icon={currentIcon} onClick={fn}>{r.title}</el-button>
                                    })
                                }
                            </div>
                            }
                        }}
                />
                    
        )
    }
}
function renderImgUrls(row,cloumn){
    const imgUrls = row[cloumn.dataIndex]
    if(!imgUrls){
        return null
    }
    if(!isArray(imgUrls)){
        imgUrls = imgUrls.split(',')
    }
    
    return (
        <el-badge value={imgUrls.length} class="img_item item">
                <el-image
                    src={imgUrls[0]}
                    preview-src-list={imgUrls}
                />
                {/* <div class="preview">
                    <i class="el-icon-view"/>
                </div> */}
        </el-badge>
    )

}

export function renderExpand(slots){
    const {expand} = slots||{}
    if(expand){
        return [
            h('el-table-column',{
                attrs:{
                    type:'expand'
                },
                scopedSlots:{
                    default:props=>expand(props)
                }
            })
        ]
    }
    return []
}