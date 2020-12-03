<template>
  <div>
      <el-button type="primary" icon="el-icon-plus" @click="addElement">添加分类</el-button>

      <el-table style="width: 100%;margin: 20px 0px;" border :data="tableData">
          <el-table-column label="排序" prop="order"></el-table-column>
          <el-table-column label="分类名称" prop="name"></el-table-column>
          <el-table-column label="创建时间" prop="createTime"></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                  <el-button type="primary" size="small" icon="el-icon-edit" @click="update(scope)">修改</el-button>
                  <el-button type="danger" size="small" icon="el-icon-delete" @click="del(scope)">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
	  
	  <el-pagination
	    background
	    layout="prev, pager, next"
	    :total="count"
		:page-count="totalPage"
		:page-size="pageSize"
		@current-change="getDatas"
		>
	  </el-pagination>
  </div>
</template>

<script>
export default {
    data(){
        return {
            tableData: [] ,//分类的数据
			count: 0, //当前的所有数据量，从数据库查询得到
			p: 1, //记录当前页码
			totalPage: 0, //总页数
			pageSize: 0, //每页条数
        }
    },
	created(){
		//获取数据
		this.getDatas(this.p)
	},
    methods: {
        update(scope){ //修改的方法，参数为要修改的当前对象
            
            this.$prompt('请修改分类名称', '修改分类', {
                confirmButtonText: '修改',
                cancelButtonText: '取消',
                inputValue: scope.row.name
            }).then(({ value }) => {
				
				this.$axios.post('http://127.0.0.1:3000/admin/classify/update',
					{
						id: scope.row._id,
						name: value
					}
				).then(res=>{
					this.$message({
					    message: res.data.message,
					    type: res.data.code == 1 ? 'success' : 'error'
					});
					if(res.data.code == 1){
						// scope.row.name = value //修改的是响应式数据，主要用于页面渲染
						this.getDatas(this.p)
					}
				})

                
            }).catch(() => {
                this.$message({
                    message: `修改失败！`,
                    type: 'error'
                });
            });
        },
        del(scope){ //删除
            this.$confirm(`确定要删除${scope.row.name}吗？`, '删除提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
				
				this.$axios.post('http://127.0.0.1:3000/admin/classify/delete',
					{id: scope.row._id}
				).then(res=>{
					this.$message({
					    message: res.data.message,
					    type: res.data.code == 1 ? 'success' : 'error'
					});
					 if(res.data.code == 1){
						// this.tableData.splice(scope.$index,1)
						this.getDatas(this.p)
						
					}
				})
				
            }).catch(() => {
                         
            });
            
        },
        addElement(){ // 添加分类

            this.$prompt('请输入分类名称', '添加分类', {
                confirmButtonText: '添加',
                cancelButtonText: '取消'
            }).then(({ value }) => {

                this.$axios.post('http://127.0.0.1:3000/admin/classify/add',{
					name: value
				}).then(res => {
					this.$message({
					    message: res.data.message,
					    type: res.data.code == 1 ? 'success' : 'error'
					});
					
					if(res.data.code == 1){
						// this.tableData.push(res.data.result)
						this.getDatas(this.p)
					}
				})

                
            }).catch(() => {

            });
        },
		getDatas(page){ //获取服务端数据，参数为要查看的页面
			this.$axios.get('http://127.0.0.1:3000/admin/classify/find/page',{
				params: {
					p: page
				}
			}).then(res=>{
				this.tableData = res.data.list
				this.count = res.data.count
				this.p = res.data.p
				this.totalPage = res.data.totalPage
				this.pageSize = res.data.pageSize
			})
		}
    }
}
</script>

<style>

</style>