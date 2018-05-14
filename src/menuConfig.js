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
    path: 'https://github.com/kun368/NasFloater/issues/new',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '开发者主页',
    path: 'http://www.zzkun.com',
    external: true,
    newWindow: true,
    icon: 'yonghu',
  },
  {
    name: '下载Chrome插件',
    path: 'https://github.com/ChengOrangeJu/WebExtensionWallet',
    external: true,
    newWindow: true,
    icon: 'key',
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
];

export { headerMenuConfig, asideMenuConfig };
