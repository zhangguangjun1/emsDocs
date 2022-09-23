module.exports = {
    title: 'Hello EMS',
    bask:'/emsDocs/',
    description: 'Just playing around',
    // theme: 'vdoing',
    // 导航栏
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: '前端手册', link: '/@pages/clientManual' },
            { text: '后端手册', link: '/@pages/serveManual' },
        ],
        // 侧边栏
        sidebar: [
            ['/@pages/serveManual', '后端手册'],
            ['/@pages/clientManual', '前端手册'],
            ['/@pages/categoriesPage', '随便起个标题，会显示在左边栏']
        ]
    }
  }