<template>
  <div class="code-editor" ref="editorRef"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref, nextTick, defineEmits } from "vue";
import { monaco } from "./customMonaco";
const props = defineProps({
  value: { type: String, default: "" },
  lang: { type: String, default: "" },
});
defineOptions({
  name: "CodeEditor",
});
const emit = defineEmits(['change'])
const editorRef = ref();
onMounted(() => {
  const editor = monaco.editor.create(editorRef.value, {
    value: '', // 编辑器的值
    language: props.lang || "json", //语言
    theme: "vs-dark", // 编辑器主题：vs, hc-black, or vs-dark
    accessibilitySupport: "off",
    readOnly: false, // 是否只读
    wordWrap: "on",
    automaticLayout: true,
    // overviewRulerBorder: false,
    // scrollBeyondLastLine: false,
    // selectOnLineNumbers: false,
    lineNumbers: 'off',
    minimap: {
      // 关闭代码缩略图
      enabled: false, // 是否启用预览图
    },
    comments: {
      ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
      insertSpace: true, // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
    },
  });
  if (props.lang === 'json') {
    const formattedText = JSON.stringify(JSON.parse(props.value), null, 2);
    editor.setValue(formattedText);
  }

    editor.onDidChangeModelContent((e) => {
        if (props.lang === 'json') {
            try {
                emit('change', JSON.parse(editor.getValue()));
            } catch(e) {
                //
            }
        } else {
            emit('change', editor.getValue());
        }
    })
});
</script>
<style lang="scss"></style>
