<template>
  <div class="page w-full h-full iframe-page">
    <div className="device-inner w-full h-full">
      <iframe title="iframe" src="/minesweeper/index.html" />
    </div>
  </div>
</template>
<style lang="scss">
.iframe-page {
  padding: 0;
}
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
