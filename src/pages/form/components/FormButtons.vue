<template>
  <el-row class="form-buttons">
    <div v-for="(item, idx) in tableStore.buttons" :key="idx">
      <el-tooltip
        v-if="item.type < 60"
        :content="ButtonTypeConfig[item.type].tip"
        :disabled="!ButtonTypeConfig[item.type].tip"
      >
        <el-button
          :type="ButtonTypeConfig[item.type].type"
          :circle="!ButtonTypeConfig[item.type].label"
          :plain="!!ButtonTypeConfig[item.type].label"
          @click="onClick(item)"
        >
          <svg-icon :icon="ButtonTypeConfig[item.type].icon"></svg-icon>
          <span v-if="ButtonTypeConfig[item.type].label">
            {{ ButtonTypeConfig[item.type].label }}
          </span>
        </el-button>
      </el-tooltip>
      <el-dropdown
        v-else
        ref="dropdown"
        :hide-on-click="false"
        trigger="click"
        style="margin-right: 30px"
      >
        <el-button
          :type="ButtonTypeConfig[item.type].type"
          :circle="!ButtonTypeConfig[item.type].label"
          :plain="!!ButtonTypeConfig[item.type].label"
          @click="onClick(item)"
        >
          <svg-icon :icon="ButtonTypeConfig[item.type].icon"></svg-icon>
          <span v-if="ButtonTypeConfig[item.type].label">
            {{ ButtonTypeConfig[item.type].label }}
          </span>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(menu, idx) in tableStore.tables.headers"
              :key="idx"
              @click="onMenu(menu)"
            >
              <el-checkbox :checked="!menu.disabled" :label="menu.label"></el-checkbox>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-row>

  <table-create-row v-model="addVisible"></table-create-row>

  <!-- <el-dialog class="new-table-data" title="新建数据" v-model="addVisible" :width="520">
    <el-form :model="form">
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
          <el-button class="opa-text" type="primary" text @click="onCurTime(header.key)"> 当前时间 </el-button>
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
                    v-loading="isLoadingMyImage"
                    empty-text="暂无数据"
                    element-loading-text="数据加载中..."
                    element-loading-background="rgba(0, 0, 0, 0)"
                  >
                    <div
                      class="table-img"
                      :class="{ active: form[header.key]?.icon === icon }"
                      v-for="(img, idx) in images"
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
        <el-button text @click="()=>{addVisible=false}"> 取消 </el-button>
        <el-button type="primary" :disabled="!isValid" @click="onCreate"> 创建 </el-button>
      </el-form-item>
    </el-form>
  </el-dialog> -->
</template>
<script lang="ts" setup>
import { computed, defineComponent, ref } from "vue";
import {
  ButtonType,
  ButtonTypeConfig,
  HeaderType,
  SystemIcons,
} from "../../home/utils/constants";
import { tableStore } from "../useTable";
import TableCreateRow from "./TableCreateRow.vue";
import { isUrl, isBase64 } from "../../../utils/utils";
defineComponent({
  components: {
    TableCreateRow
  },
});
const dropdown = ref();
const addVisible = ref(false);
const onClick = (item) => {
  
  if (item.type >= 60) {
    dropdown.value[0].handleOpen();
  } else if (item.type === ButtonType.add) {
    addVisible.value = true;
  }
};
const onMenu = (item) => {
  item.disabled = !item.disabled;
};

// const form = ref({});
// const isValid = computed(()=>{
//   console.log('--form.value-', form.value);
//   for (let i=0; i<tableStore.tables.headers.length; ++i) {
//     const item = tableStore.tables.headers[i];
//     if (item.require && item.type !== HeaderType.switch) {
//       if (!form.value[item.key]) return false;
//     }
//   }
//   return true;
// })

// const iconTab = ref("system");
// const predefineColors = ref([
//   "#ff4500",
//   "#ff8c00",
//   "#ffd700",
//   "#90ee90",
//   "#00ced1",
//   "#1e90ff",
//   "#c71585",
//   "rgba(255, 69, 0, 0.68)",
//   "rgb(255, 120, 0)",
//   "hsv(51, 100, 98)",
//   "hsva(120, 40, 94, 0.5)",
//   "hsl(181, 100%, 37%)",
//   "hsla(209, 100%, 56%, 0.73)",
//   "#c7158577",
// ]);
// const iconDropRef = ref();
// const onCurTime = (key: string) => {
//     form.value[key] = new Date();
// }
// const onSelectIcon = (icon: string, key: string) => {
//   if (!form.value[key]) {
//     form.value[key] = {};
//   }
//   form.value[key].icon = icon;
//   iconDropRef.value[0]?.handleClose();
// };

// const onSelectImage = (icon: string, key: string) => {
//   if (!form.value[key]) {
//     form.value[key] = {};
//   }
//   form.value[key].icon = icon;
//   iconDropRef.value[0]?.handleClose();
// };

// const onChangeIconColor = (color, key) => {
//   if (!form.value[key]) {
//     form.value[key] = {};
//   }
//   form.value[key].color = color;
// };
// const isLoadingMyImage = ref(true);
// const images = ref();
// const fetchMyImages = () => {
//   if (images.value) return;
//   setTimeout(() => {
//     images.value = [
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/c7f5291ecab14e55a9382444247cc2ce.png",
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/62496678a1d942ab892b26d9ad5946b2.jpg",
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/c7f5291ecab14e55a9382444247cc2ce.png",
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/62496678a1d942ab892b26d9ad5946b2.jpg",
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/c7f5291ecab14e55a9382444247cc2ce.png",
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/62496678a1d942ab892b26d9ad5946b2.jpg",
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/c7f5291ecab14e55a9382444247cc2ce.png",
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/62496678a1d942ab892b26d9ad5946b2.jpg",
//       "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
//     ];
//     isLoadingMyImage.value = false;
//   }, 500);
// };
// const onTabChange = (name: string) => {
//   console.log("d-d--d-", name);
//   if (name === "my") {
//     fetchMyImages();
//   }
// };
// const onCreate = () => {
//   const data = {};
//   tableStore.tables.headers.forEach(item => {
//     if (form.value[item.key]) {
//       const value = form.value[item.key];
//       data[item.key] = item.type === HeaderType.time? new Date(value).getTime():value;
//     }
//   })

//   console.log('--data--', data);
// }
</script>
<style lang="scss">
.form-buttons {
  border-top: 1px solid #666;
  padding: 6px 0;
  margin: 10px 0;
  .el-button {
    margin: 4px 6px;
    height: 28px;
    font-size: 12px;
    .svg-icon {
      height: 14px;
    }
    &.is-circle {
      width: 28px;
    }
  }
  .el-button + .el-button {
    margin-left: 12px;
  }
}
.el-popper.is-dark,
.el-popper.is-dark .el-popper__arrow:before {
  background: #1f1f1f;
  border-color: #636363;
  color: #ccc;
}
</style>
