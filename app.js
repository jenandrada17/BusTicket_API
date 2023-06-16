import express from 'express'
import { getUsers, getUser, createUser, loginUser, addDestination, 
        getDestinations, deleteDestination, updatedestination,
        getDictinctAddressFrom, getDictinctAddressTo } from './database.js'
// import mysql from 'mysql2'

const app = express()

app.use(express.json()) 

app.post("/userlogin", async (req, res) => {
  const { Username, Password } = req.body
  const user = await loginUser(Username, Password)

  if (user) {
    res.status(201).send("Successfully login!")
  }  else {
    res.status(401).send("Invalid username or password!")
  }
}) 

app.get("/getusers", async (req, res) => {
    const users = await getUsers()
    res.send(users)
})

app.get("/getuserid/:id", async (req, res) => {
    const id = req.params.id 
    const user =
    res.send(user)
})

app.post("/createuser", async (req, res) => {
    const { Firstname, Lastname, Middlename, Position, Username, Password, ConfirmPassword } = req.body
    const user = await createUser(Firstname, Lastname, Middlename, Position, Username, Password, ConfirmPassword)
 
  if (user == "Username already Exists!") {  
    res.status(401).send("Username already exist!") 
  } else if (user == "Tha password don't match!") { 
    res.status(401).send("Tha password don't match!") 
  }  else {
    res.status(201).send("User successfully added!")
  } 

}) 

app.post("/adddestination", async (req, res) => { 
  const { from_address, to_address, rate, note } = req.body
  const destination = await addDestination( from_address, to_address, rate, note )

if (destination == "Destination already exists!") {  
  res.status(401).send(destination)   
}  else {
  res.status(201).send(destination)
} 

}) 

app.get("/getdestinations", async (req, res) => {
  const destinations = await getDestinations() 
  res.send(destinations)
}) 

app.get("/getDictinctAddressFrom", async (req, res) => {
  const destinations = await getDictinctAddressFrom() 
  res.send(destinations)
}) 

app.get("/getDictinctAddressTo", async (req, res) => {
  const destinations = await getDictinctAddressTo() 
  res.send(destinations)
}) 

app.delete("/deletedestination/:desid", async (req, res) => { 
  const destinations = await deleteDestination( req.params.desid ) 
  res.send(destinations)
}) 

app.put("/updatedestination/:desid", async (req, res) => {  
  const { desid } = req.params
  const { from_address, to_address, rate, note } = req.body 

  const destinations = await updatedestination( desid, from_address, to_address, rate, note ) 
  res.send(destinations)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})
 
