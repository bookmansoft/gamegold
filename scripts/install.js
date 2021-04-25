const os = require('os');
const fs = require('fs');

async function replaceLevelDown() {
    let platform = os.platform();
    let arch =  os.arch();   
    let nodeFolder= `${__dirname}/../lib/build/Release`;    
    let targetleveldownFile = nodeFolder + "/leveldown.node"
    let targetsecp256k1File = nodeFolder + "/secp256k1.node"
    let levelFolder = `${__dirname}/../lib/level_prebuilds`;
    let secp256k1Folder = `${__dirname}/../lib/secp256k1_prebuilds`;
    try {
        
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
            case "darwin":
                if (arch == "x64") {
                    fileName = "/darwin-x64/node.napi.node";
                }
                break;
            default:
                throw new Error("Unknown operation system");
        } 
        //替换leveldown预编译版本 
        let levelsourceFile =  levelFolder + fileName;
        levelsourceFile = levelsourceFile.replace(/\\/ig, '/');                 
        await fs.copyFile(levelsourceFile, targetleveldownFile , ()=> {});
        //替换secp256k1预编译版本
        let secp256k1sourceFile =  secp256k1Folder + fileName;
        secp256k1sourceFile = secp256k1sourceFile.replace(/\\/ig, '/');                 
        await fs.copyFile(secp256k1sourceFile, targetsecp256k1File , ()=> {});
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