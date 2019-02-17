const express = require('express')

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(`${__dirname}/index.html`)
})

app.listen(2222, () => {
    console.log('Working on it...')
})
