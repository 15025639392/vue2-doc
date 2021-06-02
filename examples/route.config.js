import Component from 'examples/pages/src/component'
let routers=[
  {
    path: `/pages/compoent`,
    // component: load('compoent'),
    component: Component,
    meta:{
      title: 'page',
      description: 'page',
    },
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
const defaultPath = '/pages/compoent'
routers = routers.concat([{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}]);
export default routers

function load(path) {
  return reqiureAsync(`./pages/src/${path}.vue`,'nav')
};

function loadDocs(path) {
  return reqiureAsync(`./docs/${path}.md`,'md-doc')
};

function reqiureAsync(src,name){
  return require(src)
  return cb => require.ensure([], () =>cb(require(src),name))
}
