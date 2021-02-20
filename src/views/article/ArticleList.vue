<template>
  <div class="article-list" v-loading="loading">
    <el-form :inline="true" :model="form" class="query-form">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章类型" prop="mode">
        <el-select v-model="form.mode" placeholder="文章类型">
          <el-option
            v-for="item in modeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章分类" prop="classifyName">
        <el-select v-model="form.classifyName" placeholder="文章分类">
          <el-option
            v-for="item in classifyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleCurrentChange(1)" type="success" size="small" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>
    <router-link to="/article/articleAdd">
      <el-button type="success" size="small" icon="el-icon-plus">新增博客</el-button>
    </router-link>
    <el-table
      class="normal-table"
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%">
      <el-table-column label="序号" type="index" width="60">
      </el-table-column>
      <el-table-column label="文章标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="文章标签" width="120">
        <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.articleTags" :key="item.id">
            {{ item }}<span v-if="index !== scope.row.articleTags.length - 1"><br /></span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="文章分类" width="120">
        <template slot-scope="scope">
          {{ scope.row.classifyName }}
        </template>
      </el-table-column>
      <el-table-column label="文章类型" width="90">
        <template slot-scope="scope">
          {{ scope.row.mode === 1 ? '原创' : '转载' }}
        </template>
      </el-table-column>
      <el-table-column label="发布形式" width="90">
        <template slot-scope="scope">
          {{scope.row.way === 1 ? '公开' : '私密'}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.createTime | formateDate }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.updateTime | formateDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="170px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            class="threeBtn"
            @click="handleView(scope.$index, scope.row)">查看</el-button>
            <el-button
            size="mini"
            class="threeBtn"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            class="threeBtn"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import moment from 'moment';
import FilterQuery from '../../lib/filterQuery';
import CalCurrentPage from '../../lib/calCurrentPage';

export default {
  name: 'ArticleList',
  data() {
    return {
      form: {
        title: '',
        classifyName: null,
        mode: null
      },
      classifyOptions: [],
      modeOptions: [
        { label: '不限类型', value: 0 },
				{ label: '原创', value: 1 },
				{ label: '转载', value: 2 }
			],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      moment
    }
  },
  created() {
    this.fetch();
    this.getClassify();
  },
  methods: {
    // 初始化数据
    async fetch() {
      const basePath = `/api/v1/admin/article?page=${this.currentPage}&pageSize=${this.pageSize}`;
      const path = FilterQuery(basePath, this.form);
      const res = await this.$http.get(path);
      if (res.code === 0) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      } else {
        this.$requestStatus(res);
      }
    },
    // 获取文章分类
    async getClassify() {
      const path = '/api/v1/admin/classify';
			const res = await this.$http.get(path);
			if (res.code === 0) {
        this.classifyOptions = res.data.list.map(item => ({ label: item.name, value: item.name }));
        this.classifyOptions.unshift({ label: '不限', value: '' });
			} else {
				this.$requestStatus(res);
			}
    },
    // 查看
    handleView(index, row) {
      this.$router.push({ path: `/article/articleEddit/view/${row._id}` });
    },
    // 修改
    handleEdit(index, row) {
      this.$router.push({ path: `/article/articleEddit/modify/${row._id}` });
    },
    // 确认删除
    handleDelete(index, row) {
      this.$confirm('此操作将删除此博客, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete(row._id);
      }).catch(() => {
      });
    },
    // 删除
    async delete(id) {
      const path = `/api/v1/admin/article/${id}`;
      const res = await this.$http.delete(path);
      this.loading = true;
      if (res.code === 0) {
        this.loading = false;
        this.currentPage = CalCurrentPage(this.currentPage, this.total);
        this.fetch();
        this.$message({
          type: 'success',
          message: '删除成功！'
        });
      } else {
        this.$requestStatus(res);
      }
    },
    // 分页
    handleCurrentChange(curPage) {
      this.currentPage = curPage;
      this.fetch();
    }
  }
}
</script>

<style lang="less" scoped>

</style>
