export const getMenuMock = () =>
  new Promise(resolve =>
    resolve({
      data: {
        code: 0,
        msg: null,
        data: [
          {
            id: 1000,
            parentId: -1,
            hasChildren: true,
            icon: "icon-quanxianguanli",
            name: "权限管理",
            spread: false,
            path: "/admin",
            keepAlive: "0",
            permission: null,
            type: "0",
            label: "权限管理",
            sort: 0,
            children: [
              {
                id: 1100,
                parentId: 1000,
                hasChildren: false,
                icon: "icon-yonghuguanli",
                name: "用户管理",
                spread: false,
                path: "/admin/user/index",
                keepAlive: "0",
                permission: null,
                type: "0",
                label: "用户管理",
                sort: 1
              },
              {
                id: 1200,
                parentId: 1000,
                hasChildren: false,
                icon: "icon-caidanguanli",
                name: "菜单管理",
                spread: false,
                path: "/admin/menu/index",
                keepAlive: "0",
                permission: null,
                type: "0",
                label: "菜单管理",
                sort: 2
              },
              {
                id: 1300,
                parentId: 1000,
                hasChildren: false,
                icon: "icon-jiaoseguanli",
                name: "角色管理",
                spread: false,
                path: "/admin/role/index",
                keepAlive: "0",
                permission: null,
                type: "0",
                label: "角色管理",
                sort: 3
              },
              {
                id: 1400,
                parentId: 1000,
                hasChildren: false,
                icon: "icon-web-icon-",
                name: "部门管理",
                spread: false,
                path: "/admin/dept/index",
                keepAlive: "0",
                permission: null,
                type: "0",
                label: "部门管理",
                sort: 4
              },
              {
                id: 1500,
                parentId: 1000,
                hasChildren: false,
                icon: "icon-shejiyukaifa-",
                name: "模板设置",
                spread: false,
                path: "/admin/model/index",
                keepAlive: "0",
                permission: null,
                type: "0",
                label: "模板设置",
                sort: 5
              }
            ]
          }
        ]
      }
    })
  );
