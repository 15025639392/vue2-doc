import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import Element from 'element-ui';
import Components from 'main/index.js'
import hljs from 'highlight.js';
import routes from './route.config';
import demoBlock from './components/demo-block';
import MainHeader from './components/header';
import SideNav from './components/side-nav';
import 'element-ui/packages/theme-chalk/src/index.scss';
import './styles/index.scss';
import './assets/styles/common.css';
import './assets/styles/fonts/style.css';
Vue.use(Element);
Vue.use(Components)
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
const router = new VueRouter({
  mode: 'hash',
  routes
});
router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
});


new Vue({
  ...entry,
  router
}).$mount('#app');
