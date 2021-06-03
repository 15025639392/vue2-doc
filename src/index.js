import HelloWord from './demo'
const components = [
    HelloWord
]
const install = function(Vue, opts = {}) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
};

export default {
    install,
    HelloWord
}

