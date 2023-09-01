// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { useBaiduAnalytics } from './baidu-analytics';

const app = createApp(App);

const baiduAnalytics = useBaiduAnalytics();

// 替换为您的百度统计代码
const baiduAnalyticsCode = '
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?74bc2b3d7f859e5236a48b4489592919";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();';

// 插入百度统计脚本
const script = document.createElement('script');
script.src = `https://hm.baidu.com/hm.js?${baiduAnalyticsCode}`;
document.body.appendChild(script);

// 监听路由变化
router.afterEach((to) => {
  baiduAnalytics.push(['_trackPageview', to.fullPath]);
});

app.use(router).mount('#app');
