<template>
	<uni-list>
	    <uni-list :border="true" v-for="(item,index) in chatlist" :key="index">
	        <!-- 显示圆形头像 -->
	        <!-- 右侧带角标 -->
	        <uni-list-chat :title="item.name" :avatar="item.avatar" note="您收到一条新的消息" :time="item.time" :badge-text="item.num" to="../messsage/messsage"></uni-list-chat>
	    </uni-list>
	</uni-list>
</template>

<script>
	export default {
	    components: {},
	    data() {
	        return {
	            avatarList: [{
	                url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
	            }, {
	                url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
	            }, {
	                url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
	            }],
							chatlist: [{
								id:1,
								name:"王之君",
								time:"2021-02-02 20:20",
								avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
								num:"10"
								},{
								id:2,
								name:"sasda",
								time:"2021-04-09 20:20",
								avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
								num:"8"
								},{
								id:3,
								name:"我孙",
								time:"2021-02-09 20:20",
								avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
								num:"2"
								}]
	        }
	    }
	}
</script>

<style>
	.chat-custom-right {
	    flex: 1;
	    /* #ifndef APP-NVUE */
	    display: flex;
	    /* #endif */
	    flex-direction: column;
	    justify-content: space-between;
	    align-items: flex-end;
	}
	
	.chat-custom-text {
	    font-size: 12px;
	    color: #999;
	}
</style>
