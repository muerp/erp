<template>
  <div class="w-full h-full">
    <el-row class="editor-header"> </el-row>
    <el-row type="flex" style="height: 100%">
      <mu-dragable init-width="400" style="border-right: 1px solid #999">
        <el-row align="cneter" draggable="true" justify="center" class="mt-2 mb-2"><el-text size="large" align="center">组件库</el-text></el-row>
        <el-scrollbar>
          <el-collapse>
            <el-collapse-item title="输入框" class="pl-1 pr-1">
              <el-row type="flex" class="drag-item pl-1 pr-1">
                <el-text class="mr-1">用户</el-text>
                <el-input placeholder="请输入名称" style="flex: 1" readonly></el-input>
              </el-row>
            </el-collapse-item>
          </el-collapse>
          <el-collapse>
            <el-collapse-item title="按钮" class="pl-1 pr-1">
              <el-row>
                <el-button class="drag-item"> 按钮 </el-button>
                <el-button class="drag-item" type="primary"> 按钮 </el-button>
                <el-button class="drag-item" type="success"> 按钮 </el-button>
                <el-button class="drag-item" type="info"> 按钮 </el-button>
                <el-button class="drag-item" type="warning"> 按钮 </el-button>
                <el-button class="drag-item" type="danger"> 按钮 </el-button>
              </el-row>
              <el-row>
                <el-button class="drag-item" plain>按钮</el-button>
                <el-button class="drag-item" type="primary" plain>按钮</el-button>
                <el-button class="drag-item" type="success" plain>按钮</el-button>
                <el-button class="drag-item" type="info" plain>按钮</el-button>
                <el-button class="drag-item" type="warning" plain>按钮</el-button>
                <el-button class="drag-item" type="danger" plain>按钮</el-button>
              </el-row>
              <el-row>
                <el-button class="drag-item" round>按钮</el-button>
                <el-button class="drag-item" type="primary" round>按钮</el-button>
                <el-button class="drag-item" type="success" round>按钮</el-button>
                <el-button class="drag-item" type="info" round>按钮</el-button>
                <el-button class="drag-item" type="warning" round>按钮</el-button>
                <el-button class="drag-item" type="danger" round>按钮</el-button>
              </el-row>
              <el-row>
                <el-button class="drag-item" icon="Search" circle />
                <el-button class="drag-item" type="primary" icon="Edit" circle />
                <el-button class="drag-item" type="success" icon="Check" circle />
                <el-button class="drag-item" type="info" icon="Message" circle />
                <el-button class="drag-item" type="warning" icon="Star" circle />
                <el-button class="drag-item" type="danger" icon="Delete" circle />
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-scrollbar>
        <div class="form-input">
            
        </div>
      </mu-dragable>
    </el-row>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="scss">
.editor-header {
  height: 64px;
  border-bottom: 1px solid #999;
}
.el-button + .el-button {
  margin: 3px 10px;
}
.drag-item {
  cursor: move;
  margin: 3px 10px;
  * {
    pointer-events: none;
    cursor: move;
  }
}
</style>
