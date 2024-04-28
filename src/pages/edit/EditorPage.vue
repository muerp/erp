<template>
    <editor></editor>
</template>
<script lang="ts" setup>
import {defineComponent, ref} from 'vue'
import Editor from './components/Editor.vue'

defineComponent({
    components: {
        Editor
    }
})
</script>