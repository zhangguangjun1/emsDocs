# 前端手册

## 路由访问

通过用户的角色返回相应的菜单路由，前端关键代码： `src/permission.js`

```
//部分代码
// 判断当前用户是否已拉取完user_info信息
store
  .dispatch("GetInfo")
  .then(() => {
    store.dispatch("GenerateRoutes").then((accessRoutes) => {
      // 根据roles权限生成可访问的路由表
      accessRoutes.forEach((route) => {
        if (!isHttp(route.path)) {
          router.addRoute(route); // 动态添加可访问路由表
        }
      });
      next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
    });
  })
  .catch((err) => {
    store.dispatch("LogOut").then(() => {
      ElMessage.error(err != undefined ? err : "登录失败");
      next({ path: "/" });
    });
  });
```

### 可配置项

```
//当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
hidden: true; // (默认 false)
//当设置 noredirect 的时候该路由在面包屑导航中不可被点击
redirect: "noredirect";
name: "router-name"; //设定路由的名字，名称要保持小写这样保证<keep-alive>才会生效
meta: {
  title: "title", //设置该路由在侧边栏和面包屑中展示的名字
  titleKey: '', //国际和翻译key值，如果不为空将使用i18n
  icon: "svg-name", //设置该路由的图标
  noCache: true, //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  breadcrumb: false, // 如果设置为false，则不会在breadcrumb面包屑中显示,
  affix: true // 设置成true表示，tag-view不可删除
}
```

### 添加菜单

并不是所有的菜单都存储到数据库，比如一些公共的菜单就可以直接写到 `src/router/index.js` 里面，如：个人中心页面

```
{
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
    {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', titleKey: 'menu.personalCenter' }
    }]
}
```

### 动态菜单

1. 添加外链
   
    外链菜单路由地址必须带上 `http(s)`，并且外链菜单选择 `是`

2. 内部菜单
- 是否外链：这个选择`否`
- 是否缓存：选择为 `是` 那么切换到其他菜单当前菜单会缓存
- 菜单状态：如果不想在左侧显示，可以选择为 `否`
- 路由地址：这个就是浏览器访问菜单的地址(对于组件名称)
- 组件路径：项目的组件文件的路径 src/views
- 权限字符：拥有该权限才可以访问改菜单/按钮
- 多语言 key：菜单名多语言配置字符串，对于翻译路径 src/i18n(Vue3 才支持)

### 分配菜单

添加完菜单还需要在角色管理中给角色分配菜单

在 系统管理 -> 角色管理 -> 选择对应的角色 -> 更多 -> 菜单权限

### 权限控制

使用权限字符串 v-hasPermi

```
// 单个
<el-button v-hasPermi="['system:user:add']">存在权限字符串才能看到</el-button>
// 多个
<el-button v-hasPermi="['system:user:add', 'system:user:edit']"
  >包含权限字符串才能看到</el-button
>
```

使用角色字符串 v-hasRole

```
// 单个
<el-button v-hasRole="['admin']">管理员才能看到</el-button>
// 多个
<el-button v-hasRole="['role1', 'role2']">包含角色才能看到</el-button>
```

## 开发规范

### 新增 view

在 `src/views` 文件下 创建对应的文件夹，一般性一个路由对应一个文件， 该模块下的功能就建议在本文件夹下创建一个新文件夹，各个功能模块维护自己的 utils 或 components 组件。

### 新增 api

在 `src/api` 文件夹下创建本模块对应的 api 服务。

### 新增组件

在全局的 src/components 写一些全局的组件，如富文本，各种搜索组件，封装的分页组件等等能被公用的组件。 每个页面或者模块特定的业务组件则会写在当前 @/views 下面。 如：`src/views/components/user/xxx.vue` 。这样拆分大大减轻了维护成本。

### 新增样式

在 `src/assets/styles` 文件夹下新增自己的 ui 样式。

## 请求流程

> *TODO* 

## 引用依赖

除了项目正常的使用包，开发中我们还会使用到其他的包比如 mavon-editor  
在终端输入下面的命令完成安装：

```
npm install mavon-editor --save
```

> 加上 --save 参数会自动添加依赖到 package.json 中去。

## 内置组件使用

vue 注册组件有 2 种方式

1. 局部注册 在对应页使用 `components`注册组件。

```
<template>
  <mavon-editor ref="md"></mavon-editor>
</template>

<script>
  import { mavonEditor } from "mavon-editor";
  export default {
    components: { mavonEditor },
    data() {
      return {};
    },
  };
</script>
```

2. 全局注册 在 `src/main.js` 文件下进行注册

```
import { mavonEditor } from "mavon-editor";
Vue.component("mavonEditor", mavonEditor);
```

```
<template>
  <mavon-editor ref="md"></mavon-editor>
</template>
```

### 上传图片

```
<UploadImage v-model="icon" :data="{ uploadType: 1 }" />
```

组件参数说明：

| 参数         | 类型     | 默认值                | 描述                                                | Vue2 | Vue3 |
| ---------- | ------ | ------------------ | ------------------------------------------------- | ---- | ---- |
| column     | string | 无                  | 列字段名                                              |      | X    |
| input      | event  |                    | 上传成功事件                                            |      | X    |
| uploadType | string | /Common/UploadFile | 后端上传地址，可选（/Common/UploadFileAliyun）上传到阿里云，默认上传到本地 |      | X    |
| fileType   | Array  | 上传格式               | 默认(.png, .jpg, .jpeg, .webp)                      |      |      |
| fileSize   | Number | 5                  | 上传大小限制默认(单位 M)                                    |      |      |
| limit      | Number | 5                  | 图片数量限制(单位 M)                                      |      |      |
| data       | Object | 无                  | 上传携带额外请求参数                                        |      |      |

上传成功方法处理

```
//图片上传成功方法
handleUploadSuccess(column, filelist) {
    this.form[column] = filelist;
    console.log(JSON.stringify(this.form), JSON.stringify(filelist))
},
```

### 上传文件

```
<UploadFile ref="uploadRef" v-model="form.icon" />
```

- 组件参数说明：

| 参数         | 类型      | 默认值                       | 描述                             | Vue2 | Vue3 |
| ---------- | ------- | ------------------------- | ------------------------------ | ---- | ---- |
| limit      | Number  | 1                         | 文件数量限制                         |      |      |
| column     | string  | 无                         | 回显 form 列字段名                   |      | X    |
| input      | event   | handleUploadSuccess       | 上传成功事件                         |      | X    |
| uploadType | string  | /Common/UploadFile        | 后端上传地址，默认上传到本地。上传到其他地方         |      | X    |
| fileType   | Array   | .doc, .xls, .ppt, .json 等 | 文件类型, 例如['png', 'jpg', 'jpeg'] |      |      |
| fileSize   | Number  | 5                         | 大小限制(MB)                       |      |      |
| drag       | Boolean | false                     | 是否允许拖拽上传                       |      |      |
| autoUpload | Boolean | true                      | 是否自动上传                         |      |      |
| data       | Object  | 文件上传提交额外字段                | storeType: 1 存储类型 1、本地 2、阿里云   |      |      |

上传成功方法处理

```
//文件上传成功方法
handleUploadSuccess(column, filelist) {
    this.form[column] = filelist;
    console.log(JSON.stringify(this.form), JSON.stringify(filelist))
},
```

### 复制文字

```
<el-button
  class="btn-copy"
  v-clipboard:copy="content"
  v-clipboard:success="copySuccess"
  v-clipboard:error="copyError"
>复制</el-button>

const content = ref('我是复制内容') function copySuccess(){ // 复制成功 }
function copyError(){ // 复制失败 }
```

## 页面缓存(keepAlive)

菜单管理 -> 编辑菜单 ->是否缓存选是 Vue 页面 name(要求小写)和路由地址(无要求)确保相同

```
<script setup name="index">
  ...
</script>
```

## 使用字典

字典管理是用来维护数据类型的数据，如下拉框、单选按钮、复选框、树选择的数据，方便系统管理员维护。主要功能包括：字典分类管理、字典数据管理

2. 加载数据字典

```
<script setup name="index">
// 显示状态选项列表 格式 eg:{ dictLabel: '标签', dictValue: '0'}
const sys_common_status = ref([])
// 性别选项列表 格式 eg:{ dictLabel: '标签', dictValue: '0'}
const sys_user_sex = ref([])

//读取多个字典数据
var dictParams = [{ dictType: 'sys_common_status' }, { dictType: 'sys_user_sex' }]

proxy.getDicts(dictParams).then((response) => {
    response.data.forEach((element) => {
        proxy[element.dictType] = element.list
    })
})
</script>
```

3. 读取数据字典

```
<el-option
  v-for="dict in xxxOptions"
  :key="dict.dictValue"
  :label="dict.dictLabel"
  :value="dict.dictValue"
></el-option>
```

> 注意： 如果你的业务表数据字段类型是 `int` value 值要转换 `:value="parseInt(dict.dictValue)"`

4. table 显示字典数据

```
// 字典标签组件回显
<el-table-column label="我是名称" prop="xxx">
  <template slot-scope="scope">
    <dict-tag :options="xxxOptions" :value="scope.row.xxx" />
  </template>
</el-table-column>

//CheckBox 回显
<dict-tag
  :options="packageIdOptions"
  :value="scope.row.xxx ? scope.row.xxx.split(',') : []"
></dict-tag>
```

5. icon 图标组件使用

```
<svg-icon icon-class="user" />
```

如果使用 element ui 图标在图标前面添加“ele-” 前缀 比如：`<svg-icon name="ele-user" />` 支持 iconfont，将下载的 iconfont 放到 `/src/assets/icons/svg` 目录

## 使用参数

参数设置是提供开发人员、实施人员的动态系统配置参数，不需要去频繁修改后台配置文件，也无需重启服务器即可生效。

1. main.js 中引入全局变量和方法（已存在)

```
import { getConfigKey } from "@/api/system/config";
Vue.prototype.getConfigKey = getConfigKey;
```

2. 页面使用参数

```
this.getConfigKey("参数键值名").then((response) => {
  //response 返回结果{code: 200, msg: "SUCCESS", data: "123456"}
  this.xxx = response.data;
});
```

## 应用路径

有些特殊情况需要部署到子路径下，例如：http://www.xxx.cn/admin 可以按照下面流程修改。

1. 修改 `.env.production` 开发环境修改 `.env.development`

```
# 路由前缀
VUE_APP_ROUTER_PREFIX = '/admin/'
```

2. 修改 nginx 配置

[参考前端部署]

## 日期选项

el-date-picker 使用快捷选项

```
:shortcuts="dateOptions"
```

## 格式化时间格式

- ```
  {{parseTime('传入要格式化的时间', 'YYYY-MM-DD HH:mm:ss')}}
  ```

## 国际化

- js文件中使用 直接使用 `t('message.hello')`

- view 中使用

```
{{ $t('message.hello')}}
```
