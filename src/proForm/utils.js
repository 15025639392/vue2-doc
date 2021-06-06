export function isArray(data){
    return Array.isArray(data)
}

export function hasOwnProperty(data,key){
    if(!data){
        return false
    }
    return data.hasOwnProperty(key)
}