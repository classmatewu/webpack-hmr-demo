/**
 * @description 有一个按钮，每一次点击它，页面就会多一个tag，并且偶数个tag会有特殊的背景色
 */
import Vue from 'vue'
import './index.css'
// import createBtn from './name'
import getName from './name'
import App from './VueApp.vue'

let name = getName()
const btn = document.createElement('button')
btn.innerHTML = `hi ${name}, please click to new a tag`
document.body.appendChild(btn)
btn.addEventListener('click', () => {
  const div = document.createElement('div')
  div.innerHTML = 'I am a tag'
  document.body.appendChild(div)
})
// createBtn()

new Vue({
  render: h => h(App)
}).$mount('#app')

console.log(123, module.hot);

/**
 * 有几个疑问：
 * 0. 发现如果单纯js，不引用相关的js loader，也不写下面这段HMR兼容代码，默认是live-reload
 * 1. vue、css文件并不用手动写这段hmr代码，是因为对应的loader帮我们写了，不用我们手动去写
 * 2. 我尝试了两种测试，一是createBtn，插入dom节点，二是getName，获取返回的字符串，但发现后者并没有生效
 * 
 * 其实原因很简单，module.hot.accept没有很神奇，就是一个发布订阅模式，类似EventEmit，等触发相应的事件，这里是更新模块代码
 * 便会去执行事先收集好的函数，所以添加dom事件我们能够看到，而改变了变量值，但原先的页面代码没有更新，所以也就看不到效果
 * 如果watch到的模块发生变化，且没有发现有收集改模块，且dev-server开启了hot功能，便会live-reload
 */
if (module.hot) {
  module.hot.accept('./name', () => {
    // createBtn()
    name = getName()
  })
}