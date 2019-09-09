const path = require('path')
const hbs = require('hbs')
const geo = require('./utils/geocode')
const weather = require('./utils/darksky')


const express = require ('express')
const app = express()
const directPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const port = process.env.PORT || 3001


//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

app.set('views',viewsPath)
app.use(express.static(directPath))
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'placeholder'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About page',
        name: 'placeholder'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'hello',
        title: 'Help',
        name: 'Parth'
    })
})

app.get('/weather', (req,res) => {
    
    if (!req.query.address) {
        return res.send( {
            error: 'You must provide the address!'
        })
    }
    
    geo(req.query.address,(error,{ latitude, longitude, location } = {}) => {

        if(error) {
            return res.send({error})
        }

        weather(latitude,longitude,(wError,forecastData) => {
            if(error) {
                return res.send({wError})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })


    } )
    
    
    


    
})

app.get('/products',(req,res) => {
    
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })

    }

    
    console.log(req.query.search)
    res.send ({
        products: []
    })
})





app.get('/help/*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Parth',
        errorMessage: 'Help article not found'
    })
})



app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Parth',
        errorMessage: 'Page not found. '
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})