import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

export const compress = async () => {
    return await imagemin(['images/*.{jpg,png}'], {
        destination: 'build/images',
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
}