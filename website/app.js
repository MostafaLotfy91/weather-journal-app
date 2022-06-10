let key = ",&appid=90f1bf24683d441768855cb450fb9abd&units=metric"; //&units=metric used to convert the return value to celisius 
let baseURI = "https://api.openweathermap.org/data/2.5/weather?zip=";
let country = document.getElementById('country');
let zip = document.getElementById('zip');
let feelings = document.getElementById('feelings');
let coming = document.querySelector(".coming");
let date = new Date();
let newDate = date.toDateString(); //function to convert data to string

let massage = document.getElementById('massage');

//first function to get data

let getData = async(url) => {
    try {
        let res = await fetch(url);
        let resultData = await res.json();
        if (resultData.cod != 200) {
            return resultData;

        }
        return resultData;
    } catch (error) {
        console.log(error);
    }
};
// Api Data Retreived will be like this shape so we will chose what we need only  
// {  
//     "coord":{  
//         "lon":-79.42,
//         "lat":43.7
//      },
//      "weather":[  
//         {  
//            "id":804,
//            "main":"Clouds",
//            "description":"overcast clouds",
//            "icon":"04n"
//         }
//      ],
//      "base":"stations",
//      "main":{  
//         "temp":292.15,
//         "pressure":1023,
//         "humidity":72,
//         "temp_min":291.15,
//         "temp_max":293.15
//      },
//      "visibility":14484,
//      "wind":{  
//         "speed":5.7,
//         "deg":130
//      },
//      "clouds":{  
//         "all":90
//      },
//      "dt":1537837200,
//      "sys":{  
//         "type":1,
//         "id":3721,
//         "message":0.0039,
//         "country":"CA",
//         "sunrise":1537873704,
//         "sunset":1537916966
//      },
//      "id":6167865,
//      "name":"Toronto",
//      "cod":200
//   }
// function number 2 responsile for get the data from api  data
let projectData = async(data) => {
    try {
        if (data.cod != 200) { // because it can return 404 and 400 
            return data;
        }
        let info = {
            date: newDate,
            temp: Math.round(data.main.temp),
            content: feelings.value,
            city: data.name,
            weather: data.weather[0].description,
            country: data.sys.country,
            icon: data.weather[0].icon
        };
        return info;

    } catch (error) {
        console.log(error);
    }
};

// third one responsiple for post the data 
let postData = async(url = '', data = {}) => {
    let response = await fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        let result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
};
// retrieve data from api 
let retrieveData = async(url) => {
    let response = await fetch(url);
    try {
        let result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
    }
};

let updateUI = async(info) => {
    if (!info.massage) {
        document.getElementById('city').innerHTML = info.city + ", " + info.country;
        document.getElementById('weather').innerHTML = info.weather;
        document.getElementById('temp').innerHTML = `${info.temp}&#176`;
        document.getElementById('content').innerHTML = info.content ? info.content : "What do you feel;";
        document.getElementById('date').innerHTML = info.date;
        let icon = info.icon;
        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
        document.getElementById('wicon').setAttribute('src', iconurl);
        console.log(iconurl);
        massage.innerHTML = "";
        document.querySelector(".weather-info").style.opacity = "1";
        setTimeout(async() => {
            document.querySelector(".api-input").style.opacity = "1";
            document.querySelector(".api-input").style.display = "block";
            document.querySelector(".api-input").scrollIntoView();
        }, 1000);
    } else {
        document.querySelector(".weather-info").style.opacity = "1";
        setTimeout(async() => {
            document.querySelector(".api-input").style.opacity = "0";
            document.querySelector(".api-input").style.display = "none";
            massage.innerHTML = info.massage;
        }, 1000);

    }
};


let generate = document.querySelector("#generate");
generate.addEventListener("click", (e) => {
    e.preventDefault();
    let madeURL = `${baseURI}${zip.value}${key}`;
    //fetch the url and get the data the needs to be selected
    getData(madeURL).
    then((data) => {
        //get the info we want from the coming data of the weather
        projectData(data).
        then((info) => {
            //post the data to a url called "/add" 
            postData("/add", info).
            then((data) => {
                //retrieve the data sent to the server from "/add" post 
                retrieveData("/all").
                then(data => {
                    // now am able to update the ui with the data i got
                    updateUI(data);
                });
            });
        });

    });
    // this line i used to see if the link worked will or not 
    console.log(madeURL);
});