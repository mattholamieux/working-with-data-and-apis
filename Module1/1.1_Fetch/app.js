console.log('welcome to working with data and apis in javascript');


async function catchRainbow() {
   const response = await fetch('rainbow.jpg');
   const blob = await response.blob();
   document.getElementById('rainbow').src = URL.createObjectURL(blob);
}

catchRainbow()
.then(response => {
    console.log('success!');
})
.catch(error => {
    console.log('error!');
    console.log(error);
});



/*
fetch('rainbow.jpg').then(response => {
    console.log(response);
    return response.blob();
}).then(blob => {
    console.log(blob);
    document.getElementById('rainbow').src = URL.createObjectURL(blob);
})
.catch(error => {
    console.error(error);
});
*/