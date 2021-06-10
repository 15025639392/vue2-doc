import {isArray,isObject,hasOwnProperty} from './utils';
import {store} from './share'
export function renderScopeSlot(h,cloumn,scope,remoteStore){
    if(cloumn.getData){
        if(!store.state[cloumn.dataIndex]){
            cloumn.getData().then(res=>{
                store.setState({
                    [cloumn.dataIndex]:res
                })
            })
        }
        return cloumn.render(h,scope,remoteStore[cloumn.dataIndex])
    }
    if(cloumn.render){
        return cloumn.render(h,scope)
    }
    const {row} = scope
    const cell = row[cloumn.dataIndex] //取出单元数据
    if(cloumn.data){
        const tag = cloumn.data[cell] //匹配单元数据
        return tag
    }
    return cell
}

// 这里留着参考vue源码后写，先用renderString代替
function renderHTML(){}