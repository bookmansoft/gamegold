/**
 * 联机单元测试：本地全节点提供运行时环境
 */

const uuid = require('uuid/v1')

//引入工具包
const toolkit = require('gamegoldtoolkit')
//创建授权式连接器实例
const remote = new toolkit.conn();
remote.setFetch(require('node-fetch'))  //兼容性设置，提供模拟浏览器环境中的 fetch 函数
.setup({
    type:   'testnet',
    ip:     '127.0.0.1',          //远程服务器地址
    head:   'http',               //远程服务器通讯协议，分为 http 和 https
    id:     'primary',            //默认访问的钱包编号
    apiKey: 'bookmansoft',        //远程服务器基本校验密码
    cid:    'xxxxxxxx-game-gold-root-xxxxxxxxxxxx', //授权节点编号，用于访问远程钱包时的认证
    token:  '02c6754571e0cf8949fb71906a501ba520b8e960c7eb35cb3931e362e5d25d2bc5', //授权节点令牌固定量，用于访问远程钱包时的认证
    structured: true,
});

//CP
let cp = {
    name: uuid(),
    id: '',
};

//买家 alice
let alice = {
    name: 'alice',
    addr: '',
};
//卖家 bob
let bob = {
    name: 'bob',
    addr: '',
};

//消费者
let customer = {
    name: 'p1',     //用户编号
    sn: uuid(),     //订单编号
};

//设为 false 来检测零确认机制，设为 true 则更为稳妥的使用上链数据
let blockVerify = false;

describe('凭证管理', () => {
    it('准备工作', async () => {
        //强制设置同步完成标志
        await remote.execute('miner.setsync', []);

        //检测块高度，必要时进行挖矿以确保创世区块成熟
        let ret = await remote.execute('block.tips', []);
        if(ret.result[0].height < 100) {
            for(let i = ret.result[0].height; i < 101; i++) {
                await remote.execute('miner.generate', [1]);
                await (async function(time){
                    return new Promise(resolve =>{
                        setTimeout(resolve, time);
                    });
                })(500);
            }
        }
    });

    it('注册CP', async () => {
        //注册一个新的CP
        let ret = await remote.execute('cp.create', [cp.name, 'http://127.0.0.1']);

        //确保该CP数据上链
        await remote.execute('miner.generate', [1]);
        
        //查询并打印CP信息
        ret = await remote.execute('cp.byName', [cp.name]);
        cp.id = ret.result.cid;
        //console.log(cp);

        //在该CP下注册用户子帐号, 记录其专属地址
        ret = await remote.execute('token.user', [cp.id, alice.name, null, alice.name]);
        alice.cid = cp.id;
        alice.addr = ret.result.data.addr;

        ret = await remote.execute('token.user', [cp.id, bob.name, null, bob.name]);
        bob.cid = cp.id;
        bob.addr = ret.result.data.addr;

        //为用户转账
        await remote.execute('tx.send', [alice.addr, 500000000]);
        await remote.execute('tx.send', [bob.addr, 500000000]);

        if(blockVerify) {
            await remote.execute('miner.generate', [1]);
        }

        console.log(alice);
        console.log(bob);
    });

    it('一级市场发行', async () => {
        let ret = await remote.execute('stock.offer', [cp.id, 1000, 1000]);
        //console.log(ret.result);
        if(blockVerify) {
            await remote.execute('miner.generate', [1]);
        }
    });

    it('一级市场购买', async () => {
        let ret = await remote.execute('stock.purchase', [cp.id, 500, alice.name]);
        //console.log(ret.result);
        if(blockVerify) {
            await remote.execute('miner.generate', [1]);
        }
    });

    it('无偿转让', async () => {
        let ret = await remote.execute('stock.send', [cp.id, 100, bob.addr, alice.name]);
        //console.log(ret.result);
        if(blockVerify) {
            await remote.execute('miner.generate', [1]);
        }
    });

    it('二级市场拍卖', async () => {
        let ret = await remote.execute('stock.bid', [cp.id, 200, 2000, alice.name]);
        //console.log(ret);
        if(blockVerify) {
            await remote.execute('miner.generate', [1]);
        }
    });

    it('二级市场购买', async () => {
        let ret = await remote.execute('stock.auction', [cp.id, alice.addr, 100, 2000]);
        //console.log(ret.result);
        if(blockVerify) {
            await remote.execute('miner.generate', [1]);
        }
    });

    it('发起一个支付交易', async () => {
        let ret = await remote.execute('order.pay', [cp.id, customer.name, customer.sn, 100000]);
        //console.log(ret.result);
        if(blockVerify) {
            await remote.execute('miner.generate', [1]);
        }
    });

    it('打印凭证列表，验证权益分配的有效性', async () => {
        if(blockVerify) {
            await remote.execute('miner.generate', [1]);
        }

        let ret = await remote.execute('stock.list', [['cid',cp.id]]);
        for(let item of ret.result.list) {
            item.stock = JSON.stringify(item.stock);
            console.log(item);
        }
    });
});
