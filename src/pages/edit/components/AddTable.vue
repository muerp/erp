<template>
  <div
    class="add-table flex-1 pt-2"
    @click="onTap"
    :class="{
      active: editorStore.curEditorItem && editorStore.curEditorItem.type === 'table',
    }"
  >
    <el-table
      :data="editorStore.rows"
      style="width: 100%"
      border
      @header-click="onClickHeader"
    >
      <el-table-column
        v-if="editorStore.tables.select"
        :prop="{key: '_checkbox'} as any"
        type="selection"
        :label-class-name="
          editorStore.curEditorItem &&
          editorStore.curEditorItem.type === 'table-cell' &&
          editorStore.curEditorItem.data.key === '_checkbox'
            ? 'cell-active cell-active-first'
            : ''
        "
        width="55"
        align="center"
      />
      <el-table-column
        v-for="header in headers"
        :prop="header"
        :label-class-name="
          editorStore.curEditorItem &&
          editorStore.curEditorItem.type === 'table-cell' &&
          editorStore.curEditorItem.data.key === header.key
            ? 'cell-active'
            : ''
        "
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
    <div class="table-pagination" v-if="editorStore.rows.length > 0">
      <el-pagination
        v-model:current-page="curPage"
        v-model:page-size="pageSize"
        :background="true"
        layout="prev, pager, next, jumper"
        :total="100"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import TableItem from "../../form/components/TableItem.vue";
import { editorStore } from "./editStore";
defineComponent({
  components: {
    TableItem,
  },
});
const headers = computed(() => {
  return editorStore.tables.headers.filter((r: any) => !r.disabled);
});

const onTap = () => {
  if (editorStore.curEditorItem && editorStore.curEditorItem.data) {
    editorStore.curEditorItem.data.active = false;
  }
  editorStore.curEditorItem = {
    type: "table",
  };
};

const curPage = ref(1);
const pageSize = ref(20);
const fetchTableData = () => {};
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
const onClickHeader = (cell: any, e: any) => {
  e.stopPropagation();
  if (editorStore.curEditorItem && editorStore.curEditorItem.data) {
    editorStore.curEditorItem.data.active = false;
  }
  editorStore.curEditorItem = {
    type: "table-cell",
    data: cell.property,
  };
};
</script>
<style lang="scss">
.add-table {
  overflow: auto;
  border: 1px solid transparent;
  &.active {
    border: 1px solid #27ae4b;
  }
  th {
    cursor: pointer;
  }
}
.el-table {
  font-size: var(--mu-font-szie);
}
.table-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
.cell-active {
  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9;
    border: 2px solid #27ae4b !important;
    border-top-width: 3px !important;
  }
}
.cell-active-first {
    &:before {
      border-left-width: 3px !important;
    }
}
</style>
