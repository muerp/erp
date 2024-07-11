<template>
  <div class="page w-full h-full compress-page">
    <div
      class="select-image d-column d-center"
      @drop="onDrop"
      @dragleave="onDragLeave"
      @dragover="onDragOver"
      @click="onSelect"
    >
      <p>点击选择或拖动webp、jpeg、png图片到这里</p>
      <p class="h-1">最多 20 张图片，每张最大 5 MB</p>
      <input
        ref="imageRef"
        type="file"
        multiple="true"
        @change="onChange"
        accept=".png,.jpg,.jpeg,image/png,image/jpg,image/jpeg"
      />
    </div>
    <div class="file-list" v-if="list.length > 0">
      <ul>
        <li
          class="d-flex"
          :class="{ repeat: item.repeat }"
          v-for="(item, idx) in list"
          :key="idx + 'sdx'"
        >
          <div class="name text-left">
            {{ item.file.name }}
          </div>
          <div class="size text-right">
            {{ diskSize(item.file.size) }}
          </div>
          <progress-bar
            :percent="item.progress"
            :class="{ 'progress-red': !item.valid }"
            :text="
              item.error
                ? item.error
                : !item.valid
                ? 'File type is not supported'
                : item.size === 0
                ? 'Compressing'
                : 'Finished'
            "
          />
          <div class="size text-left">
            {{ item.size > 0 ? diskSize(item.size) : "" }}
          </div>
          <div class="download" @click="onDownload(item, idx)">
            {{ item.valid ? "Download" : "Delete" }}
          </div>
          <div class="rate" v-if="item.valid">
            -{{
              item.size ? ((1 - item.size / item.file.size) * 100).toFixed(0) : "0.00"
            }}%
          </div>
          <div class="rate" v-else />
        </li>
      </ul>
    </div>
    <div class="download-all" v-if="allowDownloadAll">
      <div class="btn-all" @click="onDownloadAll">Download all</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { diskSize, fileMD5, download, toZip } from "../home/utils";
import ProgressBar from "./Progress.vue";
import moment from "moment";
const list = ref<any[]>([]);
const imageRef = ref<any>();
const allowDownloadAll = computed(() => {
  return list.value.filter((r) => r.valid).length > 1;
});
const onSelect = () => {
  imageRef.value.click();
};
const addFiles = (files: File[]) => {
  if (files.length > 0) {
    const filter = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    for (let i = 0; i < files.length; ++i) {
      if (list.value.length >= 20) break;
      let file = files[i];
      fileMD5(file).then((md5) => {
        let sdx = list.value.findIndex((r) => r.md5 === md5);
        if (sdx !== -1) {
          list.value[sdx].repeat = true;
          setTimeout(() => {
            list.value[sdx].repeat = false;
          }, 500);
          return;
        }
        let idx = filter.indexOf(file.type);
        let error = file.size > 5 * 1024 * 1024 ? "File is too large (max 5 MB)" : "";
        error = idx === -1 ? "File type is not supported" : error;
        list.value.push({
          file: file,
          valid: !error,
          progress: 0,
          size: 0,
          error,
          md5,
          repeat: false,
        });
        const item = list.value[list.value.length - 1];
        if (item.valid) {
          // this.$axios.upload(file, (e) => {
          //   item.progress = parseInt(e.loaded / e.total * 100);
          // }).then(({len, buffer}) => {
          //   item.size = len;
          //   item.buffer = buffer;
          // }).catch(() => {
          //   item.error = 'Network Error';
          //   item.valid = false;
          // })
        }
      });
    }
  }
};
const dragging = ref(false);
const onChange = (e: any) => {
  const files = e.target.files;
  addFiles(files);
};
const onDragOver = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
  dragging.value = true;
};
const onDragLeave = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
  dragging.value = false;
};
const onDrop = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
  addFiles(e.dataTransfer.files);
};
const onDownload = (item: any, idx: number) => {
  if (!item.buffer) {
    list.value.splice(idx, 1);
    return;
  }
  let blob = new Blob([item.buffer], { type: item.file.type });
  download(blob, item.file.name);
};
const onDownloadAll = async () => {
  const content = await toZip(list.value);
  const filename = "green-" + moment(new Date()).format("YYYY-MM-DD") + ".zip";
  download(content, filename);
};
</script>
<style lang="scss">
.compress-page {
  .d-flex {
    display: flex;
    align-items: center;
  }
  .d-column {
    display: flex;
    flex-direction: column;
  }

  .d-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ul {
    padding: 0;
    margin: 0;
  }
  li {
    list-style: none;
  }

  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .select-image {
    border: 2px dashed #999;
    min-height: 10rem;
    min-width: 30%;
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.25s;
    padding: 1rem 1rem;
    p {
      margin: 0.2rem 0;
      font-weight: 600;
      transition: all 0.25s;
    }
    .h-1 {
      font-size: 13px;
      color: #666;
      font-weight: 400;
    }
    input {
      display: none;
    }
    &:hover {
      border-color: #ccc;
      p {
        opacity: 0.7;
      }
    }
  }
  .file-list {
    min-width: 80%;
    padding: 1rem 1rem;
    border: 1px solid #ccc;
    margin-top: 2rem;
    li {
      font-size: 13px;
      background-color: #232323;
      padding: 0.3rem 1rem;
      margin: 0.2rem 0;
      border: 1px solid #323232;
      font-weight: 500;
      border-radius: 4px;
      transition: all 0.25s;
    }
    .name {
      width: 200px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .size {
      width: 100px;
      color: #37b937;
      padding: 0 10px;
    }
    .download {
      width: 80px;
      text-decoration: underline;
      cursor: pointer;
      transition: all 0.25s;
      user-select: none;
      &:hover {
        color: #37b937;
      }
      &:active {
        color: #333;
      }
    }
    .progress-bar {
      flex: 1;
      min-width: 200px;
    }
    .rate {
      width: 40px;
    }
    li.repeat {
      border-color: #f94c00;
    }
  }
  .download-all {
    margin-top: 1rem;
  }
  .btn-all {
    cursor: pointer;
    background-color: #0aa574;
    color: #fff;
    font-weight: 600;
    padding: 0.5rem 1.6rem;
    box-shadow: 0 1px 3px #018259;
    transition: all 0.25s;
    &:hover {
      background-color: #02c487;
    }
    &:active {
      background-color: #0aa574;
    }
  }

  .progress-bar {
    background-color: #989898;
    width: 100%;
    height: 28px;
    border-radius: 2rem;
    position: relative;
  }
  .progress-bg {
    position: absolute;
    left: 10px;
    top: 5px;
    bottom: 4px;
    right: 10px;

    border-radius: 2rem;
    z-index: 0;
    overflow: hidden;
  }
  .progress-percent {
    transition: all 0.25s;
    width: 0;
    background-color: #92ed14;
    height: 100%;
  }

  .progress-text {
    font-size: 12px;
    font-weight: 400;
    height: 100%;
    z-index: 2;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    font-weight: 500;
  }

  .progress-red {
    .progress-percent {
      width: 100% !important;
      background-color: #f94c00;
    }
    .progress-text {
      color: #fff;
    }
  }
}
</style>
