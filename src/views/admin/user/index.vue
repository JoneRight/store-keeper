
<template>
  <div class="user">
    <basic-container>
      <el-row>
        <el-col :span="6"
                style='margin-top:15px;'>
          <group-tree @getNodeData='selectNode'></group-tree>
        </el-col>
        <el-col :span="18" style='margin-top:15px;'>
          <avue-crud :option="option"
                ref="crud"
                v-model="form"
                :page.sync="page"
                @on-load="getList"
                @size-change="sizeChange"
                @current-change="currentChange"
                :table-loading="listLoading"
                @search-change="handleFilter"
                @refresh-change="handleRefreshChange"
                @row-update="update"
                @row-save="create"
                :before-open="handleOpenBefore"
                :data="list">
        <!-- <template slot="menuLeft">
          <el-button v-if="sys_user_add"
            class="filter-item"
            @click="$refs.crud.rowAdd()"
            type="primary"
            icon="el-icon-edit">添加
          </el-button>
        </template> -->
        <template slot="role"
                  slot-scope="scope">
              {{scope.row.roleName}}
        </template> 
        <template slot="status"
                  slot-scope="scope">
          <el-tag>{{scope.row.statusName}}</el-tag>
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button v-if="sys_user_edit"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row,scope.index)">编辑
          </el-button>
          <!-- <el-button v-if="sys_user_del"
            type="text"
            icon="el-icon-delete"
            @click="deletes(scope.row,scope.index)">删除
          </el-button> -->
        </template>
         <template slot="departmentIdForm"
                  slot-scope="scope">
          <avue-input-tree v-model="form.deptId"
            disabled
            placeholder="请选择所属部门"
            :node-click="getNodeData"
            :dic="treeDeptData"
            :props="defaultProps"></avue-input-tree>
        </template>
        <template slot="roleForm" slot-scope="scope">
          <avue-select v-model="role"
            multiple
            placeholder="请选择角色"
            :dic="rolesOptions"
            :props="roleProps"
          >
          </avue-select>
        </template>
        <template slot="groupForm" slot-scope="scope">
          <el-tree 
            ref="tree"
            node-key="id"
            :data="deviceGroup"
            :check-strictly="true" 
            :default-expanded-keys="defaultExpanded"
            placeholder="请选择内容" 
            show-checkbox
            :props="cascaderProps"
            @check="cascaderChange"
            @node-expand="nodeExpand"
            @node-collapse="nodeCollapse"
          >
          </el-tree>
        </template>
      </avue-crud>
        </el-col>
      </el-row>
      
    </basic-container>
  </div>

</template>

<script>
  import {addObj, delObj, fetchList, putObj, getDeviceGroup, saveGroup} from "@/api/admin/user";
  import {deptRoleList} from "@/api/admin/role";
  import {fetchTree,getObj} from "@/api/admin/dept";
  import {tableOption} from '@/const/crud/admin/user';
  import {mapGetters} from "vuex";
  import GroupTree from '@/components/tree/GroupTree.vue'

  export default {
    name: "table_user",
    components:{
      GroupTree
    },
    data() {
      return {
        option: tableOption,
        treeDeptData: [],
        checkedKeys: [],
        // cascaderProps: {
        //   lazy: true,
        //   label: 'groupName',
        //   value: 'id',
        //   lazyLoad(node, resolve) {
        //     debugger
        //     getDeviceGroup({parentId: node.value?node.value:-1, uucId: this.uucId}).then((res) => {
        //       let data = res.data.data
        //       resolve(data)
        //     })
        //   }
        // },
        roleProps: {
          label: "roleName",
          value: 'roleId',
        },
        defaultProps: {
          children: 'childList',
          label: "name",
          value: 'id',
        }, 
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20, // 每页显示多少条,
          isAsc: false//是否倒序
        },
        list: [],
        listLoading: true,
        role: [],
        form: {roleList:[]},
        rolesOptions: [],  
        sys_user_edit: true,
        sys_user_add: true,
        sys_user_del: true,
        search:{},
        uucId: null,
        deviceGroup: [],
        defaultExpanded: [],
        checkedKeys:[]
      };
    },
    computed: {
      ...mapGetters(["permissions"]),
      cascaderProps() {
        const _this = this
        return {
          // multiple: true,
          // checkStrictly: true,
          label: 'groupName',
          value: 'id',
          // lazyLoad(node, resolve) {
          //   debugger
          //   getDeviceGroup({parentId: node.value?node.value:-1, uucId: _this.uucId}).then((res) => {
          //     let data = res.data.data
          //     data.forEach(item => {
          //       item.leaf = item.groupType === 0 
          //     });
          //     resolve(data)
          //   })
          // }
        }
      }
    },
    watch: {
      role() {
        this.form.role = this.role
      }
    },
    created() { 
      this.sys_user_add = true||this.permissions["sys_user_add"];
      this.sys_user_edit = true||this.permissions["sys_user_edit"];
      this.sys_user_del = true||this.permissions["sys_user_del"];
    },
    methods: {
      getDeviceGroup() {
        getDeviceGroup({uucId: this.uucId}).then((res) => {
          let data = res.data.data
          if (data.checkedIdList) {
            this.defaultExpanded = this.form.group = this.checkedKeys = data.checkedIdList
            this.$nextTick(()=>{
              this.$refs.tree.setCheckedKeys(this.checkedKeys)
            })
          }
          this.deviceGroup = data.tree ? data.tree : []
        })
      },
      nodeExpand(data) {
        this.defaultExpanded.push(data.id)
      },
      nodeCollapse(data) {
        let index = this.defaultExpanded.findIndex((item)=>{
          return data.id === item.id
        })
        this.defaultExpanded.splice(index,1)
      },
      cascaderChange(value,node) {
        let flag = node.checkedKeys.findIndex((key)=>{
          return key === value.id
        }) > -1
        this.form.group = this.checkedKeys = this.$refs.tree.getCheckedKeys()
        this.recursion(this.deviceGroup,value.id,flag)
        this.deviceGroup = this.deviceGroup.concat()
        this.$refs.tree.setCheckedKeys(this.checkedKeys)
      },
      /**
       * 递归级联数据
       */
      recursion(list,value,disabled) {
        for (let i = 0; i < list.length; i++) {
          const items = list[i];
          if (items.id === value) {
            this.recursionChildren(items.children,disabled)
          }else if (items.children && items.children.length>0) {
            this.recursion(items.children,value,disabled)
          }
        }
      },
      recursionChildren(array,disabled) {
        array.forEach(item => {
          item.disabled = disabled
          if (disabled) {
            //说明子节点被选中了要去掉
            let index = this.checkedKeys.findIndex((key)=>{
              return key === item.id
            })
            if (index>-1) {
              this.checkedKeys.splice(index,1)
            }
          }
          if (item.children && item.children.length>0) {
            this.recursionChildren(item.children,disabled)
          }
        });
      },
      getList(page, params) {
        this.listLoading = true;
        fetchList(Object.assign({
          pageNo: page.currentPage,
          pageSize: page.pageSize
        }, params)).then(response => {
          this.listLoading = false
          this.list = response.data.data.records ? response.data.data.records : [];
          this.page.total = response.data.data.totalCount
          this.listLoading = false;
        });
      },
      getNodeData(data) {
        deptRoleList().then(response => {
          this.rolesOptions = response.data.data;
        });
      },
      selectNode(node){
        this.page= {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20, // 每页显示多少条,
          isAsc: false//是否倒序
        };
        this.getList(this.page,{ deptId:''+node.id,...this.search})
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize
      },
      currentChange(current) {
        this.page.currentPage = current
      },
      handleFilter(param, done) {
        this.page.currentPage = 1 
        this.search=param;
        this.getList(this.page, param);
        done()
      },
      handleRefreshChange() {
        this.getList(this.page)
      },
      handleOpenBefore(show, type) {
        window.boxType = type
        // 查询部门树
        fetchTree().then(response => {
          this.treeDeptData = response.data.data
        })
        // 查询角色列表
        deptRoleList().then(response => {
          this.rolesOptions = response.data.data
        })
        // 若是编辑、查看回显角色名称
        try{
          if (['edit', 'views'].includes(type)) {
            // this.role = []
            // for (let i = 0; i < this.form.roleList.length; i++) {
            //   this.role[i] = this.form.roleList[i].roleId;
            // }
          } else if (type === 'add') {
            // 若是添加角色列表设置为空
            this.role = []
          }
        }catch(e){}

        show();
      },
      handleUpdate(row, index) {
        row.deptId = row.departmentId
        this.uucId = row.uucId
        this.role = row.roleIds.split(',').map(i => {
          return parseInt(i)
        })
        this.$refs.crud.rowEdit(row, index);
        this.form.password = undefined
        this.getDeviceGroup()
      },
      async create(row, done, loading) {
        await addObj(this.form).then(() => {
          saveGroup({groupIdList: this.checkedKeys, uucId: this.uucId}).then(res=>{
            this.getList(this.page);
            done();
            this.$notify.success('创建成功')
          }).catch(() => {
            loading();
          });
        }).catch(() => {
          loading();
        });
      },
      update(row, index, done, loading) {
        this.form.nickName = this.form.name
        this.form.phone = this.form.mobile
        putObj(this.form).then(() => {
          saveGroup({groupIdList: this.checkedKeys, uucId: this.uucId}).then(res=>{
            this.getList(this.page);
            done();
            this.$notify.success('修改成功')
          }).catch(() => {
            loading();
          });
        }).catch(() => {
          loading();
        });
      },
      deletes(row) {
        this.$confirm("此操作将永久删除该用户(用户名:" + row.username + "), 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消", type: "warning"
          }
        ).then(() => {
          delObj(row.userId).then(() => {
            this.getList(this.page);
            this.$notify.success('删除成功')
          }).catch(() => {
            this.$notify.error('删除失败')
          });
        });
      }
    }
  };
</script>
