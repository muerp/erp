// store.js
import { LoadingState } from '@/pages/home/utils';
import { reactive } from 'vue'

export const imageStore = reactive<{ images: string[], loadingState: LoadingState }>({
    loadingState: LoadingState.error,
    images: []
})

export const fetchImages = () => {
    if (imageStore.loadingState === LoadingState.loading) return;
    imageStore.loadingState = LoadingState.loading
    setTimeout(() => {
        imageStore.images = [
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/c7f5291ecab14e55a9382444247cc2ce.png",
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/62496678a1d942ab892b26d9ad5946b2.jpg",
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/c7f5291ecab14e55a9382444247cc2ce.png",
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/62496678a1d942ab892b26d9ad5946b2.jpg",
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/c7f5291ecab14e55a9382444247cc2ce.png",
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/62496678a1d942ab892b26d9ad5946b2.jpg",
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/c7f5291ecab14e55a9382444247cc2ce.png",
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/62496678a1d942ab892b26d9ad5946b2.jpg",
            "https://moxingshu.oss-cn-shanghai.aliyuncs.com/image/745890cf191e45c599e80624b9563001.jpg",
        ];
        imageStore.loadingState = LoadingState.success;
    }, 500);
}