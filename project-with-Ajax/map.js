
function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var locationElement = document.getElementById('location');
            if (locationElement) {
                // <div id="map"></div>            
                var myLatLng = { lat: latitude, lng: longitude };
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15,
                    center: myLatLng
                });
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: 'Vị trí của bạn'
                });

            }

        }, function (error) {
            // Xử lý lỗi nếu có
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    locationElement.textContent = "Truy cập vị trí bị từ chối.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    locationElement.textContent = "Thông tin vị trí không khả dụng.";
                    break;
                case error.TIMEOUT:
                    locationElement.textContent = "Quá thời gian để lấy thông tin vị trí.";
                    break;
                case error.UNKNOWN_ERROR:
                    locationElement.textContent = "Lỗi không xác định.";
                    break;
            }
        }
        );
    } else {
        // Xử lý khi trình duyệt không hỗ trợ Geolocation API
        var locationElement = document.getElementById('location');
        locationElement.textContent = "Trình duyệt của bạn không hỗ trợ Geolocation.";

    }



}