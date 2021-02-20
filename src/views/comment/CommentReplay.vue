<template>
  <div class="article-add">
		<el-form :model="form" ref="form">
			<el-form-item label="姓名">
				<el-input v-model="form.name" :disabled="true"></el-input>
			</el-form-item>
      <el-form-item label="文章" v-if="form.commentArticle">
				<el-input v-model="form.commentArticle.title" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="评论内容">
				<RichText
					:disabled="true"
					:value="form.content"
				/>
			</el-form-item>
      <el-form-item label="评论时间">
				<el-input v-model="form.createTime" :disabled="true"></el-input>
			</el-form-item>
      <el-form-item label="回复评论">
				<RichText
					:value="form.replay"
					@change="this.onRichChange"
				/>
			</el-form-item>
			<el-form-item class="button_wrap">
				<el-button type="primary" @click="replay()">回复</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import Moment from 'moment';
import RichText from '../../components/article/RichText';

export default {
  name: 'CommentReplay',
  data() {
    return {
      form: {}
    };
  },
  components: {
    RichText
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const path = `/api/v1/admin/comment/${this.$route.params.id}`;
			const res = await this.$http.get(path);
			if (res.code === 0) {
				this.form = res.data;
				console.log(Moment.unix(1613698272.123));
				this.form.createTime = Moment.unix(this.form.createTime).format('YYYY-MM-DD HH:mm:ss');
			} else {
				this.$requestStatus(res);
			}
    },
    // 回复评论
    async replay() {
      const path = `/api/v1/admin/comment/${this.$route.params.id}`;
			const postData = {
				replay: this.form.replay
			};
			const res = await this.$http.post(path, postData);
			if (res.code === 0) {
				this.$message({
					message: '回复成功',
					type: 'success'
				});
				this.$router.back();
			} else {
				this.$requestStatus(res);
			}
    },
    onRichChange(value) {
      this.form.replay = value;
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-form-item__content {
  flex: 1;
}
</style>
