import Vue from 'vue'
export const store={
    state:{
    },
    setState(data){
        for (const key in data) {
            Vue.set(this.state,key,data[key])
        }
    }
}