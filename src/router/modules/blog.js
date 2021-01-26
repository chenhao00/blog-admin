// 博客管理
const ArticleList = () => import('../../views/article/ArticleList.vue'); // 博客列表
const ArticleEddit = () => import('../../views/article/ArticleEddit.vue'); // 博客新增和编辑
const CommentList = () => import('../../views/comment/CommentList.vue'); // 评论列表
const ClassifyList = () => import('../../views/classify/ClassifyList.vue'); // 分类专栏
const ClassifyEddit = () => import('../../views/classify/ClassifyEddit.vue'); // 分类编辑

const Container = {
  template: `
    <div>
      <router-view></router-view>
    </div>
  `
};

const router = {
  path: '',
  name: 'BlogContainer',
  component: Container,
  meta: {
    title: '博客管理',
    icon: 'document'
  },
  children: [
    {
      path: '/article/articleList',
      name: 'Article',
      component: Container,
      meta: {
        title: '文章管理',
        showChildren: false
      },
      children: [
        {
          path: '/article/articleList',
          name: 'ArticleList',
          component: ArticleList,
          meta: {
            title: '列表'
          }
        },
        {
          path: '/article/articleAdd',
          name: 'ArticleAdd',
          component: ArticleEddit,
          meta: {
            title: '新增'
          }
        },
        {
          path: '/article/articleEddit/:op/:id',
          name: 'ArticleEddit',
          component: ArticleEddit,
          meta: {
            title: '修改'
          }
        }
      ]
    },
    {
      path: '/comment/commentList',
      name: 'Comment',
      component: Container,
      meta: {
        title: '评论管理',
        showChildren: false
      },
      children: [
        {
          path: '/comment/commentList',
          name: 'CommentList',
          component: CommentList,
          meta: {
            title: '列表'
          }
        }
      ]
    },
    {
      path: '/classify/classifyList',
      name: 'Classify',
      component: Container,
      meta: {
        title: '分类专栏',
        showChildren: false
      },
      children: [
        {
          path: '/classify/classifyList',
          name: 'ClassifyList',
          component: ClassifyList,
          meta: {
            title: '列表'
          }
        },
        {
          path: '/classify/classifyEddit',
          name: 'ClassifyEddit',
          component: ClassifyEddit,
          meta: {
            title: '编辑'
          }
        }
      ]
    }
  ]
};

export default router;
