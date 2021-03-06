import Vue from 'vue'
import _ from 'underscore';
import Immutable from 'immutable';
import createStore from './vuex/createStore';
import cmsApi from '../cmsApi/index';
import platformWrapper from './components/PlatformWrapper';
window._ = _;
window.Immutable = Immutable;
import VueRouter from 'vue-router'
Vue.use(VueRouter); 
import router from './router';
import './style/less.less';

// router.beforeEach((to, from, next) => {
//   // ...
// })

router.afterEach((to, from) => {
  // ...
  console.log(to);
  createStore.commit('routeChange', { to });
});
createStore.commit('storeRouter', { router });

window.onload = function(){
  new Vue({
    router,
    store: createStore, // 注入到所有子组件1
    el: '#wrapper',
    components: { platformWrapper }
  });
};
