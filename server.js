import express, { response } from 'express';

//Set up a server
const app = express();



//1. Be Polite, Greet The User
app.get('/greetings/:userName', (req, res) => {
    res.send(`<h1>Hello there ${req.params.userName}!</h1>`)
})

//2. Rolling the Dice

app.get('/roll/:myNumber', (req, resp) => {
    const myNumber = req.params.myNumber;
    const checkNumber = Number(myNumber);
    if (typeof checkNumber === 'number' && isFinite(checkNumber)) {
        const newNumber = Math.floor(Math.random() * (checkNumber + 1));
        resp.send(`<h1>You rolled a ${newNumber}!</h1>`)
    }
    else {
        resp.send(`<h1>You must specify a number!</h1>`)
    }
})

//3. I Want That One

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

app.get('/collectibles/:indexNumber', (req, resp) => {
    const myIndex = Number(req.params.indexNumber)
    if (typeof myIndex === 'number' && isFinite(myIndex) & myIndex < collectibles.length) {
        const myName = collectibles[myIndex].name;
        const myText = `So, you want the ${collectibles[myIndex].name}? For ${collectibles[myIndex].price} it is yours`
        resp.send(`<h1>S${myText}</h1>`)
    } else {
        resp.send('<h1>This item is not in stock yet</h1>')
    }

})

//4. Filter Shoes by Query Parameters

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes/', (req, resp) => {

    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);
    const type = req.query.type;

    const filteredShoes = shoes.filter(shoe =>
        ((isFinite(minPrice) ? shoe.price >= minPrice:true)
        && (isFinite(maxPrice) ? shoe.price <= maxPrice:true)
        && (typeof (type) === 'string' ? shoe.type === type:true)
    ))

    let responseText = '';
    if (filteredShoes.length === 0) {
        responseText = 'There are currently no shoes in stock that match your criteria'
    } else {
        responseText = 'Available options include:'
        filteredShoes.forEach(shoe => {
            const theName = shoe.name;
            const theType = shoe.type;
            const thePrice = shoe.price
            responseText += `<br> ${theName} ${theType} at price of  $${thePrice}</br>`
        })
    }
    resp.send(`<h1>${responseText} </h1>`)
})


//Set up the listening port on the server
app.listen(3000, () => {
    console.log('I have chosen port 3000 as my local host')
})
