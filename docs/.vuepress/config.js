module.exports = {
    title: 'Hello VuePress',
    bask:'/emsDocs/',
    description: 'Just playing around',
    // theme: 'vdoing',
    // 导航栏
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: '前端手册', link: '/@pages/archivesPage' },
            { text: 'Part2', link: '/@pages/categoriesPage' },
        ],
        // 侧边栏
        sidebar: [
            ['/@pages/tagsPage', 'tagsPage'],
            ['/@pages/archivesPage', '前端手册'],
            ['/@pages/categoriesPage', '随便起个标题，会显示在左边栏']
        ]
    }
  }