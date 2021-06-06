import HelloWord from './demo';
import ProForm from './proForm';
import {types} from './proForm/types'
const components = [
    HelloWord,
    ProForm
]
const install = function(Vue, opts = {}) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
    // Vue.prototype.$fieldTypes = fieldTypes
    Vue.prototype.$fieldTypes = types
};
export default {
    install,
    HelloWord,
    ProForm
}