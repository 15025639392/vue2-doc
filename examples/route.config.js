import navs from './nav.config.json'
let routers=[]
const defaultPath = '/pages/component'
routers = routers.concat([{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}]);

const baseRouterConfig = {
  path: `/pages/component`,
  component:load('component'),
  redirect:'/pages/component/dialog',
  children:[]
}

routers.push(baseRouterConfig)

// 将自动通过命令生成的route配置文件组装成对应路由
function buildNavs(navs){
  let docRouters = []
  for (const item of navs) {
    if(item.path){
      const componentName = item.path.slice(1)
      docRouters.push({
        path:componentName,
        component: loadDocs(componentName)
      })
    }
    if(item.children){
      docRouters.push(...buildNavs(item.children))
    }
    if(item.groups){
      docRouters.push(...buildNavs(item.groups))
    }
    if(item.list){
      docRouters.push(...buildNavs(item.list))
    }
  }

  return docRouters
}

baseRouterConfig.children.push(...buildNavs(navs))

function load(path) {
  return reqiureAsync(`./pages/src/${path}.vue`,'nav')
};

function loadDocs(path) {
  return reqiureAsync(`./docs/${path}.md`,'md-doc')
};

function reqiureAsync(src,name){
  return cb => require.ensure([], () =>cb(require(`${src}`),name))
}
export default routers