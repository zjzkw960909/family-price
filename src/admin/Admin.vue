<template lang="pug">
div
    .headerWrapper
        header.header
            .container
                h1 后台
    .contain
        nav
            el-menu(default-active="1",theme="dark",@open="handleOpen",@close="handleClose", class="outHeight")
                el-submenu(index="1")
                    template(slot="title") 价格平分
                    router-link(to="/price/0")
                        el-menu-item(index="1-1") 价格计算
                    router-link(to="/price-list/1")
                        el-menu-item(index="1-2") 账单查询
        article
            .top 小工具
            .pad
                router-view
                       
        



</template>

<script>
export default {
    name: 'admin',
    components: {},
    data () {
        return {
        }
    },
    computed: {
        title () {
        }
    },
    methods: {
        handleOpen () {
        },
        handleClose () {
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headerWrapper{
    height:80px;
}
.header{
    height: 80px;
    background-color: #20a0ff;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 80px;
    z-index: 100;
    position: relative
}
.container{
    padding:0 12px;
}
.header h1{
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: 400
}
.contain{
    display:flex;
    width:100%;
    height:100%;
}
nav{
    width:200px;
    display:inline-block;
}
.outHeight{
    min-height:480px;
}
article{
    flex:1;
    height:100%;
    box-sizing:border-box;
}
.pad{
    padding:10px;
}
.top{
    background:#eef1f6;
    margin-top:10px;
    font-size:15px;
    padding:15px;
    color:#666;
}
</style>
