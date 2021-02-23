
<template>
  <div class="user">
    <basic-container>
      <el-row>
        <el-col :span="6"
          style='margin-top:15px;'>
          <template-tree @getNodeData='selectNode'></template-tree>
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
        <template slot="menuLeft">
          <el-button v-if="sys_user_add"
            class="filter-item"
            @click="$refs.crud.rowAdd()"
            type="primary"
            icon="el-icon-edit">添加模板
          </el-button>
          <el-button v-if="sys_user_add"
            class="filter-item"
            @click="$refs.crud.rowAdd()"
            type="primary"
            icon="el-icon-edit">模板分配
          </el-button>
          <el-button v-if="sys_user_add"
            class="filter-item"
            @click="$refs.crud.rowAdd()"
            type="primary"
            icon="el-icon-edit">删除模板
          </el-button>
          <el-button v-if="sys_user_add"
            class="filter-item"
            @click="$refs.crud.rowAdd()"
            type="primary"
            icon="el-icon-edit">模板导入
          </el-button>
          <el-button v-if="sys_user_add"
            class="filter-item"
            @click="$refs.crud.rowAdd()"
            type="primary"
            icon="el-icon-edit">模板分配
          </el-button>
        </template>
        <template slot="role" slot-scope="scope">
          {{scope.row.authorityTypeName}}
        </template> 
        <template slot="status"
          slot-scope="scope">
          <el-tag>{{scope.row.statusName}}</el-tag>
        </template>
        <template slot="menu"
          slot-scope="scope">
          <el-button v-if="sys_user_edit"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row,scope.index)">编辑
          </el-button>
          <el-button v-if="sys_user_del"
            type="text"
            icon="el-icon-delete"
            @click="deletes(scope.row,scope.index)">删除
          </el-button>
          <el-button v-if="sys_user_del"
            type="text"
            icon="el-icon-c-scale-to-original"
            @click="deletes(scope.row,scope.index)">分配
          </el-button>
        </template>
         <template slot="departmentNameForm"
            slot-scope="scope">
          <avue-input-tree v-model="form.deptId"
            placeholder="请选择所属部门"
            :node-click="getNodeData"
            :dic="treeDeptData"
            :props="defaultProps"></avue-input-tree>
        </template>
        <template slot="roleForm"
          slot-scope="scope">
          <avue-select v-model="role"
            multiple
            placeholder="请选择角色"
            :dic="rolesOptions"
            :props="roleProps"></avue-select>
        </template>
      </avue-crud>
        </el-col>
      </el-row>
      
    </basic-container>
  </div>

</template>

<script>
  import {addObj, delObj, fetchList, putObj} from "@/api/admin/model";
  import {deptRoleList} from "@/api/admin/role";
  import {fetchTree,getObj} from "@/api/admin/dept";
  import {tableOption} from '@/const/crud/admin/model';
  import {mapGetters} from "vuex";
  import TemplateTree from '@/components/tree/TemplateTree.vue'

  export default {
    name: "table_user",
    components:{
      TemplateTree
    },
    data() {
      return {
        option: tableOption,
        treeDeptData: [],
        checkedKeys: [],
        roleProps: {
          label: "roleName",
          value: 'roleId'
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
        search:{}
      };
    },
    computed: {
      ...mapGetters(["permissions"])
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
      getList(page, params) {
        this.listLoading = true;
        fetchList(Object.assign({
          pageNo: page.currentPage,
          pageSize: page.pageSize
        }, params)).then(response => {
          this.list = response.data.data.records;
          this.page.total = response.data.data.totalCount
          this.listLoading = false;
        }).catch(err=>{
          this.listLoading = false;
        })
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
            this.role = []
            for (let i = 0; i < this.form.roleList.length; i++) {
              this.role[i] = this.form.roleList[i].roleId;
            }
          } else if (type === 'add') {
            // 若是添加角色列表设置为空
            this.role = []
          }
        }catch(e){}

        show();
      },
      handleUpdate(row, index) {
        this.$refs.crud.rowEdit(row, index);
        this.form.password = undefined
      },
      create(row, done, loading) {
        addObj(this.form).then(() => {
          this.getList(this.page);
          done();
          this.$notify.success('创建成功')
        }).catch(() => {
          loading();
        });
      },
      update(row, index, done, loading) {
        putObj(this.form).then(() => {
          this.getList(this.page);
          done();
          this.$notify.success('修改成功')
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
