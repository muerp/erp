<template>
  <el-dialog
    v-if="modelValue"
    class="new-table-data"
    title="新建数据"
    v-model="showDialog"
    :width="520"
    @closed="onClose"
  >
    <el-form
      :model="form"
      v-loading="isSubmitting"
      element-loading-text="正在提交数据..."
      element-loading-background="rgba(0, 0, 0, 0)"
    >
      <el-form-item
        v-for="(header, idx) in tableStore.tables.headers"
        v-show="header.type !== HeaderType.opa"
        :key="header.key"
        :label="header.label"
      >
        <el-select
          v-if="header.type === HeaderType.select"
          v-model="form[header.key]"
          :placeholder="'请选择' + header.label"
        >
          <el-option
            v-for="item in header.menus"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          v-else-if="header.type === HeaderType.text"
          v-model="form[header.key]"
          :placeholder="'请输入' + header.label"
        ></el-input>
        <el-switch
          v-else-if="header.type === HeaderType.switch"
          v-model="form[header.key]"
        ></el-switch>
        <div v-else-if="header.type === HeaderType.time">
          <el-date-picker
            placement="bottom-start"
            v-model="form[header.key]"
            type="date"
            placeholder="选择日期"
            clearable
          />
          <el-button class="opa-text" type="primary" text @click="onCurTime(header.key)">
            当前时间
          </el-button>
        </div>
        <div v-else-if="header.type === HeaderType.icon" class="d-flex align-center">
          <el-dropdown
            ref="iconDropRef"
            :hide-on-click="false"
            popper-class="icon-dropdown"
            placement="bottom-start"
            trigger="click"
            :max-height="300"
          >
            <el-button> 请选择 </el-button>
            <template #dropdown>
              <el-button
                class="my-upload"
                v-if="iconTab === 'my'"
                type="primary"
                @click="onUploadImage"
              >
                上传图片
              </el-button>
              <el-tabs v-model="iconTab" class="d-column" @tab-change="onTabChange">
                <el-tab-pane label="系统图标" name="system">
                  <el-row class="icon-pane">
                    <el-button
                      v-for="icon in SystemIcons"
                      :class="{ active: form[header.key]?.icon === icon }"
                      :key="icon"
                      text
                      type="info"
                      @click="onSelectIcon(icon, header.key)"
                    >
                      <svg-icon :icon="icon"> </svg-icon>
                    </el-button>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="我的" name="my">
                  <el-row
                    class="my-images"
                    v-loading="imageStore.loadingState === LoadingState.loading"
                    empty-text="暂无数据"
                    element-loading-text="数据加载中..."
                    element-loading-background="rgba(0, 0, 0, 0)"
                  >
                    <div
                      class="table-img"
                      :class="{ active: form[header.key]?.icon === icon }"
                      v-for="(img, idx) in imageStore.images"
                      :key="idx"
                      @click="onSelectImage(img, header.key)"
                    >
                      <img :src="img" alt="" />
                    </div>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </template>
          </el-dropdown>
          <table-icon
            v-if="form[header.key]?.icon"
            :src="form[header.key]?.icon"
            :color="form[header.key]?.color"
            style="margin: 0 20px"
          ></table-icon>
          <el-color-picker
            v-if="
              form[header.key]?.icon &&
              !isUrl(form[header.key]?.icon) &&
              !isBase64(form[header.key]?.icon)
            "
            class="icon-color-picker"
            :model-value="form[header.key]?.color"
            show-alpha
            :predefine="predefineColors"
            @active-change="onChangeIconColor($event, header.key)"
          />
        </div>
        <el-select
          v-else-if="header.type === HeaderType.state"
          v-model="form[header.key]"
          :placeholder="'请选择' + header.label"
        >
          <el-option v-for="(item, idx) in header.map" :label="item.label" :value="idx">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="create-opa">
        <el-button text @click="handlerClose"> 取消 </el-button>
        <el-button type="primary" :disabled="!isValid" @click="onCreate">
          创建
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { computed, defineComponent, ref, watch } from "vue";
import { tableDataStore, tableStore } from "../useTable";
import TableIcon from "./TableIcon.vue";
import { isUrl, isBase64 } from "../../../utils/utils";
import { fetchImages, imageStore } from "../../../store";
import {
  ButtonType,
  ButtonTypeConfig,
  HeaderType,
  SystemIcons,
  LoadingState,
} from "../../home/utils/constants";
defineComponent({
  components: {
    TableIcon,
  },
});

const props = defineProps({
  modelValue: { type: Boolean, default: false },
});
const emit = defineEmits(["update:modelValue"]);
const onClose = () => {
  emit("update:modelValue", false);
};
const iconTab = ref("system");
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);
const iconDropRef = ref();
const form = ref({});
const isSubmitting = ref(false);
const showDialog = ref(false);
watch(
  () => props.modelValue,
  (val, old) => {
    if (val !== old) {
      showDialog.value = val;
    }
  }
);
const isValid = computed(() => {
  for (let i = 0; i < tableStore.tables.headers.length; ++i) {
    const item = tableStore.tables.headers[i];
    if (item.require && item.type !== HeaderType.switch) {
      if (!form.value[item.key]) return false;
    }
  }
  return true;
});
const handlerClose = () => {
  showDialog.value = false;
};
const onCurTime = (key: string) => {
  form.value[key] = new Date();
};
const onSelectIcon = (icon: string, key: string) => {
  if (!form.value[key]) {
    form.value[key] = {};
  }
  form.value[key].icon = icon;
  iconDropRef.value[0]?.handleClose();
};

const onSelectImage = (icon: string, key: string) => {
  if (!form.value[key]) {
    form.value[key] = {};
  }
  form.value[key].icon = icon;
  iconDropRef.value[0]?.handleClose();
};

const onChangeIconColor = (color, key) => {
  if (!form.value[key]) {
    form.value[key] = {};
  }
  form.value[key].color = color;
};
const onTabChange = (name: string) => {
  if (name === "my") {
    fetchImages();
  }
};
const onCreate = () => {
  const data = {};
  tableStore.tables.headers.forEach((item) => {
    if (form.value[item.key]) {
      const value = form.value[item.key];
      data[item.key] = item.type === HeaderType.time ? new Date(value).getTime() : value;
    }
  });
  isSubmitting.value = true;
  setTimeout(() => {
    tableDataStore.datas.unshift(data);
    isSubmitting.value = false;
    setTimeout(() => {
      form.value = {};
      handlerClose();
    }, 50);
  }, 500);
};
const onUploadImage = () => {};
</script>
<style lang="scss">
.el-checkbox {
  height: 20px;
}
.new-table-data {
  .el-form-item {
    margin: 10px 0;
  }
  .el-button {
    height: 28px;
  }
  .el-color-picker__trigger {
    width: 28px;
    height: 28px;
  }
  .create-opa {
    margin-top: 1.2rem;
    .el-form-item__content {
      justify-content: flex-end;
    }
    .el-button:nth-child(1) {
      margin: 0 10px;
    }
  }
}
.icon-dropdown {
  width: 300px;
  min-height: 200px;
  .el-tabs__nav-scroll {
    padding: 0 20px;
  }
  .el-tabs__header {
    margin-bottom: 0;
  }
  .el-tabs {
    overflow: hidden;
    height: 100%;
    max-height: 300px;
  }
  .el-tabs__content {
    height: calc(100% - var(--el-tabs-header-height));
    overflow: auto;
  }
  .el-scrollbar__wrap {
    overflow: hidden;
  }
  .el-dropdown__list {
    max-height: 300px;
    overflow: hidden;
  }
}
.icon-pane {
  padding: 10px;
  .svg-icon {
    width: 20px;
    height: 20px;
    margin: 5px;
    cursor: pointer;
  }
  .el-button {
    padding: 10px;
    &.active {
      background-color: #383838;
    }
  }
}
.my-images {
  min-height: 120px;
  .el-loading-spinner {
    svg {
      width: 28px;
      height: 28px;
    }
  }
}
.table-img {
  margin: 4px 6px;
  cursor: pointer;
  background-color: rgb(52, 52, 52);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: background-color 0.25s;
  img {
    max-width: 78px;
  }
  &:hover {
    background-color: #8a8a8a;
  }
  &.active {
    background-color: #8a8a8a;
  }
}
.my-upload {
  position: absolute;
  top: 7px;
  right: 7px;
  z-index: 1;
  height: 24px;
}
</style>
