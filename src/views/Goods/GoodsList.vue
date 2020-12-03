<template>
	<div>
		<el-table style="width: 100%;margin: 20px 0px;" border :data="tableData">
		    <el-table-column label="商品标题">
				<template slot-scope="scope">
					<img :src="`http://127.0.0.1:3000${scope.row.mainPic[0]}`" width="50px">
				</template>
			</el-table-column>
		    <el-table-column label="商品标题" prop="title"></el-table-column>
		    <el-table-column label="一口价" prop="price"></el-table-column>
		    <el-table-column label="所属分类" prop="classify"></el-table-column>
		    <el-table-column label="所属分类" prop="classify"></el-table-column>
		    <el-table-column label="操作" width="300">
		        <template slot-scope="scope">
		            <el-button size="mini" @click="changeState(scope)">{{$route.params.state == 0 ? '上架':'下架'}}</el-button>
		            <el-button type="primary" size="mini" icon="el-icon-edit" @click="update(scope)">修改</el-button>
		            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope)">删除</el-button>
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
			this.getDatas(this.p)
		},
		beforeRouteUpdate(to,from,next) {
			this.$axios.get('http://127.0.0.1:3000/admin/goods/find/page',{
				params: {
					p: this.p,
					state: to.params.state
				}
			}).then(res=>{
				// console.log(res.data)
				this.tableData = res.data.list
				this.count = res.data.count
				this.p = res.data.p
				this.totalPage = res.data.totalPage
				this.pageSize = res.data.pageSize
			})
			next()
		},
		methods:{
			getDatas(page,state){ //获取服务端数据，参数为要查看的页面
				this.$axios.get('http://127.0.0.1:3000/admin/goods/find/page',{
					params: {
						p: page,
						state: this.$route.params.state
					}
				}).then(res=>{
					// console.log(res.data)
					this.tableData = res.data.list
					this.count = res.data.count
					this.p = res.data.p
					this.totalPage = res.data.totalPage
					this.pageSize = res.data.pageSize
				})
			},
			update(scope){ //修改的方法，参数为要修改的当前对象
			    
				let goods = scope.row
				
				//把当前要修改的商品存到全局状态，vuex
				this.$store.dispatch('tempSave',goods)
				
				this.$router.push({
					name: 'UpdateGoods'
				})
			    
			},
			del(scope){ //删除
			    this.$confirm(`确定要删除【${scope.row.title}】吗？`, '删除提示', {
			        confirmButtonText: '删除',
			        cancelButtonText: '取消',
			        type: 'warning'
			    }).then(() => {
					
					this.$axios.post('http://127.0.0.1:3000/admin/goods/delete',
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
			changeState(scope){
				//修改上下架状态
				let goods = scope.row
				let state = this.$route.params.state == 1 ? 0:1
				
				this.$axios.post('http://127.0.0.1:3000/admin/goods/update/state',{
					id: goods._id,
					state
				}).then(res=>{
					if(res.data.code == 1){
						this.$message({
						    message: state == 1 ? '上架成功' : '下架成功',
						    type: 'success'
						});
						this.getDatas(this.p)
					}else{
						this.$message({
						    message:  state == 1 ? '上架失败' : '下架失败',
						    type: 'error'
						});
					}
				})
				
			}
		}
	}
</script>

<style>
</style>
