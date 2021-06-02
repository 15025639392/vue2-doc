// import DialogDoc from './docs/dialog.md'
let routers=[
  {
    path: `/pages/component`,
    component:load('component'),
    meta:{
      title: 'page',
      description: 'page',
    },
    children:[
      {
        path: 'dialog',
        component: loadDocs('dialog')
      },
    ]
  },
  // {
  //   path: `/demo/doc`,
  //   component: loadDocs('dialog'),
  //   meta:{
  //     title: 'demo',
  //     description: 'demo',
  //   },
  //   name: 'component-',
  //   children: []
  // }
]
const defaultPath = '/pages/component'
routers = routers.concat([{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}]);


function load(path) {
  return reqiureAsync(`./pages/src/${path}.vue`,'nav')
};

function loadDocs(path) {
  return reqiureAsync(`./docs/${path}.md`,'md-doc')
};

function reqiureAsync(src,name){
  // return () => Promise.resolve(require(src).default)
  return cb => require.ensure([], () =>cb(require(`${src}`),name))
}

// loadView = (view) => { // 路由懒加载
//   return () => Promise.resolve(require(src).default)
// }
export default routers