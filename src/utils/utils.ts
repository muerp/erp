export const randomNumber = (num: number) => {
    let s = '';
    for (let i = 0; i < num; ++i) {
        s += ~~(Math.random() * 10)
    }
    return s;
}


export const bytesToUint8Array = (bytes: any) => {
    return new Uint8Array(bytes)
}
export const stringToUint8Array = (s: any) => {
    let buf = new ArrayBuffer(s.length)
    let view = new Uint8Array(buf)
    for (let i = 0; i < s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return view
}
export const uint8ArrayToString = (bytes: any) => {
    let dataString = ''
    for (let i = 0; i < bytes.length; i++) {
        dataString += String.fromCharCode(bytes[i])
    }
    return dataString
}
export const uuid = (): string => {
    return 'xxxxxxxx4xxxyxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
export const isUrl = (url: string) => {
    return /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i.test(url);
}
export const isBase64 = (url: string) => {
    return /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(url);
}

export const svgToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = (e: any) => {
          let svg = e.target.result;
          svg = svg.replace(/[\r\n]/g, "");
          svg = svg.replace(/\s+/g, " ");
          const from = svg.indexOf("<svg");
          const to = svg.indexOf("/svg>");
          const result = svg.substring(from, to) + "/svg>";
          const base64 = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(result);
          resolve(base64);
        };
        fileReader.onerror = function () {
            reject(new Error("文件读取出错，请检查该文件"));
        };
    })
    
}
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e: any) => {
          const base64 = e.target.result;
          resolve(base64);
        };
        fileReader.onerror = function () {
            reject(new Error("文件读取出错，请检查该文件"));
        };
    })
}