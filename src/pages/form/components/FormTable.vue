<template>
  <div
    class="form-table flex-1"
  >
    <el-table :data="tableDataStore.datas" style="width: 100%" border
    v-loading="tableDataStore.loadingState === LoadingState.loading"
    empty-text="暂无数据"
    element-loading-text="数据加载中..."
    element-loading-background="rgba(0, 0, 0, 0.3)">
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
    <div
      class="table-pagination"
      v-if="tableDataStore.datas && tableDataStore.datas.length > 0"
    >
      <el-pagination
        v-model:current-page="tableDataStore.curPage"
        v-model:page-size="tableDataStore.pageSize"
        :background="true"
        layout="prev, pager, next, jumper"
        :total="tableDataStore.totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { ButtonType, LoadingState } from "../../home/utils/constants";
import TableItem from "./TableItem.vue";
import { tableStore, tableDataStore, fetchTableData } from "../useTable";
defineComponent({
  components: {
    TableItem,
  },
});
const loading = ref(true);
const headers = computed(() => {
  return tableStore.tables.headers.filter((r) => !r.disabled);
});
watch(
  () => tableStore.tables,
  () => {
    fetchTableData();
  }
);
onMounted(() => {
  fetchTableData();
});
const handleSizeChange = () => {
  fetchTableData();
};
const handleCurrentChange = () => {
  fetchTableData();
};
</script>
<style lang="scss">
.form-table {
  overflow: auto;
}
.el-table {
  font-size: 12px;
}
.table-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>
