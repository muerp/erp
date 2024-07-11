
import JSZip from 'jszip'
import SparkMD5 from 'spark-md5'
export const diskSize = (size: number) => {
    if (size < 1024) {
        return size + 'B'
    } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + 'KB'
    }
    return (size / 1024 / 1024).toFixed(2) + 'M'
}
export const download = (blob: Blob, filename: string) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${filename}`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
}
export const toZip = async (files: any[]) => {
    const zip = new JSZip();
    for (let i = 0; i < files.length; ++i) {
        let item = files[i];
        if (item.buffer) {
            let blob = new Blob([item.buffer], { type: item.file.type });
            zip.file(item.file.name, blob, { binary: true })
        }
    }
    return zip.generateAsync({
        type: 'blob',
        compression: "DEFLATE",
        compressionOptions: {
            level: 9
        }
    }).then(content => {
        return content;
    })
}
export const fileMD5 = (file: any) => {
    return new Promise((resolve, reject) => {
        let blobSlice = File.prototype.slice, //|| File.prototype.mozSlice || File.prototype.webkitSlice,
            chunkSize = 2097152,                             // 切片读取文件
            chunks = Math.ceil(file.size / chunkSize),
            currentChunk = 0,
            spark = new SparkMD5.ArrayBuffer(),
            fileReader = new FileReader();

        fileReader.onload = function (e) {
            console.log('read chunk nr', currentChunk + 1, 'of', chunks);
            spark.append(e.target?.result as any);                   // Append array buffer
            currentChunk++;

            if (currentChunk < chunks) {
                loadNext();
            } else {
                resolve(spark.end());
            }
        };

        fileReader.onerror = function () {
            reject();
        };

        function loadNext() {
            let start = currentChunk * chunkSize,
                end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        }

        loadNext();
    });

}