<template>
    <div>
        <el-tree class="filter-tree" :data="treeData" node-key="id" highlight-current :props="defaultTreeProps" :filter-node-method="filterNode" @node-click="getNodeData" default-expand-all>
        </el-tree>
    </div>
</template>

<script>
    import {addObj, delObj, fetchTree, getObj, putObj} from '@/api/admin/dept'
    export default {
        components: {
            // AddGroupDialog: ()=>import('./AddGroupDialog'),
        },
        data() {
            return {
                defaultTreeProps: {
                    children: 'childList',
                    label: 'name'
                },
                listQuery: {
                    name: undefined
                },
                treeData: [],
                currentId: 0,
                showElement: false,        
                form: {
                    name: undefined,
                    orderNum: undefined,
                    parentId: undefined,
                    deptId: undefined
                },
                formStatus: '',
                formEdit: true,
            }
        },
        methods: {
            handlerEdit() {
                if (this.form.deptId) {
                    this.formEdit = false
                    this.formStatus = 'update'
                }
                
                this.$refs.addGroup.toggle().then(data => {
                    console.log(this.form,'????????')
                    this.update()
                }).catch((e) => {
                    this.onCancel()
                })
            },
            handlerAdd() {
                this.$refs.addGroup.toggle().then(data => {
                    this.create();
                }).catch((e) => {
                    this.onCancel()
                })
                this.resetForm()
                this.formEdit = false
                this.formStatus = 'create'
            },
            async update() {
                await this.$refs.addGroup.validate()
                putObj(this.form).then(() => {
                    this.getList()
                    this.$notify({
                    title: '成功',
                    message: '更新成功',
                    type: 'success',
                    duration: 2000
                    })
                })
            },
            onCancel() {
                this.formEdit = true
                this.formStatus = ''
            },
            resetForm() {
                this.form = {
                    parentId: this.currentId,
                }
            },
            handleDelete() {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delObj(this.currentId).then(() => {
                        this.getList()
                        this.resetForm()
                        this.onCancel()
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success',
                            duration: 2000
                        })
                    })
                })
            },
            getList() {
                fetchTree(this.listQuery).then(response => {
                 this.treeData = response.data.data
                })
            },
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            getNodeData(data) { 
                this.$emit('getNodeData',data)
                if (!this.formEdit) {
                    this.formStatus = 'update'
                }
                getObj(data.id).then(response => {
                    this.form = response.data.data
                })
                this.currentId = data.id
                this.showElement = true
            },
            async create() {
                await this.$refs.addGroup.validate();
                addObj(this.form).then(() => {
                    this.getList()
                    this.$notify({
                        title: '成功',
                        message: '创建成功',
                        type: 'success',
                        duration: 2000
                    })
                })
            },
        },
        created(){
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>

</style>