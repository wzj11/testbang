<template>
	<view>
		<text>请填写您要发布的兼职信息</text>
		<u-form>
			<u-form-item label="结算">
				<u-input v-model="value" type="select" border="border" @click="show = true" placeholder="请选择结算方式"/>
				<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
			</u-form-item>
			<u-form-item label="类型">
				<u-input v-model="type" type="select" border="border" @click="reshow = true" placeholder="请选择兼职类型"/>
				<u-action-sheet :list="actionSheetList1" v-model="reshow" @click="actionSheetCallback1"></u-action-sheet>
			</u-form-item>
			<u-form-item label="薪资">
				<u-input v-model="price" type="number" border="border"  placeholder="请输入薪资"/>
			</u-form-item>
			<u-form-item label="地址">
				<u-input v-model="address" type="text" border="border"  placeholder="请输入详细工作地址"/>
			</u-form-item>
			<u-form-item label="时间">
				<u-input v-model="time" type="text" border="border"  placeholder="请输入工作时间"/>
			</u-form-item>
			<u-form-item label="内容">
				<u-input v-model="data" type="textarea" border="border"  placeholder="请输入详细工作内容"/>
			</u-form-item>
		</u-form>
		<text>工作地点图</text>
		<u-upload :auto-upload="false" ref="uUpload"></u-upload>
		<view class="submit">
			<u-button @click="submit" shape="circle" size="medium">提交</u-button>
		</view>
		<u-toast ref="uToast" type="success"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'',
				name:'',
				address: '',
				data: '',
				price: '',
				time:'',
				type:'',
				imageList:[],
				show:false,
				reshow:false,
				params:{
					province: true,
					city: true,
					area: true
				},
				actionSheetList: [
									{
										text: '日结'
									},
									{
										text: '月结'
									}
								],
				actionSheetList1:[
					{
						text: '安保'
					},
					{
						text: '保洁'
					},
					{
						text: '外卖'
					},
					{
						text: '家教'
					},
				]
								}
		},
		onLoad() {
		},
		methods: {
			image: function() {
				const that = this
				uni.chooseImage({
					count:1,
					success(res) {
						console.log(res)
						if (res.tempFilePaths.length > 0) {
							uni.showLoading({
								title:'上传中...'
							})
							let filepath = res.tempFilePaths[0]
							uniCloud.uploadFile({
								filePath:filepath,
								cloudPath:Date.now() + '.jpg',
								success(res) {
									let imageUrl = res.fileID
									uniCloud.callFunction({
										name:'addImage',
										data:{
											imageUrl: imageUrl,
											createtime: Date.now()
										},
										success(res) {
											console.log(res)
											that.getImage()
										}
									})
								}
							})
						}
					},
					complete() {
						uni.hideLoading()
					}
				})
			},
			actionSheetCallback(index) {
							this.value = this.actionSheetList[index].text;
						},
			actionSheetCallback1(index) {
							this.type = this.actionSheetList1[index].text;
						},
			getaddress:function() {
				console.log(this.params)
			},
			getTimes:function() {
				uniCloud.callFunction({
					name:'gettimes',
					success(res) {
						console.log(res)
					}
				})
			},
			addMsg:function() {
				const that = this
				let files = this.$refs.uUpload.lists
				uniCloud.callFunction({
					name:'add',
					data:{
						type: this.type,
						time: this.time,
						address: this.address,
						money_type:this.value,
						content: this.data,
						price: '¥' + this.price
					},
					success(res) {
						console.log(res)
						that.$refs.uToast.show({
							title: '上传成功',
							type:'success',
							back:'true'
						})
					}
				})
				files.forEach((item) => {
					uniCloud.uploadFile({
						filePath:item.file.path,
						cloudPath:Date.now() + '.jpg',
						success(res) {
							let imageUrl = res.fileID
							uniCloud.callFunction({
								name:'addImage',
								data:{
									imageUrl: imageUrl,
									createtime: Date.now()
								},
								success(res) {
									console.log(res)
								}
							})
							console.log(imageUrl)
						}
					})
				})
			},
			submit:function() {
				const that = this
				that.getTimes()
				that.addMsg()
				console.log(this.$refs.uUpload.lists)
			}
		}
	}
</script>

<style>
.content {
	display: flex;
	flex-direction: row;
}
.photo {
	float: left;
	position: relative;
	width: 33%;
	padding: 14% 0 14%;
	border: 1px solid #000000;
	display: flex;
	align-items: center;
	justify-items: center;
}
image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.submit {
	text-align: center;
}
</style>
