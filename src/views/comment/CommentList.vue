<template>
  <div class="classify-list">
    <el-table
      class="normal-table"
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%">
      <el-table-column label="序号" type="index" width="60">
      </el-table-column>
      <el-table-column label="姓名" width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="评论文章" width="180">
        <template slot-scope="scope">
          {{ scope.row.commentArticle.title }}
        </template>
      </el-table-column>
      <el-table-column label="评论内容">
        <template slot-scope="scope">
          <span v-html="scope.row.content" class="content"></span>
        </template>
      </el-table-column>
      <el-table-column label="评论时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.createTime | formateDate }}
        </template>
      </el-table-column>
      <el-table-column label="回复时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.replayTime | formateDate }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.replay ? '已回复' : '未回复' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
            <el-button
            size="mini"
            class="threeBtn"
            @click="handleEdit(scope.$index, scope.row)">回复评论</el-button>
          <el-button
            size="mini"
            type="danger"
            class="threeBtn"
            @click="handleDelete(scope.$index, scope.row)">删除评论</el-button>
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
import CalCurrentPage from '../../lib/calCurrentPage';

export default {
  name: 'CommentList',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const path = `/api/v1/admin/comment?page=${this.currentPage}&pageSize=${this.pageSize}`;
			const res = await this.$http.get(path);
			if (res.code === 0) {
        this.tableData = res.data.list;
        this.total = res.data.total;
			} else {
				this.$requestStatus(res);
			}
    },
    // 回复
    handleEdit(index, row) {
      this.$router.push({ path: `/comment/commentReplay/${row._id}` });
    },
    // 确认删除
    handleDelete(index, row) {
      this.$confirm('此操作将删除此评论, 是否继续?', '提示', {
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
      const path = `/api/v1/admin/comment/${id}`;
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
.content {
  max-height: 100px;
  /deep/ img {
    max-width: 100%;
    max-height: 80px;
  }
}
</style>
