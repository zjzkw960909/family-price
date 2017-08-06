<template lang="pug">
div
    el-table(:data="tableData", style="width: 100%;text-align:left", stripe, border)
        el-table-column(prop="time", label="时间")
        el-table-column(prop="totalMoney", label="总支出")
        el-table-column(prop="ave", label="人均")
        el-table-column(prop="person", label="分担人数")
        el-table-column(prop="cTime", label="创建时间")
        el-table-column(fixed="right",label="操作",width:160)
            template(scope="scope", lang="pug")
                el-button(type="text", size="small", @click="del(scope)") 删除
                el-button(type="text", size="small", @click="href(scope)") 查看
    el-pagination(style="float:right", layout="prev, pager, next", v-bind:pageCount="pages",  :current-page.sync="page", @current-change="goPage")

</template>

<script>
export default {
    name: 'admin',
    components: {},
    data () {
        return {
            page: 1,
            pages: 1,
            select: [],
            tableData: [],
        }
    },
    created () {
        this.init()
    },
    methods: {
        init () {
            this._getList({params: {}})
        },
        _getList (e) {
            this.$http.get('http://localhost:3001/api/price', e).then((res) => {
                if (this.errBack(res)) {
                    return
                }
                let data = res.data
                this.tableData = data.data.map((v) => {
                    v.ave = v.totalMoney / v.person
                    return v
                })
                this.page = data.page
                this.pages = data.pages
            })
        
        },
        goPage (e) {
            this._getList({params: {page: e}})
        },
        href (e) {
            this.$router.push(`/price/${e.row._id}`)
        },
        del (e) {
            this.$msgbox({
                title: '提示消息',
                message: '确定删除?',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        this.$http.delete(`http://localhost:3001/api/price/${e.row._id}`).then((res) => {
                            if (this.errBack(res)) {
                                return
                            }
                            instance.confirmButtonLoading = false;
                            instance.confirmButtonText = '确定';
                            this.init()
                        })
                        done()
                    } else {
                        done()
                    }
                }
            })
        },
        errBack (res) {
            if (res.data.err) {
                this.$message('服务器发生了一点错误')
                return true
            }
            return false
        },
        _dealDate (time) {
            let date = new Date(time).toLocaleDateString()
            return date
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h5{
    padding:5px;
    margin:0;
}
.total{
    float:left;
    margin-bottom:10px;
}
</style>
