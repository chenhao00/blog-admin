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
      <el-table-column label="分类" width="100">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="文章数" width="100">
        <template slot-scope="scope">
          {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            class="threeBtn"
            @click="handleView(scope.$index, scope.row)">管理</el-button>
            <el-button
            size="mini"
            class="threeBtn"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        this.classifyOptions = res.data.list.map(item => ({ label: item.name, value: item.name }));
        this.classifyOptions.unshift({ label: '不限', value: '' });
			} else {
				this.$requestStatus(res);
			}
    }
  }
}
</script>

<style lang="less" scoped>

</style>
