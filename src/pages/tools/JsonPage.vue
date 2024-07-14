
<template>
  <div class="page w-full h-full json-page">
    <code-editor lang="json" :value="JSON.stringify({'json': 'json数据'})"/>
  </div>
</template>
<script setup lang="ts">
import CodeEditor from '@/components/CodeEditor.vue';
</script>
