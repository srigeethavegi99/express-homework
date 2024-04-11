const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res)=>{
    res.json([{name: "Geetha"}])
})

app.listen(port, ()=>console.log(`App is running on http://localhost:${port}`))