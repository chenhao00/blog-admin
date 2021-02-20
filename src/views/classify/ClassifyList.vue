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
      <el-table-column label="分类">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="文章个数" width="100">
        <template slot-scope="scope">
          {{ scope.row.articles.length }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            class="threeBtn"
            @click="handleView(scope.$index, scope.row)">管理</el-button>
          <!-- <el-button
            size="mini"
            class="threeBtn"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button
            size="mini"
            type="danger"
            class="threeBtn"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ClassifyList',
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const path = '/api/v1/admin/classify';
			const res = await this.$http.get(path);
			if (res.code === 0) {
        this.tableData = res.data.list;
			} else {
				this.$requestStatus(res);
			}
    },
    // 管理文章
    async handleView(index, row) {
      this.$router.push({ path: `/classify/classifyEddit/${row._id}` });
    },
    // 确认删除
    handleDelete(index, row) {
      this.$confirm('此操作将删除此分类, 是否继续?', '提示', {
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
      const path = `/api/v1/admin/classify/${id}`;
      const res = await this.$http.delete(path);
      this.loading = true;
      if (res.code === 0) {
        this.loading = false;
        this.fetch();
        this.$message({
          type: 'success',
          message: '删除成功！'
        });
      } else {
        this.$requestStatus(res);
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
