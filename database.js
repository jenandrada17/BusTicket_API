import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM users") 
    return rows
}

export async function getUser(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM users
    where id = ?
    `, [id]) 
    return rows[0]
}

export async function createUser(Firstname, Lastname, Middlename, Position, Username, Password, ConfirmPassword) {  
    let [resultss] = await pool.query(`SELECT * FROM users where username = ?`, [Username])     
    console.log(resultss.length)
    if ( resultss.length > 0 ) {   
        return "Username already Exists!"
    } else if ( Password !== ConfirmPassword ) {
        return "Tha password don't match!" 
    } else {   
            const [result] = await pool.query(`
            INSERT INTO Users (Firstname, Lastname, Middlename, Position, Username, Password)
            VALUES (?, ?, ?, ?, ?, ?)
            `, [Firstname, Lastname, Middlename, Position, Username, Password]) 

            // console.log("Successfully Saved!") 
            // const id = result.insertId
            return "Successfully Saved!"
    }
}  

export async function loginUser(Username, Password) { 
    console.log(Username)
    console.log(Password)
    let [resultss] = await pool.query(`SELECT * FROM users where username = ? and password = ?`, [Username, Password])    
    console.log(resultss.length)
    if ( resultss.length > 0 ) {   

        if (resultss[0].Username === Username && resultss[0].Password === Password) {
            console.log("User Exists") 
            return true 
        }else{
            console.log("User Doesn't Exists")
            return false
        }  

    }  else {  
        console.log("User Doesn't Exists")  
        return false
    } 
}   

export async function addDestination( From_Address, To_Address, Rate, Note ) {  
    let [resultss] = await pool.query(`SELECT * FROM DESTINATIONS where from_address = ? and to_address = ?`, [From_Address, To_Address])     
    if ( resultss.length > 0 ) {   
        return "Destination already exists!"  
    } else {   
            const [result] = await pool.query(`
            INSERT INTO DESTINATIONS ( from_address, to_address, rate, note )
            VALUES (?, ?, ?, ?)
            `, [ From_Address, To_Address, Rate, Note ]) 
 
            return "Destination successfully added!"
    }
}  

export async function getDestinations() {
    const [rows] = await pool.query("SELECT * FROM destinations order by from_address, to_address")  
    return rows
}   

export async function getDictinctAddressFrom() {
    const [rows] = await pool.query("SELECT DISTINCT from_address FROM destinations order by from_address")  
    return rows
}  

export async function getDictinctAddressTo() {
    const [rows] = await pool.query("SELECT DISTINCT to_address FROM destinations order by to_address")  
    return rows
} 

export async function deleteDestination( DesID ) {  
    let [resultss] = await pool.query(`SELECT * FROM DESTINATIONS where desid = ?`, [DesID])     
    if ( resultss.length > 0 ) {    
        await pool.query(`DELETE FROM DESTINATIONS where desid = ?`, [DesID])
        return "Successfully deleted!"
    } else {
        return "Destination ID does not exists!"
    }
}

export async function updatedestination( DesID, From_Address, To_Address, Rate, Note ) {   
    let [resultss] = await pool.query(`SELECT * FROM DESTINATIONS where desid = ?`, [DesID])      
    if ( resultss.length > 0 ) {    
        await pool.query(`UPDATE DESTINATIONS SET from_address = ?, to_address = ?, rate = ?, note = ? where desid = ?`, [From_Address, To_Address, Rate, Note, DesID])      
        return "Successfully updated!"
    } else {
        return "Destination ID does not exists!"
    }
} 
export async function addTicket( Desid,  Rate, Date_created ) {  
    await pool.query(`
            INSERT INTO ticketing ( desid, rate, date_created )
            VALUES (?, ?, ?)
            `, [ Desid,  Rate, Date_created ]) 
 
            return "Successfully Saved!" 

} 