<template>
	<view class="container bg-white">
		<view class="bar-box bg-white flex-row flex-center shadow-xs">
			<searchBar></searchBar>
		</view>
		<scroll-view scroll-y="true" class="main">
			<view class="list-array flex-column align-center">
				<view class="industry-item radius-xs margin-top-sm flex-column" 
				v-for="(industryItem, index) in industryList" :key="index">
					<view class="main-name flex-row align-center" @click="activeSelect(index)"
					:class="{selectStyle: currentIndex == index}">
						<text class="margin-left-sm">服务行业</text>
						<text class="fa fa-angle-right"></text>
					</view>
					<view class="name-list flex-column" v-show="currentIndex == index">
						<view class="name-item flex-row align-center" 
						v-for="(nameItem, index1) in industryItem.name_list" :key="index1" 
						@click="nameSelect(index, index1)">
							<text class="margin-left-sm">{{nameItem.name}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import searchBar from '@/components/searchBar.vue';
	export default {
		data() {
			return {
				industryList: [
					{
						name_list: [
							{
								name: '酒店服务员',
							},
							{
								name: '电子厂工人',
							}
						]
					},
					{
						name_list: [
							{
								name: '酒店服务员',
							},
							{
								name: '电子厂工人',
							}
						]
					},
					{
						name_list: [
							{
								name: '酒店服务员',
							},
							{
								name: '电子厂工人',
							}
						]
					}
				],
				currentIndex: -1
			}
		},
		components: {
			searchBar
		},
		methods: {
			activeSelect:function(index) {
				if (this.currentIndex == index) {
					this.currentIndex = -1;
				}
				else {
					this.currentIndex = index;
				}
			},
			nameSelect:function(index, index1) {
				let pages = getCurrentPages();
				let prevPage = pages[1];
				prevPage.$vm.expect_job = this.industryList[index].name_list[index1].name;
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style>
	.bar-box {
		width: 100%;
		height: 100rpx;
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
		line-height: 90rpx;
	}
</style>
