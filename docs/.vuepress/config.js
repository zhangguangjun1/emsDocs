module.exports = {
    title: 'EMS',
    bask:'/emsDocs/',
    description: '变形😊',
    // theme: 'vdoing',
    // 导航栏
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Part1', link: '/@pages/archivesPage' },
            { text: 'Part2', link: '/@pages/categoriesPage' },
        ],
        // 侧边栏
        sidebar: [
            ['/@pages/tagsPage','tagsPage'],
            ['/@pages/archivesPage','archivesPage'],
            ['/@pages/categoriesPage', '随便起个标题']
        ],
        // 滚动
        smoothScroll: true,
        // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
        // nextLinks: false,
        // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
        // prevLinks: false
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: 'zhangguangjun1/emsDocs',
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        repoLabel: '查看源码',

        // 以下为可选的编辑链接选项

        // 假如你的文档仓库和项目本身不在一个仓库：
        // docsRepo: 'vuejs/vuepress',
        // 假如文档不是放在仓库的根目录下：
        // docsDir: 'docs',
        // 假如文档放在一个特定的分支下：
        // docsBranch: 'master',
        // 默认是 false, 设置为 true 来启用
        // editLinks: true,
        // 默认为 "Edit this page"
        // editLinkText: '帮助我们改善此页面！'
    }
  }