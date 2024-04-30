<template>
  <div class="tree-node" v-if="data">
    <div class="tree-item" :class="{ expand: data.expand, active: data.active }">
      <div ref="dragRef">
        <svg-icon class="drag-icon" icon="drag"></svg-icon>
      </div>
      <slot :data="data" :level></slot>
    </div>
    <collapse-expand
      v-if="data.children && data.children.length > 0"
      :expand="data.expand"
    >
      <div
        v-loading="data.loading"
        element-loading-text="加载中..."
        element-loading-background="rgba(0, 0, 0, 0.3)"
      >
        <tree-node
          v-for="(node, idx) in data.children"
          :data="node"
          :key="index + '-' + idx"
          :index="index + '-' + idx"
          :level="level + 1"
          @drag-start="onDragStart"
          @drag-move="onDragMove"
          @drag-end="onDragEnd"
        >
          <template #default="{ data, level }">
            <slot :data="data" :level="level"></slot>
          </template>
        </tree-node>
      </div>
    </collapse-expand>
  </div>
</template>
<script lang="ts" setup>
// import { useDraggable } from "element-plus";
import { defineComponent, onMounted, ref, defineEmits } from "vue";
import CollapseExpand from "./CollapseExpand.vue";
import { useDraggable } from "./useDraggable";
const props = defineProps({
  data: { type: Object, default: undefined },
  index: { type: String, default: "" },
  level: { type: Number, default: 0 },
});
defineComponent({
  components: {
    CollapseExpand,
  },
});
const emit = defineEmits(['drag-start', 'drag-move', 'drag-end'])
const dragRef = useDraggable(emit, props.data);
const onDragStart = (e, data) => {
  emit('drag-start', e, data);
}
const onDragMove = (e, data) => {
  emit('drag-move', e, data);
}
const onDragEnd = (e, data) => {
  emit('drag-end', e, data);
}
</script>
<style lang="scss">
.tree-item {
  display: flex;
  align-items: center;
  padding: 0 10px 0 0;
  cursor: pointer;
  transition: all 0.25s;
  border-radius: 4px;
  &:hover {
    background-color: rgb(56, 56, 56);
    .drag-icon {
      opacity: 1;
    }
  }
}
</style>
