# npm的bundleDependencies
    bundleDependencies 是用户了安装了某个包package-a之后，将package-a所依赖的包汇总到package-a自身的目录下;
    如果没有bundleDependencies，那么安装了package-a之后，package-a的依赖包会在外面，不汇总到package-a目录下;  
    如果打包发布的时候希望依赖的包也在该包内才会指定依赖的包，一般发布后填写false;  

# npm 依赖冗余
    当项目依赖一个插件的多个版本时，会全部引进进来，然后分布放在依赖它们的项目下的node_modules下面；
    当包内指定的版本和外部node_modules里目录下的版本不一样时，会在该包的node_modules里重新安装;
    如果多次依赖的版本相同时，则放在顶级的node_modules下面；

# devDependencies
    开发时依赖，如果在执行npm install前执行 NODE_ENV=production 将不会执行, 在制作docker-compose 镜像时，可以指定NODE_ENV=production 减小镜像制作后的体积
