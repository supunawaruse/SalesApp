const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/', (req,res) => {
    res.json({message:"Hello Project initiated"})
})

app.listen(8080, () => {
    console.log('Server starter on port 8080')
})