# node
```
v16.13.2

vim ~/.npmrc
registry=https://registry.npmmirror.com
disturl=https://npmmirror.com/mirrors/node
electron_mirror=https://npm.taobao.org/mirrors/electron/
```

# 安装依赖
```
cd frontend && npm i && cd ..
cd backend && npm i && cd ..
npm i
```

# 开发
启动前端
```
cd frontend
npm run dev
```

启动electron
```
npm run dev
```

# 打包
```
npm run make
```