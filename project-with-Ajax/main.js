
        document.addEventListener('DOMContentLoaded', function () {
            const form = document.getElementById('searchForm');
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                const cityName = document.getElementById("cityName").value || "Hanoi";
                const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=fda735d9a64c454cb6734508230410&q=${cityName}&days=7&aqi=yes&alerts=no`;
                fetch(apiUrl)
                    .then(async response => {
                        let data = await response.json();

                        let isCelsius = true;
                        const btnFahrenheit = document.querySelector('.btn.btn-outline-dark:nth-child(2)');

                        btnFahrenheit.addEventListener('click', function () {
                            if (isCelsius) {

                                const currentTempCelsius = parseFloat(document.getElementById("tem_C").textContent);


                                const tempFahrenheit = data.current.temp_f


                                document.getElementById("tem_C").textContent = tempFahrenheit.toFixed(2) + "°F";

                                isCelsius = false;
                            }
                        });

                        const btnCelsius = document.querySelector('.btn.btn-outline-dark:nth-child(1)'); // Nút °C

                        btnCelsius.addEventListener('click', function () {
                            if (!isCelsius) {

                                const currentTempFahrenheit = parseFloat(document.getElementById("tem_C").textContent);

                                const tempCelsius = data.current.temp_c


                                document.getElementById("tem_C").textContent = tempCelsius.toFixed(2) + "°C";

                                isCelsius = true;
                            }
                        });

                        const cityLatLng = {
                            lat: data.location.lat,
                            lng: data.location.lon
                        };
                        console.log(cityLatLng);
                        const map = new google.maps.Map(document.getElementById('map'), {
                            center: cityLatLng,
                            zoom: 12
                        });
                        const marker = new google.maps.Marker({
                            position: cityLatLng,
                            map: map,
                            title: 'Tên thành phố'
                        });

                        document.getElementById("tem_C").innerHTML = data.current.temp_c + "°C";
                        document.getElementById("local-time").innerHTML = data.location.localtime.slice(10);
                        document.getElementById("image-weather").src = "https:" + data.current.condition.icon;
                        document.getElementById("wind_mph").innerHTML = data.current.wind_kph + " km/h";
                        document.getElementById("dir").innerHTML = data.current.wind_dir;
                        document.getElementById("am").innerHTML = data.forecast.forecastday[0].astro.sunrise;
                        document.getElementById("pm").innerHTML = data.forecast.forecastday[0].astro.sunset;
                        document.getElementById("vis_km").innerHTML = data.current.vis_km + " km";
                        document.getElementById("uv").innerHTML = data.current.uv;
                        document.getElementById("humidity").innerHTML = data.current.humidity + "%";
                        document.getElementById("airQuality").innerHTML = data.current.air_quality.pm2_5;


                        for (let i = 0; i < 7; i++) {

                            const cardId = `card-${i}`;
                            const card = document.getElementById(cardId);
                            const cardImage = card.querySelector('.card-img-top');
                            const cardText = card.querySelector('.card-text');
                            const cardTitle = card.querySelector('.card-title');
                            cardImage.src = "https:" + data.forecast.forecastday[i].day.condition.icon;
                            cardText.innerText = data.forecast.forecastday[i].day.avgtemp_c + "°C";
                            cardTitle.innerText = data.forecast.forecastday[i].date.slice(5);
                        }
                    })
                    .catch(error => {
                        console.error('Lỗi khi lấy dữ liệu:', error);
                    });
            });
            form.dispatchEvent(new Event('submit'));
        }
        )

   