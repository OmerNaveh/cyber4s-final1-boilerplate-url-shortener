const path = "http://localhost:8080"
//elements
const userInput = document.getElementById('userInput')
const inputbtn = document.getElementById('inputbtn')
const urloutput = document.getElementById('urloutput')

//event listener
inputbtn.addEventListener('click', async ()=>{
    try {
        const longUrl = userInput.value;
        if(!validator.isURL(longUrl)){
            urloutput.textContent = "Please enter a valid URL";
            return;
        }
        const data =  await axios.get(`${path}/makeUrl`, {headers: {longurl: longUrl}});
        userInput.value= "";
        urloutput.textContent = data.data;
    } catch (error) {
        console.log(error)
    }
    })
    