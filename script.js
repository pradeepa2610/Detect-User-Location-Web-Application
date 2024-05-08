const button = document.querySelector("button");
button.addEventListener("click", () => {
    if (navigator.geolocation) {
        button.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        button.innerText = "Your browser not support";
    }
});
function onSuccess(position) {
    button.innerText = "Detecting your location...";
    let { latitude, longitude } = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=7c00db095b7845d1a00f75244b2e168e`)
        .then(response => response.json()).then(response => {
            let allDetails = response.results[0].components;
            console.table(allDetails);
            let { county, postcode, country } = allDetails;
            button.innerText = `${county} ${postcode}, ${country}`;
        }).catch(() => {
            button.innerText = "Something wents wrong";
        });
}
function onError(error) {
    if (error.code == 1) {
        button.innerText = "You denied the request";
    } else if (error.code == 2) {
        button.innerText = "Location is unavailable";
    } else {
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
}