<template>
  <!-- 库存 ==> 现存量 页面 -->
  <div class="stock-on-hand">
    <el-form
      ref="checkForm"
      :model="checkDetail"
      label-width="80px"
      :rules="checkDetailRules"
      inline
    >
      <el-form-item label="仓库：" prop="stock">
        <el-select
          v-model="checkDetail.stock"
          filterable
          clearable
          placeholder="请选择仓库"
        >
          <el-option
            v-for="item in stockList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="物料编码" prop="materialId">
        <el-input
          v-model="checkDetail.materialId"
          placeholder="请输入物料编码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="物料名称" prop="materialName">
        <el-input
          v-model="checkDetail.materialName"
          placeholder="请输入物料名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('checkForm')"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <avue-crud :data="checkResultList" :option="setTableOption"></avue-crud>
  </div>
</template>

<script>
import { stockList } from "./stockList";

export default {
  name: "index",
  // components: { ComponentName },
  // directives: { DirectiveName },
  data() {
    return {
      checkDetail: {
        stock: "",
        materialId: "",
        materialName: ""
      },
      checkDetailRules: {
        stock: [{ required: true, message: "仓库不能为空", trigger: "change" }],
        materialId: [
          {
            pattern: /^[a-zA-Z0-9/\\-_|*\s]+$/,
            message: "物料编码为数字、字母和符号的组合",
            trigger: "blur"
          }
        ],
        materialName: [
          {
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9./\\-_|*\s]+$/,
            message: "物料名称不支持特殊字符",
            trigger: "blur"
          }
        ]
      },
      stockList: [], //仓库列表
      inventoryList: [], //库存表
      checkResultList: [],
      tableOption: {
        showBorder: true,
        showStripe: true,
        showHeader: true,
        showIndex: true,
        showCheckbox: false,
        showPage: false,
        sizeValue: "small"
      }
    };
  },

//   [
//         {
//           "company": {
//             "chineseName": "企业",
//             "typeId": "001",
//             "value": "青啤公司1"
//           },
//           "warehouseName": {
//             "typeId": 2,
//             "chineseName": "仓库",
//             "value": "青啤仓库1"
//           },
//         }
//   ],
  computed: {
    label(){
        let column = [];
        let obj = this.checkResultList[0];
        for(let prop1 in obj){
            column.push({
                label:obj[prop1].chineseName,
                prop:`${prop1}.value`
            })
        }
        console.log('column========>',column)
        return column;
    },
    // prop(){
    //     return this.checkResultList.map(item=>item.value)
    // },
    setTableOption() {
      return {
        border: this.tableOption.showBorder,
        stripe: this.tableOption.showStripe,
        showHeader: this.tableOption.showHeader,
        index: this.tableOption.showIndex,
        size: this.tableOption.sizeValue,
        selection: this.tableOption.showCheckbox,
        page: this.tableOption.showPage,
        align: "center",
        menuAlign: "center",
        column: this.label
      };
    }
  },
  mounted() {},
  created() {
    this.getStockList();
  },
  methods: {
    getStockList() {
      this.stockList = [
        { name: "cangku1", id: 1 },
        { name: "cangku2", id: 2 },
        { name: "cangku3", id: 3 },
        { name: "cangku4", id: 4 }
      ];
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("验证通过", this.checkDetail);
          // TODO 这里将查询输入的内容传给后台,并获取表格列表数据
          this.checkResultList = JSON.parse(JSON.stringify(stockList));
        } else {
          alert("查询内容输入有误");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
