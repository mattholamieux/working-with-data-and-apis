// Example using async/await

const catchRainbow = async() => {
    const response = await fetch('rainbow.jpg');
    const blob = await response.blob();
    document.getElementById('rainbow').src = URL.createObjectURL(blob);
}

catchRainbow().catch(error => {
    console.log('error');
});


// Example using .then

// fetch('rainbow.jpg').then(response => {
//         console.log(response);
//         return response.blob();
//     })
//     .then(blob => {
//         console.log(blob);
//         document.getElementById('rainbow').src = URL.createObjectURL(blob);
//     })
//     .catch(error => {
//         console.log('error!')
//         console.error(error);
//     });