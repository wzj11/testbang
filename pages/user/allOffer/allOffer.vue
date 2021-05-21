<template>
	<view class="container">
		
		<!-- 顶部菜单栏 -->
		<view class="head-tab grid col-4 bg-white">
			<view class="tab-item" v-for="(tabItem, index) in tabList" :key='index'
			:class="{active: currentIndex == index}" @click="tabSelect(index)">
				<text class="text-bold">{{tabItem}}</text>
			</view>
		</view>
		
		<!-- 列表渲染区域 -->
		<scroll-view scroll-y="true" class="main">
			<view class="offer-list flex-column align-center">
				<card v-for="(offerItem, index) in currentList" :key="index"
				:jobName="offerItem.job_name"
				:jobSalary="offerItem.job_salary"
				:tagList="offerItem.job_tag"
				:place="offerItem.job_place"
				:userAvatar="offerItem.user_avatar"
				:userName="offerItem.user_name"
				:date="offerItem.job_date"
				:offerDate="offerItem.offer_date">
				</card>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import card from '@/components/card.vue';
	
	export default {
		data() {
			return {
				currentIndex: 0,
				tabList: ['全部', '已投递', '待面试', '未通过'],
				currentList: [
					{
						job_name: '欧菲光电子厂流水线工人',
						job_salary: '3-4K',
						job_tag: [
							{
								name: '经验不限'
							},
							{
								name: '无限一金'
							},
							{
								name: '带薪休假'
							},
							{
								name: '八小时工作制'
							}
						],
						job_place: '南昌市青山湖区',
						user_name: '杨先生 人事部经理',
						user_avatar: '../static/success.png',
						job_date: '2020-09-02',
						offer_date: '2020-09-06 12:45'
					},
					{
						job_name: '欧菲光电子厂流水线工人',
						job_salary: '3-4K',
						job_tag: [
							{
								name: '经验不限'
							},
							{
								name: '无限一金'
							},
							{
								name: '带薪休假'
							},
							{
								name: '八小时工作制'
							}
						],
						job_place: '南昌市青山湖区',
						user_name: '杨先生 人事部经理',
						user_avatar: '../static/success.png',
						job_date: '2020-09-02',
						offer_date: '2020-09-06 12:45'
					},
					{
						job_name: '欧菲光电子厂流水线工人',
						job_salary: '3-4K',
						job_tag: [
							{
								name: '经验不限'
							},
							{
								name: '无限一金'
							},
							{
								name: '带薪休假'
							},
							{
								name: '八小时工作制'
							}
						],
						job_place: '南昌市青山湖区',
						user_name: '杨先生 人事部经理',
						user_avatar: '../static/success.png',
						job_date: '2020-09-02',
						offer_date: '2020-09-06 12:45'
					},
					{
						job_name: '欧菲光电子厂流水线工人',
						job_salary: '3-4K',
						job_tag: [
							{
								name: '经验不限'
							},
							{
								name: '无限一金'
							},
							{
								name: '带薪休假'
							},
							{
								name: '八小时工作制'
							}
						],
						job_place: '南昌市青山湖区',
						user_name: '杨先生 人事部经理',
						user_avatar: '../static/success.png',
						job_date: '2020-09-02',
						offer_date: '2020-09-06 12:45'
					},
				],
				
			}
		},
		components: {
			card
		},
		onLoad(e) {
			this.currentIndex = e.index;
		},
		methods: {
			tabSelect:function(index) {
				this.currentIndex = index;
			},
			
		}
	}
</script>

<style>
	.head-tab {
		width: 100%;
		height: 100rpx;
	}
	
	.head-tab .tab-item {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		position: relative;
	}
	
	.head-tab .active {
		color: #4B7BEC;
	}
	
	.head-tab .active::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 8rpx;
		background-color: #4B7BEC;
		top: 92rpx;
		left: 50%;
		transform: translate(-50%);
		border-radius: 8rpx;
	}
	
	.main {
		height: calc(100vh - 100rpx);
	}
	
	.main .offer-list {
		width: 100%;
		height: auto;
	}
	
	card:last-of-type {
		margin-bottom: 30rpx;
	}
</style>
