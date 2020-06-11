let TOKEN = null

function registerCall(id, url, headers = false, callback) {
    document.getElementById('req' + id).onclick = _ => {
        const Http = new XMLHttpRequest()
        Http.open("GET", url)

        if (headers) Http.setRequestHeader('Authorization', `idk ${TOKEN}`)
        
        Http.onreadystatechange = function(x) {
            if (this.readyState == 4 && typeof callback === typeof (a => {})) {
                callback(this.status, Http.responseText)
            }
        }
    
        Http.send()
    
    }
}

registerCall(0, 'http://localhost:3000/api/login', {}, (status, data) => {
    const data1 = JSON.parse(data).token
    TOKEN = data1 ?? 'Nope'
    document.getElementById('res0').innerHTML = 'Logged: ✔<br><br>Token: ' + TOKEN
    document.getElementById('res1').innerHTML = ''
})

registerCall(1, 'http://localhost:3000/api/posts', true, (status, data) => {
    let text = null
    if (data == 'Forbidden') text = 'Forbidden'
    else {
        const data1 = JSON.parse(data)
        text = `
            User: ${data1.authData.user.username}<br>
            Email: ${data1.authData.user.email}<br>
            Message: ${data1.message}
        `
    }
    document.getElementById('res1').innerHTML = text
})

document.getElementById('logout').onclick = _ => {
    TOKEN = null
    document.getElementById('res0').innerHTML = 'Logged: ❌'
    document.getElementById('res1').innerHTML = ''
}
