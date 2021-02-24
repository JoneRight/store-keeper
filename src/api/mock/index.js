/**
 * @description 左侧菜单栏选项mock数据，后期根据后台传入
 */
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
                id: 1600,
                parentId: 1000,
                hasChildren: false,
                icon: "icon-jiaoseguanli",
                name: "test",
                spread: false,
                path: "/admin/roletest/index",
                keepAlive: "0",
                permission: null,
                type: "0",
                label: "test",
                sort: 3
              },
              {
                id: 1400,
                parentId: 1000,
                hasChildren: false,
                icon: "icon-mobanshezhi",
                name: "模板设置",
                spread: false,
                path: "/admin/model/index",
                keepAlive: "0",
                permission: null,
                type: "0",
                label: "模板设置",
                sort: 4
              }
            ]
          },
          {
            id: 2000,
            parentId: -2,
            hasChildren: true,
            icon: "icon-kucunguanli",
            name: "库存管理",
            spread: false,
            path: "/stock",
            keepAlive: "0",
            permission: null,
            type: "0",
            label: "库存管理",
            sort: 4,
            children: [
              {
                id: 2100,
                parentId: 2000,
                hasChildren: false,
                icon: "icon-rukudan",
                name: "入库单",
                spread: false,
                path: "/stock/stockIn/index",
                keepAlive: "0",
                permission: null,
                type: "0",
                label: "入库单",
                sort: 5
              },
              {
                id: 2200,
                parentId: 2000,
                hasChildren: false,
                icon: "icon-chukudan",
                name: "出库单",
                spread: false,
                path: "/stock/stockOut/index",
                keepAlive: "0",
                permission: null,
                type: "0",
                label: "出库单",
                sort: 6
              },
              {
                id: 2300,
                parentId: 2000,
                hasChildren: false,
                icon: "icon-xiancunliangchaxun",
                name: "现存量",
                spread: false,
                path: "/stock/stockOnHand/index",
                keepAlive: "0",
                permission: null,
                type: "0",
                label: "现存量",
                sort: 7
              }
            ]
          },
          {
            id: 3000,
            parentId: -3,
            hasChildren: true,
            icon: "icon-baobiaoguanli",
            name: "报表",
            spread: false,
            path: "/report",
            keepAlive: "0",
            permission: null,
            type: "0",
            label: "报表",
            sort: 8,
            children: [
              {
                id: 3100,
                parentId: 3000,
                hasChildren: false,
                icon: "icon-churukuliushui",
                name: "出入库流水账",
                spread: false,
                path: "/report/flowBill/index",
                keepAlive: "0",
                permission: null,
                type: "0",
                label: "出入库流水账",
                sort: 9
              },
              {
                id: 3200,
                parentId: 3000,
                hasChildren: false,
                icon: "icon-kucuntaizhang",
                name: "库存台账",
                spread: false,
                path: "/report/inventoryBook/index",
                keepAlive: "0",
                permission: null,
                type: "0",
                label: "库存台账",
                sort: 10
              }
            ]
          }
        ]
      }
    })
  );
