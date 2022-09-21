module.exports = {
    title: 'Hello VuePress',
    bask:'/emsDocs/',
    description: 'Just playing around',
    theme: 'vdoing',
    // 导航栏
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Part1', link: '/@pages/archivesPage' },
            { text: 'Part2', link: '/@pages/categoriesPage' },
            { text: 'External', link: 'https://google.com' },
        ],
        // 侧边栏
        sidebar: [
            '/@pages/tagsPage',
            '/@pages/archivesPage',
            ['/@pages/categoriesPage', '随便起个标题，会显示在左边栏']
        ]
    }
  }