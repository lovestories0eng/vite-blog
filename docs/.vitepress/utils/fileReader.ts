import * as fs from 'fs';
import * as path from 'path';

// 读取文件的逻辑拉出
function fsReadDir(dir: string) {
    return new Promise<string[]>((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) reject(err);
            resolve(files);
        });
    });
}
// 获取fs.stats的逻辑拉出
function fsStat(path: string) {
    return new Promise<fs.Stats>((resolve, reject) => {
        fs.stat(path, (err, stat) => {
            if (err) reject(err);
            resolve(stat);
        });
    });
}
// 搜索文件主方法
async function fileSearch(dirPath: string) {
    const files = await fsReadDir(dirPath);
    const promises = files.map(file => {
        return fsStat(path.join(dirPath, file));
    });
    const datas = await Promise.all(promises).then(stats => {
        for (let i = 0; i < files.length; i += 1) files[i] = path.join(dirPath, files[i]);
        return { stats, files };
    });
    datas.stats.forEach(stat => {
        const isFile = stat.isFile();
        const isDir = stat.isDirectory();
        if (isDir) {
            fileSearch(datas.files[datas.stats.indexOf(stat)]);
        }
        if (isFile) 
            console.log(datas.files[datas.stats.indexOf(stat)]);
    });
}

export default fileSearch;

fileSearch("../../../docs")