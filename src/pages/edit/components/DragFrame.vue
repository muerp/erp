<template>
  <div
    class="drag-frame pos-relative"
    :ref="onRef"
    :style="{ width: width? width+'%':'' }"
    :class="
      activeItem && activeItem.index === index ? 'frame-to-' + activeItem.position : ''
    "
  >
    <slot></slot>
    <!-- <div class="df-left-line"></div> -->
    <div class="df-right-line" ref="dragRight"></div>
    <div
      class="drag-frame-dialog"
      v-if="dragPos"
      :style="{ left: dragPos.x + 10 + 'px', top: dragPos.y + 5 + 'px' }"
    >
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { inject, onUnmounted, ref, watch } from "vue";
import { useDraggable } from "./useDraggable";

const props = defineProps({
  width: { type: String, default: "" },
  index: { type: Number, default: 0 },
  item: { type: Object, require: true },
  activeItem: { type: Object, default: undefined },
  checkFrame: { type: Boolean, default: false },
});
const fromList = inject("fromList");
const emit = defineEmits([
  "update:width",
  "update:activeItem",
  "drag-end",
  "change-width",
]);
const dragPos = ref();
onUnmounted(() => {
  delete fromList.value[props.index];
});
watch(
  () => props.index,
  (val, old) => {
    if (val !== old) {
      if (fromList.value[old]) {
        fromList.value[val] = fromList.value[old];
        delete fromList.value[old];
      }
    }
  }
);
const dragFrame = useDraggable((type, e) => {
  if (type === "drag-start") {
    dragPos.value = undefined;
  } else if (type === "drag-end") {
    dragPos.value = undefined;
    emit("drag-end", {
      item: props.item,
      index: props.index,
    });
    emit("update:activeItem");
  } else {
    dragPos.value = {
      x: e.offsetX,
      y: e.offsetY,
    };
    const keys = Object.keys(fromList.value);
    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      const target = fromList.value[key];
      const rect = target.el.getBoundingClientRect();
      const dx = e.offsetX - rect.left;
      const dy = e.offsetY - rect.top;
      if (dy < 0 || dy > rect.height) {
        continue;
      }
      if (dx >= 0 && dx <= rect.width * 0.5) {
        emit("update:activeItem", {
          item: target.item,
          position: "left",
          index: key,
        });
        break;
      } else if (dx >= 0 && dx <= rect.width) {
        emit("update:activeItem", {
          item: target.item,
          position: "right",
          index: key,
        });
        break;
      } else {
        emit("update:activeItem");
      }
    }
  }
});

const onRef = (el) => {
  if (!props.checkFrame) return;
  dragFrame.value = el;
  fromList.value[props.index] = {
    el,
    index: props.index,
    item: props.item,
  };
};
let dragWidth = 0;
const dragRight = useDraggable((type, e) => {
  if (type === "drag-start") {
    dragWidth = props.item.width;
  } else if (type === "drag-move") {
    const rect = dragFrame.value.getBoundingClientRect();
    const pRect = dragFrame.value.parentNode.getBoundingClientRect();
    let width = e.offsetX - rect.left;
    width = width < 100 ? 100 : width;
    emit("update:width", ~~((width / pRect.width) * 100).toFixed(2));
  } else if (type === "drag-end") {
    if (dragWidth !== props.item.width) {
        emit("change-width");
    }
  }
});
</script>

<style lang="scss">
.df-left-line,
.df-right-line {
  position: absolute;
  user-select: none;
  width: 1px;
  background-color: transparent;
  z-index: 1;
  top: -1px;
  bottom: -1px;
  transition: all 0.25s;
  cursor: col-resize;
  width: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  display: none;
  &::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #27ae4b;
    left: 1px;
    border-radius: 1rem;
  }
  &::before {
    display: none;
    content: "";
    display: block;
    width: 1px;
    height: 100%;
    background-color: transparent;
  }
  &:hover::before {
    display: flex;
    background-color: var(--mu-theme-color);
  }
  &:hover::after {
    background-color: var(--mu-theme-color);
  }
}
.df-left-line {
  left: -5px;
}
.df-right-line {
  right: -5px;
}
.drag-frame {
  border: 1px solid transparent;
  &.active {
    border: 1px solid #27ae4b;
    .df-left-line,
    .df-right-line {
      display: flex;
    }
  }
  .el-form-item {
    overflow: hidden;
  }
}
.drag-frame-dialog {
  pointer-events: none;
  position: fixed;
  z-index: 99;
  background-color: #181818;
}
.frame-to-left,
.frame-to-right {
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: var(--mu-theme-color);
  }
}
.frame-to-left {
  &::after {
    left: -2px;
  }
}
.frame-to-right {
  &::after {
    right: -1px;
  }
}
</style>
