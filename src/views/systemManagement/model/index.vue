<!-- template -->
<template>
  <div class="model">
    <basic-container>
      <el-row>
        <el-col :span="6" style='margin-top:15px;'>
          left11
        </el-col>
        <el-col :span="18" style='margin-top:15px;'>
          <!-- 搜索框start -->
          <el-form
            ref="searchForm"
            :model="searchForm"
            label-width="80px"
          >
            <el-row>
              <el-col
                :md="6"
                :xs="24"
              >
                <el-form-item
                  label="企业名称"
                  prop="company"
                >
                  <el-input
                    v-model="searchForm.company"
                    placeholder="企业名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :md="6"
                :xs="24"
              >
                <el-form-item
                  label="编码"
                  prop="code"
                >
                  <el-input
                    v-model="searchForm.code"
                    placeholder="编码"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :md="6"
                :xs="24"
              >
                <el-form-item
                  label="模板名称"
                  prop="name"
                >
                  <el-input
                    v-model="searchForm.name"
                    placeholder="模板名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :md="6"
                :xs="24"
              >
                <el-form-item>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="searchSubmit('searchForm')"
                  >
                    搜索
                  </el-button>
                  <el-button size="mini" @click="clearSearch('searchForm')">
                    清空条件
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 搜索框end -->

          <div style="padding-bottom: 20px">
            <el-button
              type="primary"
              size="mini"
              @click="addOrEditModel"
            >
              添加模板
            </el-button>
            <el-button
              class="btn-import"
              size="mini"
              @click="importExcel"
            >
              模板导入
            </el-button>
            <el-button
              class="btn-export"
              size="mini"
              @click="exportExcel"
            >
              模板导出
            </el-button>
          </div>

          <!-- 模板数据start -->
          <el-table
            v-loading="loading"
            :data="tableData"
            border
            stripe
            highlight-current-row
          >
            <el-table-column
              prop="name"
              align="center"
              label="模板名称">
            </el-table-column>
            <el-table-column
              prop="company"
              align="center"
              label="分配企业">
            </el-table-column>
            <el-table-column
              prop="role"
              align="center"
              label="分配角色">
            </el-table-column>
            <el-table-column
              prop="date"
              align="center"
              label="创建日期">
            </el-table-column>
            <el-table-column
              prop="person"
              align="center"
              label="创建人">
            </el-table-column>
            <el-table-column
              prop="person"
              align="center"
              width="200px"
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.row)"
                >
                  编辑
                </el-button>
                 <el-button
                  class="color-del"
                  type="text"
                  size="small"
                  icon="el-icon-delete"
                  @click="handleClick(scope.row)"
                >
                  删除
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  class="color-distribution"
                  icon="el-icon-c-scale-to-original"
                  @click="handleClick(scope.row)"
                >
                  分配
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page-div">
            <el-pagination
              background
              layout="total, prev, pager, next"
              :page-size="page.pageSize"
              :current-page.sync="page.currentPage"
              :total="page.total">
            </el-pagination>
          </div>
          <!-- 模板数据end -->

          <addModel :modelShow="modelShow" :modelName="modelName" @model-close="closeDialog" @model-refresh="refreshList"></addModel>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import addModel from '@/views/systemManagement/model/components/add-model.vue'
export default {
  name: 'model',
  components: {
    addModel
  },
  data () {
    return {
      searchForm:{
        company: '',
        code: '',
        name: '',
      },// 搜索框数据
      loading: false, // 数据加载
      tableData: [{name:'23'},{name:'23'},{name:'23'},{name:'23'},], // table数据
      page:{
        pageSize: 2,
        total: 10,
        currentPage: 2,
      },// 页码设置
      modelShow: false, // 模态框显示隐藏
      modelName: '',
    };
  },

  computed: {},

  mounted() {},

  methods: {
    // 查询
    searchSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 获取列表，页码设为一
          console.log('enter search')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 清空
    clearSearch(formName) {
      this.$refs[formName].resetFields();
    },
    // 模板导入
    importExcel(){},

    // 模板导出
    exportExcel(){},

    // 模板添加或者编辑
    addOrEditModel(){
      this.modelName=""
      this.modelShow = true
    },

    // 编辑
    handleEdit(){
      this.modelName="模板名称aaa"
      this.modelShow = true
    },

    // 子传父
    closeDialog(val){
      this.modelShow = val
    },

    refreshList(val){
      console.log(val)
    },
  }
}

</script>
<style lang='scss' scoped>
</style>