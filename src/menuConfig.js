// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '探索',
    path: '/FloaterOcean',
    icon: 'compass',
  },
  {
    name: '发送',
    path: '/SendMsg',
    icon: 'forward',
  },
  {
    name: '我的',
    path: '/MyFloater',
    icon: 'yonghu',
  },
  {
    name: '玩法',
    path: '/Intro',
    icon: 'sucai',
  },
];

export { headerMenuConfig, asideMenuConfig };
