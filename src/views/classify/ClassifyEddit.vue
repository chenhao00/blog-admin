<template>
  <div class="classify-eddit">
    <el-table
      class="normal-table"
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%">
      <el-table-column label="序号" type="index" width="60">
      </el-table-column>
      <el-table-column label="文章名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            class="threeBtn"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ClassifyEddit',
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
      const path = `/api/v1/admin/classify/${this.$route.params.id}`;
			const res = await this.$http.get(path);
			if (res.code === 0) {
        this.tableData = res.data.articles;
			} else {
				this.$requestStatus(res);
			}
    }
  }
}
</script>

<style lang="less" scoped>

</style>
