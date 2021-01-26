<template>
  <div class="popover">
    <el-tabs
      v-model="tabValue"
      type="card">
      <el-tab-pane
        v-for="item in tabArrs"
        :key="item.name"
        :label="item.title"
        :name="item.name">
        <div v-if="item.content.length < 1" class="noTag">暂无数据</div>
        <div v-else>
          <div
            v-for="itemChild in item.content"
            :key="itemChild.id"
            class="detailTag"
            @click="addTab(itemChild.name)"
            :class="{high: itemChild.isSelect}">
            {{itemChild.name}}
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tagData from '../../data/tagData';

export default {
  data() {
    return {
      tabValue: 0,
      tabArrs: tagData
    }
  },
  props: {
    overTagNum: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.handleTag(null, false);
  },
  methods: {
    // 添加标签
    addTab(tag) {
      if (!this.overTagNum) {
        this.handleTag(tag, true);
      }
      this.$emit('addTag', tag);
    },
    // 删除标签
    closeTag(tag) {
      this.handleTag(tag, false);
    },
    // 标签样式操作
    handleTag(tag, method) {
      this.tabArrs.map(value => {
        value.content.map(item => {
          if (tag === item.name || tag === null) {
            this.$set(item, 'isSelect', method);
          }
        });
      });
    }
  }
}
</script>

<style lang="less">
.popover {
  .el-tabs__header {
    border-bottom: none;
    margin: 0 0 10px;
    .el-tabs__nav {
      border: none;
      .el-tabs__item {
        border-left: none;
        padding: 0 10px;
      }
    }
  }
  .el-tabs__content {
    .el-tab-pane {
      .noTag {
        text-align: center;
      }
      .detailTag {
        display: inline-block;
        cursor: pointer;
        padding: 0 8px;
        margin-bottom: 10px;
        border: 1px solid #e8e8ee;
        background: #f7f7f7;
        margin-right: 10px;
        font-size: 12px;
        border-radius: 2px;
        height: 24px;
        line-height: 24px;
        color: #4d4d4d;
        &.high {
          color: #ccccd8;
        }
      }
    }
  }
}
</style>
