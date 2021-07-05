const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production'; // 是否生产环境

const resolve = (dir) => {
    return path.resolve(__dirname, './', dir)
}

module.exports = {
    // 什么环境
    mode: isProd ? 'production' : 'development',
    // 入口文件
    entry: {
        index: './src/index.ts'
    },
    // 出口文件
    output: {
        path: resolve('dist'),
        filename: 'index.js',
        library: 'editor',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'] // 模块中引入此类型文件可以忽略格式 
    },
    // 配置哪些文件需要处理
    module: {
        rules: [
            {
                test: /\.tsx?$/, // 遇到哪些文件
                use: 'ts-loader', // 使用什么插件
                include: [resolve('src')] // 处理src文件夹下的文件
            }
        ]
    },
    // 插件
    plugins: [
        new CleanWebpackPlugin()
    ],
    // 
    devServer: {
        host: 'localhost', // 主机名
        stats: 'errors-only', // 打包日志输出日志
        prot: 3000, // 端口
        open: true 
    },
    //  此选项控制是否生成
    devtool: 'eval-source-map' // eval-source-map 原始代码
}