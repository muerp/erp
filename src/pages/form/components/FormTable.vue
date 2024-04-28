<template>
  <div
    class="form-table flex-1"
    v-loading="loading"
    empty-text="暂无数据"
    element-loading-text="数据加载中..."
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column
        v-if="tableStore.tables.select"
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        v-for="header in headers"
        :prop="header.key"
        :label="header.label"
        :key="header.key"
        align="center"
        :width="header.width"
      >
        <template #default="scope">
          <table-item
            :data="scope.row"
            :header="header"
            :config="tableStore.tables"
          ></table-item>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { ButtonType } from "../../home/utils/constants";
import TableItem from "./TableItem.vue";
import { tableStore } from "../useTable";
defineComponent({
  components: {
    TableItem,
  },
});
const loading = ref(true);
const tableData = ref([]);
const headers = computed(() => {
  return tableStore.tables.headers.filter((r) => !r.disabled);
});
const fetchData = () => {
  setTimeout(() => {
    tableData.value = [
      {
        key1: 1,
        key2: "显示文本",
        key3: false,
        key4: Date.now(),
        key5: "tab",
        key6: 1,
        key7: "",
        key100: "",
      },
    ];
    loading.value = false;
  }, 1000);
};
watch(
  () => tableStore.tables,
  () => {
    fetchData();
  }
);
onMounted(() => {
  fetchData();
});
</script>
<style lang="scss">
.form-table {
  overflow: auto;
}
.el-table {
  font-size: 12px;
}
</style>
