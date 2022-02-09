import request from '@/utils/request'

export function get() {
  return request({
    url: '/api/menuResource/mine',
    method: 'post'
  })
}

// 获取路由
export async function getRouters() {
  const result = await _get()
  return new Promise(resolve => resolve(result))
}

async function _get() {
  // const routers = `[]`
/*
    {
        "name": "Archives",
        "path": "/archives",
        "component": "Layout",
        "children": [
            {
                "name": "Archives",
                "path": "/archives",
                "component": "archives/index",
                "meta": {
                    "title": "保函归档",
                    "icon": "archives"
                }
            }
        ]
    },
 */
  const routers =
    `[
    {
        "name": "Project",
        "path": "/project",
        "redirect": "noRedirect",
        "component": "Layout",
        "alwaysShow": true,
        "meta": {
            "title": "项目管理",
            "icon": "project"
        },
        "children": [
            {
                "name": "Project",
                "path": "/project",
                "component": "project/index",
                "meta": {
                    "title": "项目管理",
                    "icon": "point"
                }
            },
            {
                "name": "approval_pending",
                "path": "approval_pending",
                "component": "project/approval_pending",
                "meta": {
                    "title": "待审批",
                    "icon": "point"
                }
            },
            {
                "name": "approved",
                "path": "approved",
                "component": "project/approved",
                "meta": {
                    "title": "已审批",
                    "icon": "point"
                }
            }
        ]
    },
     {
        "name": "Archives",
        "path": "/archives",
        "component": "Layout",
        "children": [
            {
                "name": "Archives",
                "path": "/archives",
                "component": "archives/index",
                "meta": {
                    "title": "保函归档",
                    "icon": "archives"
                }
            }
        ]
    },
    {
        "name": "Invoice",
        "path": "/invoice",
        "redirect": "noRedirect",
        "component": "Layout",
        "alwaysShow": true,
        "meta": {
            "title": "发票管理",
            "icon": "invoice"
        },
        "children": [
            {
                "name": "Invoiced",
                "path": "invoiced",
                "component": "invoice/invoiced/index",
                "meta": {
                    "title": "已开票",
                    "icon": "point"
                }
            },
            {
                "name": "Unbilled",
                "path": "unbilled",
                "component": "invoice/unbilled/index",
                "meta": {
                    "title": "未开票",
                    "icon": "point"
                }
            },
            {
                "name": "Statistics",
                "path": "statistics",
                "component": "invoice/statistics/index",
                "meta": {
                    "title": "开票统计",
                    "icon": "point"
                }
            }
        ]
    },

    {
        "name": "Statement",
        "path": "/statement",
        "component": "Layout",
        "children": [
            {
                "name": "Statement",
                "path": "/statement",
                "component": "statement/index",
                "meta": {
                    "title": "财务对账",
                    "icon": "statement"
                }
            }
        ]
    },
    {
        "name": "TerminalBill",
        "path": "/termbill",
        "component": "Layout",
        "children": [
            {
                "name": "TerminalBill",
                "path": "/termbill",
                "component": "statement/terminal_bill",
                "meta": {
                    "title": "宝付账单",
                    "icon": "statement"
                }
            }
        ]
    },
    {
        "name": "Notice",
        "path": "/notice",
        "component": "Layout",
        "children": [
            {
                "name": "Notice",
                "path": "/notice",
                "component": "notice/index",
                "meta": {
                    "title": "通知公告",
                    "icon": "notice"
                }
            }
        ]
    },
    {
        "name": "System",
        "path": "/system",
        "redirect": "noRedirect",
        "component": "Layout",
        "alwaysShow": true,
        "meta": {
            "title": "系统管理",
            "icon": "system"
        },
        "children": [
            {
                "name": "Monitor",
                "path": "monitor",
                "component": "system/monitor/index",
                "meta": {
                    "title": "接口监控",
                    "icon": "point"
                }
            },
            {
                "name": "User",
                "path": "user",
                "component": "system/user/index",
                "meta": {
                    "title": "用户管理",
                    "icon": "point"
                }
            },
            {
                "name": "Role",
                "path": "role",
                "component": "system/role/index",
                "meta": {
                    "title": "角色管理",
                    "icon": "point"
                }
            },
            {
                "name": "Branch",
                "path": "branch",
                "component": "system/branch/index",
                "meta": {
                    "title": "机构管理",
                    "icon": "point"
                }
            },
            {
                "name": "Dict",
                "path": "dict",
                "component": "system/dict/index",
                "meta": {
                    "title": "数据字典",
                    "icon": "point"
                }
            },
            {
                "name": "FeeSetting",
                "path": "feeSetting",
                "component": "system/feeSetting/index",
                "meta": {
                    "title": "阶梯计费",
                    "icon": "point"
                }
            }
           
            
        ]
    },
    {
              "name": "Journal",
              "path": "/journal",
              "redirect": "noRedirect",
              "component": "Layout",
              "alwaysShow": true,
              "meta": {
                  "title": "日志管理",
                  "icon": "log"
              },
              "children": [
                  {
                      "name": "OprJournal",
                      "path": "operate",
                      "component": "system/journal/index",
                      "meta": {
                          "title": "操作日志",
                          "icon": "point"
                      }
                  },
                  {
                      "name": "LoginJournal",
                      "path": "login",
                      "component": "system/journal/loginJournal",
                      "meta": {
                          "title": "登录日志",
                          "icon": "point"
                      }
                  }
              ]
          }
]
`;

  const _routers = JSON.parse(routers);

  return new Promise(resolve => {
    get().then(response => {
      const permissions = response.data.map(i => i.permissions);
      if (0 > permissions.indexOf("*:*:*")) {
        // console.log('response.data')
        // console.log(response.data)
        const urls = response.data.map(i => i.url);
        _filter(_routers, urls)
        resolve(_routers)
      } else {
        // console.log('ALL')
        resolve(_routers)
      }
    })
  })
}

function _includes(item, urls) {
  console.log('includes ', item, urls)
  if (item && item.children) {
    _filter(item.children, urls)
    console.log('item.children.length', item.children.length)
    return (0 < item.children.length)
  } else if (item && item.alwaysShow) {
    console.log('alwaysShow')
    return true
  } else if (item && item.path && (-1 < urls.indexOf(item.path))) {
    console.log('path hit')
    return true
  }
  return false;
}

function _filter(r, urls) {
  console.log('filter ', r, urls)
  for (let i = r.length - 1; 0 <= i; i--) {
    if (!_includes(r[i], urls)) {
      console.log('remove ', i, r[i].path)
      r.splice(i, 1)
    }
  }
}
