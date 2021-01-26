<template>
  <div class="tags">
    <el-tag
      :key="tag.id"
      v-for="tag in initData"
      :closable="!disabled"
      @close="closeTag(tag)">
      {{tag}}
    </el-tag>
  </div>
</template>

<script>

export default {
  data() {
    return {
      //
    }
  },
  props: {
    initData: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeTag(tag) {
      this.$emit('closeTag', tag);
    }
  }
}
</script>

<style lang="less" scoped>
.tags {
  display: inline-flex;
}
</style>
