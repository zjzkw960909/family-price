<template lang="pug">
div
    el-form(:inline="true", :model="addData", style="text-align:left;width:100%")
        el-form-item(label="分账人数")
            el-input(v-model="addData.person", placeholder="填写分账人数")
        el-form-item(label="起止时间")
            el-date-picker(v-model="addData.time",type="daterange",placeholder="选择日期")
        el-form-item
            el-button(type="danger", @click="create") 新建账单
    el-form(:inline="true", :model="addData", style="text-align:left;width:100%")
        el-form-item(label="起止时间")
            el-select(v-model="selectValue", filterable placeholder="请选择")
                el-option(v-for="(v, k) in select",:key="k",:label="v.time",:value="v._id")
        el-form-item
            el-button(type="primary", @click="search") 搜索账单
    div(v-show="show")
        h5 账单计算
        el-form(:inline="true", style="text-align:left;width:100%", v-show="!edit")
            el-form-item(v-for="(v, k) in person", :key="k", v-bind:label="v.name")
                el-input(v-model="v.value", placeholder="个人总计支出")
            el-form-item
                el-button(type="primary", @click="result", :loading="loading") 计算
        el-tag(type="danger" class="total") 总计支出：{{totalMoney}}元
        el-table(:data="tableData", style="width: 100%;text-align:left", stripe, border)
            el-table-column(prop="name", label="姓名")
            el-table-column(prop="havePay", label="已支出")
            el-table-column(prop="shouldPay", label="应支出")
            el-table-column(prop="lackPay", label="还应支出")

</template>

<script>
export default {
    name: 'admin',
    components: {},
    data () {
        return {
            edit: null,
            loading: false,
            show: false,
            addData: {
                person: 4,
                time: ''
            },
            totalMoney: 0,
            defaultPerson: [
                {name: "kevin", value: 0},
                {name: "大奔", value: 0},
                {name: "小糖", value: 0},
                {name: "红中", value: 0}
            ],
            person: [
            ],
            select: [],
            selectValue: '',
            tableData: []
        }
    },
    created () {
        this.init()
    },
    methods: {
        init () {
            let page = this.$route.params.PAGE
            this.initSelect()
            if (page - 0 === 0) {
                this.person = this.defaultPerson
                return
            }
            this.search(page)
        },
        initSelect () {
            this.$http.get('http://localhost:3000/api/price?limit=999').then((res) => {
                if (this.errBack(res)) {
                    return
                }
                this.select = res.data.data
            })
        },
        result () {
            this.loading = true
            let total = 0, ave = 0
            this.person.map((v) => {
                total += Number(v.value)
            })
            ave = total / this.person.length
            this.person.map((v) => {
                v.shouldPay = ave.toFixed(2) + '元'
                v.lackPay = ave.toFixed(2) - v.value + '元'
                v.havePay = Number(v.value).toFixed(2) + '元'
                return v
            })
            this.totalMoney = total
            this.tableData = this.person
            this._post(this.tableData)    
        },
        _post (tableData) {
            let data = {
                data: tableData,
                person: tableData.length,
                time: this._dealDate(this.addData.time[0]) + '-' + this._dealDate(this.addData.time[1]),
                totalMoney: this.totalMoney,
                ave: (this.totalMoney / tableData.length).toFixed(2),
                cTime: new Date().toLocaleDateString()
            }
            if (!this.edit) {
                return this.$http.post('http://localhost:3000/api/price', data).then((res) => {
                    if (this.errBack(res)) {
                        return
                    }
                    this.edit = res.data.data[0]
                    this.initSelect()
                    this.loading = false
                })
            }
            this.$http.put(`http://localhost:3000/api/price/${this.edit}`, data).then((res) => {
                if (this.errBack(res)) {
                    return
                }
                this.edit = res.data.data[0]
                this.loading = false
            })
        },
        errBack (res) {
            if (res.data.err) {
                this.$message('服务器发生了一点错误')
                return true
            }
            return false
        },
        search (e) {
            let id 
            this.addData.time = ''
            if (e && e.toString() && e.toString().length === 24) {
                id = e
            } else {
                id = this.selectValue
            }
            this.$http.get('http://localhost:3000/api/price/' + id).then((res) => {
                if (this.errBack(res)) {
                    return
                }
                let data = res.data.data
                this.edit = data._id
                this.tableData = data.data
                this.totalMoney = data.totalMoney
                this.show = true
            })
        },
        _dealDate (time) {
            let date = new Date(time).toLocaleDateString()
            return date
        },
        _createOption () {
            this.selectValue = ''
            this.tableData = []
            if (this.addData.person - 0 !== 4) {
                let tempArr = Array.from({length: this.addData.person})
                this.person = tempArr.map((v, k) => {
                    v = {
                        name: `老板${k + 1}`,
                        value: 0
                    }
                    return v
                })
            } else {
                this.person = this.defaultPerson
            }
        },
        _check () {
            if (!(this.addData.time && this.addData.time.length === 2 && this.addData.person && (this.addData.person - 0 > 0))) {
                this.$message('请检查是否有漏填项，或所填数据格式错误!')
                return false
            }
            return true
        },
        create (e) {
            if(!this._check()) {
                return
            }
            this.$msgbox({
                title: '提示消息',
                message: '是否创建新账单',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        this.edit = null
                        this._createOption()
                        this.show = true
                        done()
                    } else {
                        done()
                    }
                }
            })
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
