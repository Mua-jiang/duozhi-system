<template>
	<div>
		
		<!-- 发布商品的表单区域 -->
		<div class="add-goods" v-show="active < 3">
			<!-- 步骤条提示 -->
			<el-steps :active="active" finish-status="success" simple>
				<el-step title="选择分类"></el-step>
				<el-step title="设置属性"></el-step>
				<el-step title="编辑详情"></el-step>
			</el-steps>

			<!-- 选择商品分类的区域 -->
			<div class="add-goods-form1" v-show="active == 0">
				<span>选择商品分类：</span>
				<el-select v-model="form.classify" placeholder="请选择">
					<el-option v-for="item in classify" :key="item._id" :label="item.name" :value="item.name">
					</el-option>
				</el-select>
			</div>

			<!-- 填写商品属性的区域 -->
			<div class="add-goods-form2" v-show="active == 1">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="商品标题">
						<el-input v-model="form.title"></el-input>
					</el-form-item>
					<el-form-item label="一口价">
						<el-input v-model="form.price" style="width: 100px;margin-right: 10px;"></el-input>
						<span>元</span>
					</el-form-item>
					<el-form-item label="商品规格">
						<div v-for="(item,index) in form.guige" :key="index" style="margin-bottom: 10px;">
							<span>名称：</span>
							<el-input v-model="item.name" style="width: 200px;margin-right: 10px;"></el-input>
							<span>价格：</span>
							<el-input v-model="item.price" style="width: 100px;margin-right: 10px;"></el-input>
							<span style="margin-right: 20px;">元</span>
							<el-button type="danger" size="mini" icon="el-icon-delete" @click="delguige(index)"></el-button>
						</div>
						<el-button type="primary" @click="addguige">添加规格</el-button>
					</el-form-item>
					<el-form-item label="商品主图">
						<el-upload action="http://127.0.0.1:3000/admin/upload/img" 
								   name="imgfile"
								   list-type="picture-card"
								   :on-success="uploadSuccess"
								   >
							<i slot="default" class="el-icon-plus"></i>
							<div slot="file" slot-scope="{file}">
								<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
								<span class="el-upload-list__item-actions">
									<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
										<i class="el-icon-zoom-in"></i>
									</span>
									<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
										<i class="el-icon-download"></i>
									</span>
									<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
										<i class="el-icon-delete"></i>
									</span>
								</span>
							</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
					<el-form-item label="是否上架">
						<el-tooltip :content="tipText" placement="right">
							<el-switch v-model="form.state"></el-switch>
						</el-tooltip>
					</el-form-item>
				</el-form>
			</div>
			
			<!-- 富文本编辑器区域 -->
			<div class="add-goods-form3" v-show="active == 2">
				<div id="weditor"></div>
			</div>

			<!-- 下一步按钮 -->
			<div class="my-next-btn">
				<el-button type="primary" @click="up" v-show="active > 0">上一步</el-button>
				<el-button :type="btnType" @click="next">{{nextTitle}}</el-button>
			</div>
		</div>

		<!-- 发布成功后的区域 -->
		<div class="add-result" v-show="active >= 3">
			发布成功
			<el-button type="primary" @click="goon">继续发布</el-button>
			<el-button type="success" @click="showGoods">查看商品</el-button>
		</div>

	</div>
</template>

<script>
	import WangEditor from "wangeditor";
	export default {
		data() {
			return {
				active: 0,
				btnType: 'primary', //按钮的样式
				nextTitle: '下一步',
				classify: [], //商品分类
				form: {
					title: '', //商品标题
					mainPic: [], //商品主图
					price: 0, //商品一口价
					state: true, //上下架状态
					guige: [{ //规格
						name: '',
						price: 0
					}],
					classify: '' //商品分类
				},
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false,
				editor: null, //富文本编辑器对象
			}
		},
		created(){
			this.$axios.get('http://127.0.0.1:3000/admin/classify/find').then(res=>{
				this.classify = res.data.list
			})
		},
		computed: {
			tipText() {
				return this.form.state ? "当前商品在售" : "当前商品下架"
			}
		},
		mounted(){
			this.editor = new WangEditor("#weditor")
			//配置富文本编辑器的菜单
			this.editor.config.menus = [
			    'head',
			    'bold',
			    'fontSize',
			    'fontName',
			    'italic',
			    'underline',
			    'strikeThrough',
			    'indent',
			    'lineHeight',
			    'foreColor',
			    'backColor',
			    'link',
			    'list',
			    'justify',
			    'quote',
			    'emoticon',
			    'image',
			    'video',
			    'table',
			    'code',
			    'splitLine',
			    'undo',
			    'redo',
			]
			
			this.editor.create();
		},
		watch: {
			active(i) {
				if (i < 2) {
					this.nextTitle = '下一步'
					this.btnType = 'primary'
				} else {
					this.nextTitle = '发布商品'
					this.btnType = 'success'
				}
			}
		},
		methods: {
			next() {
				//执行下一步操作
				this.active++
				if (this.active == 3) {
					//调用添加商品的接口，发布商品
					
					//获取商品详情
					let text = this.editor.txt.html()
					
					this.$axios.post('http://127.0.0.1:3000/admin/goods/add',{
						title: this.form.title, //商品标题
						mainPic: this.form.mainPic, //商品主图
						price: this.form.price, //商品一口价
						state: this.form.state, //上下架状态
						guige: this.form.guige, //商品规格
						classify: this.form.classify, //商品分类
						content: text
					}).then(res=>{
						console.log(res.data)
					})
					
				}
			},
			up() {
				//上一步
				this.active--
			},
			goon() {
				//继续发布商品
				this.active = 0
			},
			showGoods() {
				this.$router.push({
					name: 'GoodsList',
					params: {
						state: this.form.state ? 1 : 0
					}
				})
			},
			addguige() {
				//添加规格
				this.form.guige.push({
					name: '',
					price: 0
				})
			},
			delguige(index) {
				//删除规格
				this.form.guige.splice(index, 1)
			},
			//主图商品函数
			handleRemove(file) {
				console.log(file);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleDownload(file) {
				console.log(file);
			},
			uploadSuccess(res){
				if(res.imgurl != ''){
					this.form.mainPic.push(res.imgurl)
				}else{
					this.$message({
					    message: '图片上传失败',
					    type: 'error'
					});
				}
			}
		}
	}
</script>

<style scoped>
	.my-next-btn {
		margin: 30px 0px 20px;
		text-align: center;
	}

	.add-goods-form1 {
		margin: 50px 0px;
		text-align: center;
	}

	.add-goods-form2 {
		margin: 50px auto;
		width: 80%;
	}
	.add-goods-form3{
		margin: 50px 0px 20px;
	}
</style>
