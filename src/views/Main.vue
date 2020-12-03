<template>
  <el-container style="height: 100%">
    <el-header class="my-header">
        <div class="my-sysName">
            <span v-html="systitle"></span>
            <i style="margin-left: 30px;cursor:pointer;" @click="handleCollapse" :class="collapseIcon"></i>
        </div>
        <div class="my-header-right">
            <span>当前用户：</span>
            <span>退出登录</span>
        </div>
    </el-header>
    <el-container>
        <el-aside class="my-aside" :width="`${asideWidth}px`">
                <el-menu
                    :collapse-transition="false"
                    :collapse="isCollapse"
                    :default-active="defaultActive"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    router
                    style="border: 0;"
                    >
					
					<el-menu-item index="/">
					    <!-- <i class="el-icon-menu"></i> -->
					    <i class="iconfont icon-class aside-iconfont"></i>
					    <span slot="title">控制台</span>
					</el-menu-item>
                    
                    <el-menu-item index="/classify">
                        <!-- <i class="el-icon-menu"></i> -->
                        <i class="iconfont icon-class aside-iconfont"></i>
                        <span slot="title">分类管理</span>
                    </el-menu-item>
					
					<el-submenu index="/goods/list/1">
						<template slot="title">
							<i class="iconfont icon-shangpin aside-iconfont"></i>
							<span>商品管理</span>
						</template>
						
						<el-menu-item index="/goods/add">
						    <span slot="title">发布商品</span>
						</el-menu-item>
						<el-menu-item index="/goods/list/1">
						    <span slot="title">在售商品</span>
						</el-menu-item>
						<el-menu-item index="/goods/list/0">
						    <span slot="title">下架商品</span>
						</el-menu-item>
					</el-submenu>

                    

                    <el-menu-item index="/user">
                        <!-- <i class="el-icon-setting"></i> -->
                        <i class="iconfont icon-shangpin aside-iconfont"></i>
                        <span slot="title">用户管理</span>
                    </el-menu-item>
					<el-menu-item index="/setting">
					    <!-- <i class="el-icon-setting"></i> -->
					    <i class="iconfont icon-shangpin aside-iconfont"></i>
					    <span slot="title">网站设置</span>
					</el-menu-item>

                </el-menu>
        </el-aside>
        <el-main style="background-color: #E4E7ED">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    data(){
        return {
            systitle: '萝卜街商城管理系统', //项目标题
            defaultActive: window.location.pathname, //当前默认选中的导航
            isCollapse: false, //控制左侧导航是否展开，false为展开，true为收起
            collapseIcon: 'el-icon-s-fold' ,//头部用于控制导航展开的图标
            asideWidth: 200 , //控制左侧导航区域的宽度
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }, 
      handleCollapse(){ //控制导航收起、展开的事件
        this.isCollapse = !this.isCollapse;
        this.asideWidth = this.isCollapse ? 64 : 200;
        this.collapseIcon = this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold';
        this.systitle = this.isCollapse ? '<img src="/imgs/logo.png" width="35px">' : '萝卜街商城管理系统';
      }
    }
}
</script>

<style scoped>
.my-header{
    background-color: #303133;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.my-sysName{
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
}
.my-header-right{
    width: 250px;
    display: flex;
    justify-content: space-around;
}

/* 左侧导航样式 */
.my-aside{
    background-color: #545C64;
    transition: width .1s;
}

.aside-iconfont{
    margin-right: 5px;
}
</style>