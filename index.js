const express = require('express');
const app=express();
// app.use(express.static('./public'))
const {products} = require('./data')

app.get('/',(req,res)=>{
   res.send('<h1>hello</h1> <a href="/api/product/:productID">products</a>')
})
app.get('/api/product',(req,res)=>{
    const newProduct=products.map((product)=>{
    const{id,name,image}=product;
    return {id,name,image}
 })
 return res.json(newProduct)
})
app.get('/api/product/1',(req,res)=>{
    const newProduct=products.find((product)=>product.id===1)
    return res.json(newProduct)
})
app.get('/api/product/:productID',(req,res)=>{
   const{productID}=req.params
   const newProduct=products.find((product)=>product.id===Number(productID))
   if(!newProduct){
    return res.status(404).send("Produc doesn't exist with this id")
   }
    return res.json(newProduct)

})
app.get('/api/product/:productID/reviews/:reviewID',(req,res)=>{
    console.log(req.param)
    // /api/product/4/reviews/abc'
    // {productID:4,reviewID:abc}
    return res.json("helloword")
})
app.get('/api/v1/query',(req,res)=>{
    // http://localhost:5001/api/v1/query?name=john&id=4

    console.log(req.query)
    // { 'name:john': '', id: '4' }
    res.send("hello world")
})
app.get('/api/v1/query1',(req,res)=>{
    const{search,limit}= req.query;
    let sortedProduct =[...products]
    if(search){
        sortedProduct = sortedProduct.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if(limit){
        sortedProduct = sortedProduct.slice(0,Number(limit))
    }
    if(sortedProduct.length===0){
        // res.status(404).send("No producut matched")
        return res.status(200).json({success:true,data:[]})
    }
    return res.status(200).json(sortedProduct)
})




app.all('*',(req,res)=>{
    res.send(" resource not found")
})
app.listen(5001,()=>{
 console.log("hello servr")
})