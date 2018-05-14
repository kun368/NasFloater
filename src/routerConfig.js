// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterLayout from './layouts/HeaderAsideFooterLayout';
import Home from './pages/Home';
import FloaterOcean from './pages/FloaterOcean';
import MyFloater from './pages/MyFloater';
import SendMsg from './pages/SendMsg';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/',
    layout: HeaderAsideFooterLayout,
    component: Home,
  },
  {
    path: '/FloaterOcean',
    layout: HeaderAsideFooterLayout,
    component: FloaterOcean,
  },
  {
    path: '/MyFloater',
    layout: HeaderAsideFooterLayout,
    component: MyFloater,
  },
  {
    path: '/SendMsg',
    layout: HeaderAsideFooterLayout,
    component: SendMsg,
  },
  {
    path: '*',
    layout: HeaderAsideFooterLayout,
    component: NotFound,
  },
];

export default routerConfig;
