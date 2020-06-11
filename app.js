const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) => {
    res.sendFile('./public/index.html')
})

app.get('/api/login', (req,res) => {
    // mock user
    const user = {
        id: 1,
        username: 'test',
        email: 'a@b.c'
    }

    jwt.sign({ user }, 'secretkey', { expiresIn: '10s' }, (err, token) => {
        res.json({ token })
    })
})


// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    
    if (typeof bearerHeader !== 'undefined') {
        
        // set the token
        const idk = bearerHeader.split(' ')
        req.token = idk[1]
        next()

    } else res.sendStatus(403) // forbidden
}


app.get('/api/posts', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus('403') // forbidden
        } else {
            res.json({
                message: 'Post created...',
                authData
            })
        }
    })
})

app.listen(3000, _ => console.log('server on port 30000'))