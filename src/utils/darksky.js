const request = require ('request')

const weather = (lat,long,callback ) => {
    const url = 'https://api.darksky.net/forecast/cfb3fc5bc945ec17d561612ea3b55684/' + encodeURIComponent(lat)+ ','+ encodeURIComponent(long)+'?units=si'
    

    request({ url, json: true }, (error,{body}) => {
    
      
        if(error) {
           console.log('Unable to connect',undefined)
       } else {
           
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. The high today is '+body.daily.data[0].temperatureHigh + 'with a low of'+ body.daily.data[0].temperatureLow+'. There is a ' + body.currently.precipProbability + '% chance of rain.')


           

       }
       
        
    })
}

module.exports =  weather