const _toString = Object.prototype.toString;
function undelineToCamelCase(obj){
    // null, undefined, non-object, function
    if (!obj || typeof obj !== 'object') {
      return obj
    }
    const result = isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}
    for (const key in obj) {
        const element = obj[key];
        const newKey = key.replace(/\_(\w)/g,(word,match)=>{
            return match.toUpperCase()
        })
        result[newKey]=undelineToCamelCase(element)
    }
    return result
}
function middlelineToCamelCase(obj){
    // null, undefined, non-object, function
    if (!obj || typeof obj !== 'object') {
      return obj
    }
    const result = isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}
    for (const key in obj) {
        const element = obj[key];
        const newKey = key.replace(/\-(\w)/g,(word,match)=>{
            return match.toUpperCase()
        })
        result[newKey]=undelineToCamelCase(element)
    }
    return result
}

function isArray(data){
    return Array.isArray(data)
}

function hasOwnProperty(data,key){
    if(!data){
        return false
    }
    return data.hasOwnProperty(key)
}

function isObject(data){
    return _toString.call(data) === '[object Object]'
}

function isFn(data){
    return _toString.call(data) === '[object Function]'
}

export {
    undelineToCamelCase,
    isArray,
    hasOwnProperty,
    isObject,
    isFn,
    middlelineToCamelCase
}