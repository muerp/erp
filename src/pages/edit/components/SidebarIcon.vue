<template>
  <div
    class="sidebar-icon"
    :class="['sidebar-' + direction, { active: modelValue }]"
    @click="onClick"
  ></div>
</template>
<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  direction: { type: String, default: "left" },
});
const emit = defineEmits(["update:modelValue"]);
const onClick = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>
<style lang="scss">
.sidebar-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  cursor: pointer;
  &:hover {
    background-color: #252525;
  }
  &::before {
    content: "";
  }

  &.active {
    &::before {
      background-color: #999;
    }
  }
}
.sidebar-left {
  display: flex;
  border: 1px solid #999;
  transition: all 0.25s;
  border-radius: 2px;
  &::before {
    width: 6px;
    height: 100%;
    border-right: 1px solid #999;
  }
}
.sidebar-right {
  display: flex;
  border: 1px solid #999;
  transition: all 0.25s;
  border-radius: 2px;
  justify-content: flex-end;
  &::before {
    width: 6px;
    height: 100%;
    border-left: 1px solid #999;
  }
}
</style>
