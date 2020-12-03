<template>
	<div>
		<!-- <form action="http://127.0.0.1:3000/admin/upload/img" method="POST" enctype="multipart/form-data" >
			<input type="file" name="imgfile">
			<button type="submit">上传</button>
		</form> -->
		
		<!-- <input type="file" @change="upload($event)"> -->
		
		<!-- <img :src="url" width="200px" alt=""> -->
		
		<!-- <div class="body">
			<div class="img-item" v-for="(url,index) in imgs" :key="index">
				<img :src="url" class="mainPic" @mouseenter="isDel=true" @mouseleave="isDel=false" />
				<div v-show="isDel" class="mengban"></div>
				<i v-show="isDel" class="el-icon-delete-solid img-del-icon"></i>
			</div>
			<el-upload v-show="isUpload" action="http://127.0.0.1:3000/admin/upload/img" 
					   name="imgfile" 
					   :limit="5"
					   multiple
					   :show-file-list="false"
					   :on-success="uploadSuccess"
					   :on-exceed="onExceed"
					   >
				<div class="upload-btn">
					<i slot="default" class="el-icon-plus"></i>
				</div>
			</el-upload>
		</div> -->
		
		
		
		<el-upload
		  action="http://127.0.0.1:3000/admin/upload/img"
		  list-type="picture-card"
		  name="imgfile"
		  :on-success="uploadSuccess"
		  >
		  <i class="el-icon-plus"></i>
		  <div slot="file" slot-scope="{file}">
		        <img :src="file.url" style="width: 100%;height: 100%;">
				<span class="el-upload-list__item-actions">
				        <span
				          class="el-upload-list__item-preview"
				          @click="handlePictureCardPreview(file)"
				        >
				          <i class="el-icon-zoom-in"></i>
				        </span>
				        <span
				          class="el-upload-list__item-delete"
				          @click="handleRemove(file)"
				        >
				          <i class="el-icon-delete"></i>
				        </span>
				      </span>
		   </div>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible">
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		
		
	</div>
</template>

<script>
	
	export default {
		data(){
			return {
				imgs: [], //所有的上传图片地址数组
				isUpload: true, //控制是否上传
				isDel: false, //控制是否删除
				dialogImageUrl: '',
				dialogVisible: false
			}
		},
		watch:{
			imgs: {
				handler(arry){
					if(arry.length >= 5){
						this.isUpload = false
					}else{
						this.isUpload = true
					}
				},
				deep: true
			}
		},
		methods: {
			handleRemove(file) {
			   console.log(file);
			},
			handlePictureCardPreview(file) {
			    this.dialogImageUrl = file.url;
			    this.dialogVisible = true;
			},
			uploadSuccess(res){
				let path = res.file.path
				let imgurl = path.substring(path.indexOf('\\'));
				this.imgs.push(`http://127.0.0.1:3000${imgurl}`)
				console.log(this.imgs)
			},
			// onExceed(){
			// 	alert('最多只能上传5张图片')
			// },
			upload(event){
				let file = event.target.files[0]
				
				//限定图片不超过10kb
				// if(file.size > 10240){
				// 	alert("文件不能超过10kb")
				// 	return
				// }
				//限定只能上传图片
				if(!file.type.startsWith('image')){
					alert("只能上传图片")
					return
				}
				// file.name = '100.jpg'
				// console.log(file)
				
				let formDate = new FormData()
				formDate.set('imgfile',file)
				
				this.$axios.post('http://127.0.0.1:3000/admin/upload/img',formDate).then(res=>{
					console.log(res.data.file.path)
					
					let path = res.data.file.path
					let imgurl = path.substring(path.indexOf('\\'));
					this.url = 'http://127.0.0.1:3000'+imgurl
					
				})
			}
		}
	}
	
</script>

<style scoped>
	.upload-btn{
		width: 100px;
		height: 100px;
		border: 1px dashed #aaa;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30px;
	}
	.body{
		display: flex;
	}
	.img-item{
		width: 100px;
		height: 100px;
		margin-right: 10px;
		position: relative;
	}
	.img-item img{
		width: 100%;
		height: 100%;
	}
	.mengban{
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: .4;
		position: absolute;
		top: 0;
		left: 0;
	}
	.img-del-icon{
		position: absolute;
		top: 5px;
		right: 5px;
		color: #fff;
		cursor: pointer;
	}
</style>
