<template>
    <img class="t-img" v-if="mode===1" :src="src" alt="">
    <svg-icon v-else :icon="src" :color="color"></svg-icon>
</template>
<script lang="ts" setup>
import { computed } from "vue"
import { isBase64, isUrl } from "../../../utils";

    const props = defineProps({
        src: {type: String, default: ''},
        color: {type: String, default: ''},
    })
    const mode = computed(()=>{
        if (isUrl(props.src)) {
            return 1;
        }
        if (isBase64(props.src)) {
            return 1;
        }
        return 2;
    })
</script>
<style lang="scss">
    .t-img {
        max-width: 60px;
    }
</style>