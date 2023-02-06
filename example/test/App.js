import { h } from '../../lib/guide-vue.esm.js'

export const App = {


  render() {
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'blue']
      },
      // 'hi, sir-' + this.msg
      [h('p', { class: 'red' }, '茅台'), h('p', { class: 'blue' }, '五粮液')]
    )
  },

  setup() {
    return {
      msg: 'lisa'
    }
  }
}
