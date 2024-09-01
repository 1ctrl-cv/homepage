// Author: XLuoFox.DSY
//做出了一些更改，例如移除了对同作者的 易.js 的依赖

// 读LocalStorage
function localStorageRead(name, defau = null) {
    const value = localStorage.getItem(name);
    return value !== null ? value : defau;
}

// 获取访问者IP
async function getVistrerIP() {
    try {
        const req = await fetch("https://api.ipify.org?format=json");
        if (!req.ok) {
            throw new Error("网络请求失败：" + req.statusText);
        }
        const dat = await req.json();
        return dat.ip;
    } catch (err) {
        console.error("getVisiterIP", err);
        return err.message;
    }
}

// 获取访问者UserAgent
function getVisiterUA() {
    return window.navigator.userAgent;
}

// 云湖发送消息
async function yhSendMsg(token, recvId, recvType, contentType, text) {
    const Header = new Headers({
        "Content-Type": "application/json",
    });
    const Data = JSON.stringify({
        recvId: recvId,
        recvType: recvType,
        contentType: contentType,
        content: {
            text: text,
        },
    });
    const reqOpt = {
        method: "POST",
        headers: Header,
        body: Data,
        redirect: "follow",
    };
    try {
        const response = await fetch(
            `https://chat-go.jwzhd.com/open-apis/v1/bot/send?token=${token}`,
            reqOpt
        );
        const req = await response.text();
        // console.log("yhSendMsg", req);
    } catch (err) {
        console.error("yhSendMsg", err);
    }
}

// 获取访问者经纬度
// 不想用但留着
// 这个涉及别人隐私太危险了，拒绝开盒，从你我做起
// function xl_客户端_获取_用户地理位置(经度变量, 纬度变量) {
//   if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(
//       (位置) => {
//         const c_纬度 = 位置.coords.latitude;
//         const c_经度 = 位置.coords.longitude;
//         yi_调试_输出("客户端_获取_用户地理位置", `纬度: ${c_纬度}, 经度: ${c_经度}`);
//         经度变量.value = c_经度;
//         纬度变量.value = c_纬度;
//       },
//       (错误) => {
//         yi_调试_输出_错误("客户端_获取_用户地理位置", 错误.message);
//       }
//     );
//   } else {
//     yi_调试_输出_错误("客户端_获取_用户地理位置", "Geolocation API在此环境中不可用。");
//   }
// }

// 向云湖账号发送信息
function sendVisit() {
    const visitLocation = window.location.href;
    if (visitLocation.includes("file:///")) {
        console.log("不发送, 因为地址栏包含file:///");
    } else {
        console.log("欢迎访问")
        const time = new Date().toLocaleString();
        let visitsNumber = parseInt(localStorageRead("visitsNumber", 0), 10);
        visitsNumber += 1;
        localStorage.setItem("visitsNumber", visitsNumber);
        const UA = getVisiterUA();

        getVistrerIP().then((visiterIP) => {
            yhSendMsg(
                "68f6dfadd46c4c9c8eb18d926bab4d44", // 拿吧，反正是机器人token
                "4624989",
                "user",
                "markdown",
                `### 有人访问你的屎山主页了! \n- 访问时间：${time}\n- 累计访问：${visitsNumber}次\n- 访问IP: ${visiterIP}\n- UserAgent: ${UA}`,
            );
        });
    }
}

sendVisit()
