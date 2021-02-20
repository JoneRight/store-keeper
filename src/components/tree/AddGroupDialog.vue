<template>
    <el-dialog class='add-group-dialog' title="新建" :visible.sync="show" width="400px" @close='cancel' append-to-body>
        <el-form label-position="right" label-width="80px" :rules="rules" :model="form" ref="form">
            <el-form-item label="上级分组" required prop="parentId">
                <el-input v-model="form.parentId" :disabled="formEdit" placeholder="请输入父级节点"></el-input>
            </el-form-item>
            <el-form-item label="节点编号" prop="deptId" v-if="formEdit">
                <el-input v-model="form.deptId" :disabled="formEdit" placeholder="节点编号"></el-input>
            </el-form-item>
            <el-form-item label="分组名称" required prop="name">
                <el-input v-model="form.name" :disabled="formEdit" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="orderNum">
                <el-input type="number" v-model="form.sort" :disabled="formEdit" placeholder="请输入排序"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="ok">{{formStatus == 'update'?'更新':'确定'}}
            </el-button>
            <el-button @click='cancel'>取消</el-button>
        </div>
    </el-dialog>
</template>

<script>

  import { getdetails } from '@/api/admin/dept'
  var validatedeptname = (rule, value, callback) => {
    getdetails(value).then(response => {
      if (window.boxType === 'edit') callback()
      let result = response.data.data
      if (result !== null) {
        callback(new Error('部门已经存在'))
      } else {
        callback()
      }
    })
  }

    export default {
        props: {
            value:{
                type:Object,
                default:()=>({})
            },
            formEdit: {
                type: Boolean,
                default: true,
            },
            formStatus: {
                type: String,
                default: ''
            }
        },
        watch: {
            value:{
                immutable:true,
                handler(){
                    this.form=this.value;
                }
            },
            form: {
                deep:true,
                handler(){
                    this.$emit('input',this.form)
                }
            },
        },
        data() {
            return {
                show: false,
                parentNode: {},
                form:{},
                rules: {
                    parentId: [{
                        required: true,
                        message: '请输入父级节点',
                        trigger: 'blur'
                    }],
                    deptId: [{
                        required: true,
                        message: '请输入节点编号',
                        trigger: 'blur'
                    }],
                    name: [{
                            required: true,
                            message: '请输入部门名称',
                            trigger: 'blur'
                        },
                        {
                            validator: validatedeptname,
                            trigger: 'blur'
                        }
                    ],
                    orderNum: [{
                        required: false,
                        message: '排序值',
                        trigger: 'blur'
                    }, ]
                },
            }
        },
        methods: {
            ok() {
                this.$emit('ok')
            },
            cancel() {
                this.$emit('cancel')
            },
            validate(){
                return new Promise((resolve,reject) => {
                    this.$refs.form.validate((valid) => {
                    if (!valid) reject()
                        resolve()
                    })
                })
            },
            toggle() {
                this.show = true
                return new Promise((resolve, reject) => {;
                    this.$on('ok', () => {
                        this.show = false
                        resolve(this.form)
                        this.$off('ok')
                        this.$off('cancel')
                    })
                    this.$on('cancel', () => {
                        this.show = false
                        reject()
                        this.$off('cancel')
                        this.$off('ok')
                    })
                })
            }
        },
    }
</script>
<style lang='scss'>
    .add-group-dialog {
        .el-dialog__header {
            border-bottom: 1px solid #e0e6ed;
        }
        .custom-info-title {
            .el-alert__title {
                font-size: 16px;
                font-weight: 700;
            }
        }
    }
</style>