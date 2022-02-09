import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/logout',
    component: () => import('@/views/logout'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  // {
  //   path: '',
  //   component: () => import('@/views/ebgmain'),
  //   hidden: true
  // },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/ebgmain'),
        name: '系统首页',
        meta: { title: '系统首页', icon: 'home', noCache: true, affix: true }
      }
    ]
  },
  // {
  //   path: '/charts',
  //   component: Layout,
  //   hidden: true,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/charts/index'),
  //       // props: true,
  //       name: 'charts',
  //       meta: { title: '数据查询', icon: 'charts' }
  //     }
  //   ]
  // },
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
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/invoice',
    component: Layout,
    hidden: true,
    meta: {
        title: "发票管理",
        icon: "invoice"
    },
    children: [
      {
          path: 'statistics',
          component: () => import('@/views/invoice/statistics/index'),
          name: 'Statistics',
          meta: { title: '开票统计' }
      },
      {
        path: 'invoiced',
        component: () => import('@/views/invoice/invoiced/index'),
        name: 'invoided',
        meta: { title: '已开票' }
      },
      {
        path: 'unbilled',
        component: () => import('@/views/invoice/unbilled/index'),
        name: 'unbilled',
        meta: { title: '未开票' }
      },
    ]
  },
  {
      path: '/archives',
      component: Layout,
      hidden: true,
      children: [
          {
              path: '/archives',
              component: () => import('@/views/archives/index'),
              name: 'Archives',
              meta: { title: '保函归档' }
          }
      ]
  },
  {
      path: '/statement',
      component: Layout,
      hidden: true,
      children: [
          {
              path: '/statement',
              component: () => import('@/views/statement/index'),
              name: 'Statement',
              meta: { title: '财务对账' }
          }
      ]
  },
  {
      path: '/termbill',
      component: Layout,
      hidden: true,
      children: [
          {
              path: '/termbill',
              component: () => import('@/views/statement/terminal_bill'),
              name: 'TerminalBill',
              meta: { title: '宝付账单' }
          }
      ]
  },
  {
      path: '/notice',
      component: Layout,
      hidden: true,
      children: [
          {
              path: '/notice',
              component: () => import('@/views/system/notice/index'),
              name: 'Notice',
              meta: { title: '通知公告' }
          }
      ]
  },
  {
      path: '/journal',
      component: Layout,
      hidden: true,
      children: [
          {
              path: 'operate',
              component: () => import('@/views/system/journal/index'),
              name: 'OprJournal',
              meta: { title: '操作日志' }
          },
          {
              path: 'login',
              component: () => import('@/views/system/journal/loginJournal'),
              name: 'LoginJournal',
              meta: { title: '登录日志' }
          },
      ]
  },
  {
    path: '/system',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'monitor',
        component: () => import('@/views/system/monitor/index'),
        name: 'Monitor',
        meta: { title: '接口监控', icon: 'point' }
      },
      {
        path: 'user',
        component: () => import('@/views/system/user/index'),
        name: 'User',
        meta: { title: '用户管理', icon: 'point' }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/index'),
        name: 'Role',
        meta: { title: '角色管理', icon: 'point' }
      },
      {
        path: 'branch',
        component: () => import('@/views/system/branch/index'),
        name: 'Branch',
        meta: { title: '机构管理', icon: 'point' }
      },
      {
        path: 'dict',
        component: () => import('@/views/system/dict/index'),
        name: 'Dict',
        meta: { title: '数据字典', icon: 'point' }
      },
      {
        path: 'feeSetting',
        component: () => import('@/views/system/feeSetting/index'),
        name: 'FeeSetting',
        meta: { title: '阶梯计费', icon: 'point' }
      }
    ]
  },
    {
        path: '/project',
        component: Layout,
        hidden: true,
        meta: {
            title: "项目管理",
            icon: "project"
        },
        children: [
            {
                path: '/project',
                component: () => import('@/views/project/index'),
                name: 'project',
                meta: { title: '项目管理' }
            },
            {
                path: 'approval_pending',
                component: () => import('@/views/project/approval_pending'),
                name: 'approval_pending',
                meta: { title: '待审批' }
            },
            {
                path: 'approved',
                component: () => import('@/views/project/approved'),
                name: 'approved',
                meta: { title: '已审批' }
            },
        ]
    }

]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
