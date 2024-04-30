<template>
  <el-scrollbar>
    <div class="erp-tree" :class="{'is-dragable': !!dragItem}">
      <tree-node v-for="(item, idx) in list" :data="item" :key="idx" :index="idx + ''" 
      @drag-start="onDragStart"
      @drag-move="onDragMove"
      @drag-end="onDragEnd"
      >
        <template #default="{ data, level }">
          <div
            class="tree-inner"
            :style="{ 'padding-left': indent * level + 'px' }"
            @click="onClick(data)"
            @dblclick="onDouble(data)"
          >
            <slot :data="data" :level></slot>
          </div>
        </template>
      </tree-node>
    </div>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted, ref, watch } from "vue";
import TreeNode from "./TreeNode.vue";
const props = defineProps({
  list: { type: Array, default: [] },
  indent: { type: Number, default: 20 },
  modalvalue: { type: Object, default: undefined },
});
defineComponent({
  components: {
    TreeNode,
  },
});
const emit = defineEmits(["update:modalvalue"]);
const activeItem = ref();
const dragItem = ref();
onMounted(() => {
  activeItem.value = props.list[0];
});
watch(
  () => props.list,
  () => {
    activeItem.value = props.list[0];
  }
);
watch(
  () => activeItem.value,
  (val, old) => {
    if (old) {
      old.active = false;
    }
    emit("update:modalvalue", val);
  }
);
const onClick = (item) => {
  item.expand = !item.expand;
  item.active = true;
  activeItem.value = item;
};
const onDouble = (item) => {
  emit("double-item", item);
};
const onDragStart = (e, data) => {
  console.log('--start--', e, data)
  dragItem.value = data;
};
const onDragMove = (e, data) => {
  console.log('--move--', e, data)

};
const onDragEnd = () => {
  dragItem.value = undefined;
};
</script>
<style lang="scss">
.tree-inner {
  display: flex;
  align-items: center;
  * {
    user-select: none;
  }
}
.drag-icon {
  transition: opacity all .25s;
  opacity: 0;
  cursor: move;
}
.tree-inner {
  padding: 8px 8px;
}
.is-dragable {
  .tree-item {
    &:hover {
      background-color: transparent;
    }
  }
}
</style>
