<template>
  <div class="tinymce-editor">
    <Editor
      v-model="myValue"
      :disabled="disabled"
      :init="init">
    </Editor>
    <!-- <div v-if="disabled" class="mask" :style="{ height: `${height}px` }"></div> -->
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/themes/silver';
import 'tinymce/icons/default/icons';

import 'tinymce/plugins/image'; // 上传图片插件
import 'tinymce/plugins/code'; // 插入代码插件

export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 300
    },
    plugins: {
      type: [String, Array],
      default: 'image code'
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo | fontsizeselect ｜ lineheight | code | image | removeformat | outdent indent | bold italic｜ backcolor forecolor formatselect | alignleft aligncenter alignright alignjustify'
    }
  },
  data() {
    return {
      init: {
        // language_url: '/static/tinymce/langs/zh_CN.js',
        // language: 'zh_CN',
        skin_url: '/static/tinymce/skins/ui/oxide',
        height: this.height,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        fontsize_formats: '8px 10px 12px 14px 16px 18px 24px 36px',
        lineheight_formats: '0.5 1 1.5 2',
        images_upload_handler: (blobInfo, success, failure) => {
          let formData = new FormData();
          formData.append('file', blobInfo.blob(), blobInfo.filename());
          this.$http.post(`${this.$config.backendBaseUrl}/api/v1/admin/common/upload/`, formData)
          .then(res => {
            if (res.code === 0) {
              success(res.data.url);
            } else {
              failure(res.msg);
            }
          });
        }
      },
      myValue: ''
    }
  },
  mounted() {
    tinymce.init({});
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit('change', newValue);
    }
  }
}
</script>

<style scoped lang="less">
.tinymce-editor {
  position: relative;
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background-color: #F5F7FA;
    opacity: .7;
    cursor: not-allowed;
  }
}
</style>
