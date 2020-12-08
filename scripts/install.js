const os = require('os');
const fs = require('fs');

async function replaceLevelDown() {
    let platform = os.platform();
    let arch =  os.arch();   
    let nodeFolder= `${__dirname}/../lib/build/release`;    
    let targetFile = nodeFolder + "/leveldown.node"
    try {
        let levelFolder = `${__dirname}/../lib/level_prebuilds`;
        let fileName;
        switch(platform){
            case "win32":
                if (arch == "x64") {
                    fileName = "/win32-x64/node.napi.node";
                }
                else {
                    fileName = "/win32-ia32/node.napi.node";
                }
                break;
            case "linux":
                if (arch == "x64") {
                    fileName = "/linux-x64/node.napi.glibc.node";
                }
                else if (arch == "arm64") {
                    fileName = "/linux-arm64/node.napi.armv8.node";
                }
                else if (arch == "arm") {
                    fileName = "/linux-arm/node.napi.armv7.node";
                }
                break;            
            default:
                throw new Error("Unknown operation system");
        }        
        let sourceFile =  levelFolder + fileName;
        sourceFile = sourceFile.replace(/\\/ig, '/');   
        //这里进行文件替换            
        await fs.copyFile(sourceFile, targetFile , ()=> {});
    } catch (e) {
        if (e.code === 'ENOENT')
            return;
        throw e;
    }
}

(async ()=>{    
    await replaceLevelDown();
    console.log('Installed Success!');
})();