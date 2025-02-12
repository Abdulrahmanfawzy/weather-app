let btn = document.getElementById("btn");
let day = document.querySelector(".day");
let clouds = document.querySelector(".clouds");
let h2_day = document.querySelector(".h2_day");
let img_county = document.querySelector("#img_county");
let cityname = document.querySelector(".cityname h1");
let cityname_span = document.querySelector(".cityname span");
let humidity_percent = document.querySelector(".humidity_percent");
let Pressure_percent = document.querySelector(".Pressure_percent");
let Tempreture_percent = document.querySelector(".Tempreture_percent");
let Cloud_percent = document.querySelector(".Cloud_percent");
let Wind_percent = document.querySelector(".Wind_percent");
let Sun_percent = document.querySelector(".Sun_percent");
let image = document.querySelector(".image img");
let week_flex = document.querySelector(".week_flex");
let max_temp_div = document.querySelector(".max_temp_div");
let min_temp_div = document.querySelector(".min_temp_div");
let weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
let gettingDay = new Date();
let day_title = gettingDay.getDay();


btn.addEventListener("click" , myFun);
// search_inpt.addEventListener("keyup" , myFun);

function myFun(){
    let search_inpt = document.getElementById("search_inpt");
    let val = search_inpt.value;
    if(search_inpt.value != ""){

        fetch(`https://api.weatherapi.com/v1/forecast.json?q=${val}&key=7606b22ddf334cdba8f231335221810&days=7`)

        .then((response)=>{
            if(response.status == 400){
                Swal.fire({
                    title: 'City location not found',
                    icon: 'error',
                    iconHtml: '!',
                    cancelButtonText: 'Cancel',
                  })
            }else{
                let data = response.json()
                return data
            }
        }
        ).then((data)=>{
            console.log(data);
            let {text} = data.forecast.forecastday[0].day.condition;
            let {humidity} = data.current;
            let {pressure_mb} = data.current;
            let {wind_kph} = data.current;
            let {name} = data.location;
            let {country} = data.location;
            let {maxtemp_c} = data.forecast.forecastday[0].day;
            let {mintemp_c} = data.forecast.forecastday[0].day;

            img_county.src = `https://source.unsplash.com/600x550/?${country}`;

            (function testsasd(){
                let y = data.forecast.forecastday[0].date;
                let x = new Date(y).getDay();
                h2_day.innerHTML = weekday[x];
            })();

            image.src = `https:${data.forecast.forecastday[0].day.condition.icon}`;
            cityname.innerHTML = name;
            cityname_span.innerHTML = "("+country+")";
            humidity_percent.innerHTML = humidity + "%";
            Pressure_percent.innerHTML = pressure_mb + " k/h";
            clouds.innerHTML = text;
            Wind_percent.innerHTML = wind_kph + " km/h";
            Cloud_percent.innerHTML = data.current.cloud + "%";
            Sun_percent.innerHTML = data.forecast.forecastday[0].astro.sunrise;
            max_temp_div.innerHTML = `Max: <b>${maxtemp_c}°C</b> `
            min_temp_div.innerHTML = `Min: <b>${mintemp_c}°C</b> `

            // ------------------------------
            week_flex.innerHTML = "";


            for(let i = 1; i < weekday.length; i++){
                
                function tests() {
                    let y = data.forecast.forecastday[i].date;
                    let x = new Date(y).getDay();
                    return weekday[x];
                }

                let box = `
                <div class="week_day_box">
                    <div class="day_marg">${tests()}</div>
                    <div class="day_icon">
                        <img src="https:${data.forecast.forecastday[i].day.condition.icon}" alt="">
                    </div>
                    <div class="day_desc">${data.forecast.forecastday[i].day.condition.text}</div>
                    <div class="day_tmp">
                        <div class="tmp_two">Min: <b>${data.forecast.forecastday[i].day.mintemp_c}°C</b></div>
                        <div class="tmp_one">Max: <b>${data.forecast.forecastday[i].day.maxtemp_c}°C</b></div>
                    </div>
                </div>
                `;
                week_flex.innerHTML += box;
            }
            
        })
    }else{
        Swal.fire({
            title: 'You have to write any city name',
            icon: 'error',
            iconHtml: '!',
            cancelButtonText: 'Cancel',
          })
    }
}
