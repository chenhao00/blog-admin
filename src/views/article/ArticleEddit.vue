<template>
  <div class="article-add">
		<el-form :model="form" ref="form" :rules="rules" v-loading="loading">
			<el-form-item label="文章标题" prop="title" class="width-wrap">
				<el-input v-model="form.title" :disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="文章内容" prop="contents" class="width-wrap">
				<RichText
					:disabled="disabled"
					:value="form.contents"
					@change="this.onRichChange"
				/>
			</el-form-item>
			<el-form-item label="文章标签" prop="tag">
				<Tags
					:initData="form.articleTags"
					:disabled="disabled"
					@closeTag="closeTag">
				</Tags>
				<el-popover
					placement="top"
					width="400"
					trigger="click">
					<PopoverText
						@addTag="addTag"
						:overTagNum="overTagNum"
						ref="tagChild">
					</PopoverText>
					<el-button icon="el-icon-plus" size="small" slot="reference" :disabled="disabled">添加标签</el-button>
				</el-popover>
			</el-form-item>
			<el-form-item label="文章分类" prop="classify">
				<div class="tag-wrap">
					<el-tag
						v-if="Boolean(form.classifyName)"
						:closable="!disabled"
						@close="closeClassify">
						{{form.classifyName}}
					</el-tag>
					<el-input
						class="classify-input"
						v-else-if="classifyVisible"
						v-model="classifyValue"
						ref="saveClassifyInput"
						size="small"
						@keyup.enter.native="handleClassifyConfirm"
						@blur="handleClassifyConfirm"
						v-focus
					>
					</el-input>
					<el-button
						v-else
						icon="el-icon-plus"
						size="small"
						@click="showClassifyInput"
						:disabled="disabled">
						新建分类专栏
					</el-button>
				</div>
				<div class="classify-wrap">
					<el-checkbox-group v-model="classifyData" :disabled="Boolean(form.classifyName) || disabled" @change="classifyChange">
						<el-checkbox v-for="item in classifyList" :key="item.id" :label="item.name">{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</div>
			</el-form-item>
			<el-form-item label="文章类型" prop="mode">
				<el-select v-model="form.mode" :disabled="disabled">
					<el-option
						v-for="item in modeOptions"
						:key="item.id"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="发布形式" prop="way">
				<el-radio-group v-model="form.way" :disabled="disabled">
					<el-radio :label="1">公开</el-radio>
					<el-radio :label="2">私密</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item class="button_wrap" v-if="!disabled">
				<el-button type="primary" @click="submit('form')" v-if="articleId">修改</el-button>
				<el-button type="primary" @click="submit('form')" v-else>添加</el-button>
			</el-form-item>
			<el-form-item class="button_wrap" v-else>
				<el-button type="primary" @click="$router.back()">返回</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import RichText from '../../components/article/RichText';
import PopoverText from '../../components/article/PopoverText';
import Tags from '../../components/article/Tags';

export default {
	name: 'ArticleEddit',
	data() {
		return {
			form: {
				title: '',
				contents: '',
				articleTags: [],
				mode: null,
				way: null,
				classifyName: ''
			},
			modeOptions: [
				{ label: '原创', value: 1 },
				{ label: '转载', value: 2 }
			],
			rules: {
				title: [
					{ required: true, message: '请填写标题', trigger: 'blur' }
				],
				contents: [
					{ required: true, message: '请填写文本', trigger: 'blur' }
				],
				mode: [
					{ required: true, message: '请选择文章类型', trigger: 'blur' }
				],
				way: [
					{ required: true, message: '请选择发布形式', trigger: 'blur' }
				]
				// classify: [
				// 	{ required: true, message: '请选择文章分类', trigger: 'blur' }
				// ]
			},
			articleId: null,
			disabled: false,
			loading: false,
			overTagNum: false, // 超过标签最大添加次数
			classifyVisible: false,
			classifyValue: '',
			classifyList: [], // 分类专栏列表
			classifyData: [], // 已选择的分类专栏
			classifyId: '' // 分类ID
		}
	},
	components: {
		RichText,
		PopoverText,
		Tags
	},
	created() {
		this.articleId = this.$route.params.id;
		this.disabled = this.$route.params.op === 'view';
		if (this.articleId) {
			this.fetch();
		}
		this.fetchClassify();
	},
	directives: {
		// 输入框聚焦
		focus: {
			inserted: (el) => {
				el.children[0].focus();
			}
		}
	},
	methods: {
		// 获取数据
		async fetch() {
			const path = `/api/v1/admin/article/${this.articleId}`;
			const res = await this.$http.get(path);
			if (res.code === 0) {
				this.form = res.data;
				this.classifyData.push(res.data.classifyName);
			} else {
				this.$requestStatus(res);
			}
		},
		// 获取分类专栏
		async fetchClassify() {
			const path = '/api/v1/admin/classify';
			const res = await this.$http.get(path);
			if (res.code === 0) {
				this.classifyList = res.data.list;
			} else {
				this.$requestStatus(res);
			}
		},
		// 提交前数据校验
		submit(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					this.classifyId = this.classifyList.find((item) => item.name === this.form.classifyName)._id;
					this.loading = true;
					this.httpData();
				} else {
					return false;
				}
			});
		},
		// 提交数据请求
		async httpData() {
			const path = this.articleId ? `/api/v1/admin/article/${this.articleId}` : '/api/v1/admin/article';
			const method = this.articleId ? 'patch' : 'post';
			const postData = {
				title: this.form.title,
				contents: this.form.contents,
				articleTags: this.form.articleTags,
				mode: this.form.mode,
				way: this.form.way,
				classifyName: this.form.classifyName,
				classifyId: this.classifyId
			};
			const res = await this.$http[method](path, postData);
			if (res.code === 0) {
				this.$message({
					message: `${this.articleId ? '修改' : '添加'}成功`,
					type: 'success'
				});
				this.$router.back();
			} else {
				this.$requestStatus(res);
			}
		},
		// 富文本内容
		onRichChange(value) {
			this.form.contents = value;
		},
		// 删除标签
		closeTag(tag) {
			this.form.articleTags.splice(this.form.articleTags.indexOf(tag), 1);
			this.calTagNum();
			this.$refs.tagChild.closeTag(tag);
		},
		// 添加标签
		addTag(tag) {
			if (this.form.articleTags.indexOf(tag) > -1) {
				return;
			}
			this.calTagNum();
			if (this.form.articleTags.length > 4) {
				this.$message('最多可以添加5个标签');
				return;
			}
			this.form.articleTags.push(tag);
		},
		// 计算标签数量
		calTagNum() {
			this.overTagNum = this.form.articleTags.length >= 4;
		},
		// 关闭分类标签
		closeClassify() {
			this.form.classifyName = '';
			this.classifyData = [];
		},
		// 展示分类输入框
		showClassifyInput() {
			this.classifyVisible = true;
		},
		// 分类输入确认框
		handleClassifyConfirm() {
			this.form.classifyName = this.classifyValue;
			this.classifyVisible = false;
			this.classifyValue = '';
		},
		// 复选框选择
		classifyChange() {
			console.log(this.classifyData);
			this.form.classifyName = this.classifyData[0];
		}
	}
}
</script>

<style lang="less" scoped>
.width-wrap {
	/deep/.el-form-item__content {
		flex: 1;
	}
}
.tag-wrap {
	display: flex;
	align-items: center;
}
</style>
