const express = require('express');
const router =express.Router();
const pizzaModel=require("../models/pizzaModel");


//GET ALL PIZZA 
router.get('/getAllPizzas',async(req,res)=>{
    try {
        const pizzas=await pizzaModel.find({});
        res.send(pizzas);
    } catch (error) {
        res.json({message:error})
    }
} )
//add a single pizza
router.post('/addPizza',async(req,res)=>{
    const {pizza}=req.body
    try {
      const newPizza=new pizzaModel({
          name:pizza.name,
          image:pizza.image,
          varients:['small','medium','large'],
          description:pizza.description,
          category:pizza.category,
          prices:[pizza.prices]
      })
      await newPizza.save()
      res.status(201).send('New Pizza Added')
    } catch (error) {
        res.json({message:error})
    }
} )

//edit a single pizza
router.post('/getPizzabyid',async(req,res)=>{
    const pizzaId=req.body.pizzaId;
    try {
        const pizza=await pizzaModel.findOne({_id:pizzaId});
        res.send(pizza);
    } catch (error) {
        res.json({message:error})
    }
} );

router.post('/updatepizza',async(req,res)=>{
    const updatedPizza=req.body.updatedPizza;
  const pizza=  await pizzaModel.findOne({_id:updatedPizza._id})
  pizza.name=updatedPizza.name,
  pizza.description=updatedPizza.description,
  pizza.image=updatedPizza.image,
  pizza.category=updatedPizza.category,
  pizza.prices=[updatedPizza.prices]
  await pizza.save()
  res.status(200).send('Pizza update successfully')
  
    try {
        
    } catch (error) {
        res.json({message:error})
    }
});
router.post('/deletepizza',async(req,res)=>{
    const pizzaId=req.body.pizzaId

    try {
        await pizzaModel.findOneAndDelete({_id:pizzaId})
        res.status(200).send("pizza deleted")

    } catch (error) {
       res.status(404).json({message:error})
    }
})
//delete a single pizza

module.exports=router;