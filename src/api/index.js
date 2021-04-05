export default {
    // 登入Account驗證
    login: function(item) {
        return new Promise((resolve, reject) => {
            let accounts = [
                {
                    id: 'heineken751121@gmail.com',
                    pass: '12345'
                }
            ]
            // 一般會在這邊AJAX 呼叫後端,這邊簡單演示狀況
            // 帳號存在嗎?
            let isAccountExist = accounts.some( (i) => {
                return i.id === item.id
            })

            if (isAccountExist){
                // 帳號密碼正確嗎?
                let isAccountSuccess = accounts.every( (i) => {
                    return i.id === item.id && i.pass === item.pass
                })
                if(isAccountSuccess) {
                    resolve({data: {
                        id: 1,
                        name: '王郁翔'
                    }})
                } else {
                    reject({error: 1})
                }
            } else {
                reject({error: 10001})
            }
        })
    },
    // 取得訂單資訊
    getOrders: function() {
        return new Promise((resolve) => {
            let orders = sessionStorage.getItem('orders')
            if(orders){
                orders = JSON.parse(decodeURIComponent(orders, 'utf-8'))    
            } else {
                orders = [
                    {
                        id: 1,
                        name: 'Livi優活 抽取式衛生紙(100抽x10包x10串/箱)',
                        logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
                        status: {
                          code: 3,
                          type: '已取消'
                        },
                        date: '107/6/12'
                    },
                    {
                        id: 2,
                        name: 'BALMUDA The Toaster 百慕達烤麵包機-黑色',
                        logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
                        status: {
                          code: 2,
                          type: '已成立'
                        },
                        date: '108/7/21'
                    },
                    {
                        id: 3,
                        name: '贈-短慧萬用鍋HD2133+三合一濾網「LG樂金」韓國原裝...',
                        logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
                        status: {
                          code: 1,
                          type: '處理中'
                        },
                        date: '108/6/2'
                     },
                     {
                        id: 4,
                        name: 'Apple AirPds 2',
                        logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
                        status: {
                          code: 4,
                          type: '已送達'
                        },
                        date: '108/3/02'
                    }
                ]
                sessionStorage.setItem('orders', encodeURIComponent(JSON.stringify(orders), 'utf-8'))
            }
            resolve({data: orders})
        })
    }
}
