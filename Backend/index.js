const express = require('express')
const adminRouter = require('./routes/adminRoutes')
const supplierRoutes = require('./routes/supplierRoutes')

const app = express()

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// routers
app.use('/api/admin', adminRouter)
app.use('/api/supplier', supplierRoutes)

// port and connection to server
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server starter on port: ${PORT}`)
})