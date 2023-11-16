 import inquirer from 'inquirer';
 import { faker } from '@faker-js/faker';

 interface User {
      id:number
      pin:number
      name:string
      accountNumber:number
      balance:number
 }

 const createUser = ()=>{
    let users:User[] = []

    for(let i = 0;i<5;i++){
        let user:User = {
            id:i,
            pin:1000 + i,
            name:faker.person.fullName(),
            accountNumber:Math.floor(100000000 * Math.random()*9000000000),
            balance: 1000000 * i,
        };

        users.push(user); 

    }

    return users;

 }

// ATM Machine

const atmMachine =async(users:User[])=>{

const res = await inquirer.prompt({
    type:"number",
    message:"Enter Pin Code",
    name:"pin"
})
    // console.log("Welcome Account Holder")
    const user = users.find(val => val.pin == res.pin)

    if(user){
        console.log(`Welcome ${user.name}`)
       atmFunc(user)
        return
    }
    console.log ("Invalid User Pin")
};
     
// ATM Function

const atmFunc = async(user:User)=>{
    const ans = await inquirer.prompt({
        type:"list",
        name:"select",
        message:"What Do You Want To Do?",
        choices:["Withdraw","Balance","Exit","Deposite"]
    })
    if(ans.select == "Withdraw"){
        const ammount = await inquirer.prompt({
            type:"number",
            message:"Enter Your Ammount",
            name:"rupee",
        })
        if(ammount.rupee > user.balance){
            return console.log("Insufficent Balance")
        }
        if(ammount.rupee > 40000){
            return console.log("Out Of Limit")
        }
        console.log(`Withdraw Ammount ${ammount.rupee}`)
        console.log(`Balance ${user.balance-ammount.rupee}`)
    }
    if(ans.select == "Balance"){
        console.log(`Balance ${user.balance}`)
        return
    }
    if(ans.select == "Exit"){
        console.log("Thanks For Using ATM")
        return
    }
    if(ans.select == "Deposite"){
        const deposite = await inquirer.prompt({
            type:"number",
            message:"Enter Your Ammount",
            name:"rupee"
       })
       console.log(`Deposite Ammount ${deposite.rupee}`)
       console.log(`Total Balance ${user.balance + deposite.rupee}`)
  
    }

}


 const users = createUser()

atmMachine(users)









