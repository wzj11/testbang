<template>
	<view class="container flex-column align-center bg-white">
		<view class="head-top text-lg shadow-xs">
			<text class="margin-left-sm">已选择 ({{selectNum}} / 3)</text>
		</view>
		<scroll-view scroll-y="true" class="main">
			<view class="list-array flex-column align-center">
				<view class="industry-item radius-xs margin-top-sm flex-column" 
				v-for="(industryItem, index) in industryList" :key="index">
					<view class="main-name flex-row align-center" @click="activeSelect(index)"
					:class="{selectStyle: industryItem.active == true}">
						<text class="margin-left-sm">服务行业</text>
						<text class="fa fa-angle-right"></text>
					</view>
					<view class="name-list flex-column" v-show="industryItem.active == true">
						<view class="name-item flex-row align-center" 
						v-for="(nameItem, index1) in industryItem.name_list" :key="index1" 
						@click="nameSelect(index, index1)">
							<text class="margin-left-sm">{{nameItem.name}}</text>
							<text class="fa fa-check-circle text-blue" v-if="nameItem.select == true"></text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectNum: 0,
				industryList: [
					{
						active: false,
						name_list: [
							{
								name: '酒店服务员',
								select: false
							},
							{
								name: '电子厂工人',
								select: false
							}
						]
					},
					{
						active: false,
						name_list: [
							{
								name: '酒店服务员',
								select: false
							},
							{
								name: '电子厂工人',
								select: false
							}
						]
					},
					{
						active: false,
						name_list: [
							{
								name: '酒店服务员',
								select: false
							},
							{
								name: '电子厂工人',
								select: false
							}
						]
					}
				],
				
			}
		},
		methods: {
			activeSelect:function(index) {
				if (this.industryList[index].active == true) {
					this.industryList[index].active = false;
				}
				else {
					this.industryList[index].active = true;
				}
			},
			nameSelect:function(index, index1) {
				if (this.selectNum == 3 && this.industryList[index].name_list[index1].select == false) {
					uni.showToast({
						title: '最多选择三个',
						icon: 'none',
						duration: 2000
					});
				}
				else {
					if (this.industryList[index].name_list[index1].select == true) {
						this.industryList[index].name_list[index1].select = false;
						this.selectNum--;
					}
					else {
						this.industryList[index].name_list[index1].select = true;
						this.selectNum++;
					}
				}
			},
			
		}
	}
</script>

<style>
	.head-top {
		width: 100%;
		height: 120rpx;
		font-weight: 500;
		line-height: 120rpx;
	}
	
	.main {
		height: calc(100vh - 120rpx);
		width: 100%;
	}
	
	.list-array {
		width: 100%;
		height: auto;
	}
	
	.list-array .industry-item {
		width: 94%;
		height: auto;
		background-color: #F1F2F6;
	}
	
	.list-array .industry-item .main-name {
		width: 100%;
		height: 100rpx;
		position: relative;
		border-radius: 10rpx 10rpx 0 0;
	}
	
	.selectStyle {
		/* border-bottom: 1px solid #606266; */
		background-color: #4B7BEC;
		color: white;
		transition: all .2s linear;
	}
	
	.selectStyle text:last-of-type {
		transform: rotate(90deg);
		transition: all .2s linear;
	}
	
	.list-array .industry-item .main-name text:last-of-type {
		position: absolute;
		right: 20rpx;
	}
	
	.list-array .industry-item .name-list {
		width: 100%;
		height: auto;
	}
	
	.list-array .industry-item .name-list .name-item {
		width: 100%;
		height: 90rpx;
		position: relative;
	}
	
	.list-array .industry-item .name-list .name-item .fa-check-circle {
		position: absolute;
		right: 20rpx;
	}
</style>
