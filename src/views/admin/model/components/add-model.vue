<!-- add-model -->
<template>
  <div class="add-model">
    <el-dialog
      title="模板新增/编辑"
      :visible.sync="modelShow"
      width="80%"
      :before-close="handleClose">

      <div class="name-box">
        <span>模板名称：</span><el-input style="width:200px" v-model="modelNamea"></el-input>
      </div>
      <el-row style="display:flex;justify-content:space-around">
        <el-col :span="5" class="box-left" style="border:1px solid #EBEEF5">
          <span style="display:block;font-size:16px;text-align:center;padding:10px;border-bottom:1px solid #EBEEF5;margin-bottom:10px">请选择</span>
          <el-table :data="data" border ref="selection" @selection-change="checkAll" style="width: 100%">
            <el-table-column type="selection" width="30"> </el-table-column>
            <el-table-column prop="name" label="字段名称" > </el-table-column>
            <el-table-column prop="date" label="显示名称" ></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="2" style="display:flex;flex-direction:column;justify-content:center">
          <el-button icon="el-icon-d-arrow-right" :disabled="nowSelectData.length?false:true" size="mini" type="primary" @click="handelSelect"></el-button>
          <el-button icon="el-icon-d-arrow-left" :disabled="nowSelectRightData.length?false:true" size="mini" type="primary" @click="handleRemoveSelect" style="margin-top:10px;margin-left:0px;"></el-button>
        </el-col>
        <el-col :span="16" class="box-right" style="border:1px solid #EBEEF5;">
          <span style="display:block;font-size:16px;text-align:center;padding:10px;border-bottom:1px solid #EBEEF5;margin-bottom:10px">已选择</span>
          <el-table :data="selectArr" border ref="selection" @selection-change="checkRightAll" style="width: 100%">
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column prop="name" label="字段名称"></el-table-column>
            <el-table-column prop="date" label="显示名称"></el-table-column>
            <el-table-column prop="editFlag" label="是否可编辑">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.editFlag"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="requiredFlag" label="是否必填">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.requiredFlag"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="search" label="是否为搜索条件">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.search"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="computedFlag" label="是否为唯一计算条件">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.computedFlag"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="systemFlag" label="是否系统默认">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.computedFlag"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'add-model',
  props:['modelShow','modelName'],
  data () {
    return {
      tableOption:{
      border: true,
      index: true,
      indexLabel: "序号",
      stripe: true,
      menuAlign: "center",
      editBtn: false,
      delBtn: false,
      searchMenuSpan: 6,
      align: "center",
      addBtn: false,
      viewBtn: true,
      column: [
        {
          label: "角色名称",
          prop: "roleName",
          span: 24,
          search: true,
          rules: [
            {
              required: true,
              message: "角色名称不能为空",
              trigger: "blur"
            },
            {
              min: 3,
              max: 20,
              message: "长度在 3 到 20 个字符",
              trigger: "blur"
            }
          ]
        },
        {
          width: 120,
          label: "角色标识",
          prop: "roleCode",
          span: 24,
          search: true,
          editDisabled: true,
          rules: [
            {
              required: true,
              message: "角色标识不能为空",
              trigger: "blur"
            },
            {
              min: 3,
              max: 20,
              message: "长度在 3 到 20 个字符",
              trigger: "blur"
            }
          ]
        },
        {
          width: 150,
          label: "角色描述",
          prop: "roleDesc",
          overHidden: true,
          span: 24
        },
        {
          label: "创建时间",
          prop: "createTime",
          type: "datetime",
          format: "yyyy-MM-dd HH:mm",
          valueFormat: "yyyy-MM-dd HH:mm:ss",
          editDisplay: false,
          addDisplay: false,
          span: 24
        }
      ]
    },
      data:[{
        date: '11000KV-三站1',
        name: '王小虎1',
        editFlag: false,
        requiredFlag: false,
        search: false,
        computedFlag: false,
        systemFlag: false,
      }, {
        date: '11000KV-三站2',
        name: '王小虎2',
        editFlag: false,
        requiredFlag: false,
        search: false,
        computedFlag: false,
        systemFlag: false,
      }], // mock数据
      nowSelectData: [], // 左边选中列表数据
      nowSelectRightData: [], // 右边选中列表数据
      selectArr:[],  // 右边列表
      modelNamea: ''
    };
  },

  created() {
    },

  components: {},

  watch:{
    modelName(val){
      console.log(val)
      this.modelNamea = val
    }
  },

  computed: {},

  mounted() {},

  methods: {
    // 关闭模态框
    handleClose(){
      this.$emit('model-close', false) //关闭模态框
      this.$emit('model-refresh', false) //是否刷新
    },

    // 确定
    confirm(){
      if(this.selectArr.length > 0){
        // 设定tableOption值
        let tableOption = {
          border: true,
          index: true,
          indexLabel: "序号",
          stripe: true,
          menuAlign: "center",
          editBtn: false,
          delBtn: false,
          searchMenuSpan: 6,
          align: "center",
          addBtn: false,
          viewBtn: true,
          column: this.selectArr
        }
        console.log(tableOption)
        // this.$emit('model-close', false)
        this.$emit('model-refresh', true) 
      }else{
        this.$message.warning('先选择左侧表头数据')
      }
    },
     // 取消
    close(){
      this.$emit('model-close', false)
      this.$emit('model-refresh', true) 
    },

    // 全选
    checkAll(val){
      this.nowSelectData = val;
    },
    checkRightAll(val) {
      this.nowSelectRightData = val;
    },

     // 选中
    handelSelect(){   
      this.selectArr = this.handleConcatArr(this.selectArr, this.nowSelectData) 
      this.handleRemoveTabList(this.nowSelectData,  this.data);
      this.nowSelectData = [];
    },

    // 取消
    handleRemoveSelect() {
      this.data = this.handleConcatArr(this.data, this.nowSelectRightData) 
      this.handleRemoveTabList(this.nowSelectRightData,  this.selectArr);
      this.nowSelectRightData = [];
    },

    handleConcatArr(selectArr, nowSelectData) {
      let arr = [];
      arr = arr.concat(selectArr, nowSelectData);   
      return arr;
    },

    handleRemoveTabList(isNeedArr,  originalArr) {
      if(isNeedArr.length && originalArr.length) {
         for(let i=0; i<isNeedArr.length; i++) {
            for(let k=0; k<originalArr.length; k++) {
              if(isNeedArr[i]["name"] === originalArr[k]["name"]) {
                originalArr.splice(k, 1);   
              }
            }
         }
      }
    },
  }
}

</script>
<style lang='scss'>
  .add-model{
    .el-dialog__body{
      height: 420px;
      overflow: hidden;
      .name-box{
        display:flex;
        justify-content: flex-start;
        align-items: center;
        padding-bottom:10px;
        .el-input{
          padding-left: 16px;
        }
      }
      .el-row{
        height: 330px;
      }
      .box-left,.box-right{
        overflow: auto;
      }
    }
  }
</style>