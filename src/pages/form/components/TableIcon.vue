<template>
    <img v-if="mode===1" :src="src" alt="">
    <svg-icon v-else :icon="src" :color="color"></svg-icon>
</template>
<script lang="ts" setup>
import { computed } from "vue"

    const props = defineProps({
        src: {type: String, default: ''},
        color: {type: String, default: ''},
    })
    const mode = computed(()=>{
        if (/^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i.test(props.src)) {
            return 1;
        }
        if (/^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(props.src)) {
            return 1;
        }
        return 2;
    })
</script>