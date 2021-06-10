export function isArray(data){
    return Array.isArray(data)
}

export function hasOwnProperty(data,key){
    if(!data){
        return false
    }
    return data.hasOwnProperty(key)
}

export function isObject(data){
    return Object.prototype.toString.call(data) === '[object Object]'
}