<template>
	<view class="all">
		<text>请填写您要发布的兼职信息</text>
		<u-form>
			<u-form-item label="结算">
				<u-input v-model="value" type="select" border="border" border-color="#826858" @click="show = true" placeholder="请选择结算方式"/>
				<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
			</u-form-item>
			<u-form-item label="类型">
				<u-input v-model="type" type="select" border="border" border-color="#826858" @click="reshow = true" placeholder="请选择兼职类型"/>
				<u-action-sheet :list="actionSheetList1" v-model="reshow" @click="actionSheetCallback1"></u-action-sheet>
			</u-form-item>
			<u-form-item label="薪资">
				<u-input v-model="price" type="number" border="border" border-color="#826858" placeholder="请输入薪资,根据您选择的结算方式决定"/>
			</u-form-item>
			<u-form-item label="地址">
				<u-input v-model="address" type="text" border="border" border-color="#826858" placeholder="请输入详细工作地址"/>
			</u-form-item>
			<u-form-item label="时间">
				<u-input v-model="time" type="text" border="border" border-color="#826858" placeholder="请输入工作时间,如 周三14:00-20:00"/>
			</u-form-item>
			<u-form-item label="内容">
				<u-input v-model="data" type="textarea" border="border" border-color="#826858" placeholder="请输入详细工作内容"/>
			</u-form-item>
		</u-form>
		<text>工作地点图</text>
		<u-upload :auto-upload="false" ref="uUpload"></u-upload>
		<view class="submit">
			<u-button @click="submit" shape="circle" size="medium">提交</u-button>
		</view>
		<u-toast ref="uToast" type="success"/>
		<u-toast ref="uToast1" type="success"/>
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
					{
						text: '其他'
					},
				]
								}
		},
		onLoad() {
		},
		computed:{
			ifnull:function() {
				if (this.type && this.time && this.address && this.value && this.data && this.price) {
					return false
				} else {
					return true
				}
			}
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
				if (this.ifnull) {
					this.$refs.uToast1.show({
						title:'除图片外所有内容均为必填，请检查',
						type:'error'
					})
				} else {
					uniCloud.callFunction({
						name:'add',
						data:{
							type: this.type,
							time: this.time,
							address: this.address,
							money_type:this.value,
							content: this.data,
							price: '¥' + this.price,
							mission:this.$store.state.mission + 1,
							openid:this.$store.state.openid
						},
						success(res) {
							console.log(res)
							that.$refs.uToast.show({
								title: '上传成功',
								type:'success',
								back:'true'
							})
							that.$store.commit('addmission')
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
										createtime: Date.now(),
										mission:that.$store.state.mission + 1,
										openid:that.$store.state.openid
									},
									success(res) {
										console.log(res)
									}
								})
								console.log(imageUrl)
							}
						})
					})
				}
				
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
	page {
		background: url('http://tiebapic.baidu.com/forum/w%3D580%3B/sign=624318b7b8c379317d688621dbffb645/a8014c086e061d9510c8ed896cf40ad163d9caf1.jpg');
	}
	.all {
		margin: 20rpx;
	}
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
