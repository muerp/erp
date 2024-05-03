<template>
  <div class="add-table flex-1 mt-2">
    <el-table
      :data="tempData"
      style="width: 100%"
      border
    >
      <el-table-column
        v-if="editorStore.tables.select"
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
            :config="editorStore.tables"
          ></table-item>
        </template>
      </el-table-column>
    </el-table>
    <div
      class="table-pagination"
      v-if="tempData.length > 0"
    >
      <el-pagination
        v-model:current-page="curPage"
        v-model:page-size="pageSize"
        :background="true"
        layout="prev, pager, next, jumper"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { ButtonType, LoadingState } from "../../home/utils/constants";
import TableItem from "../../form/components/TableItem.vue";
import { editorStore } from "./editStore";
defineComponent({
  components: {
    TableItem,
  },
});
const loading = ref(true);
const headers = computed(() => {
  return editorStore.tables.headers.filter((r) => !r.disabled);
});
const tempData = ref([])
const curPage = ref(1);
const pageSize = ref(20);
const fetchTableData = () => {
    
}
watch(
  () => editorStore.tables,
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
.add-table {
  overflow: auto;
}
.el-table {
  font-size: var(--mu-font-szie);
}
.table-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>
