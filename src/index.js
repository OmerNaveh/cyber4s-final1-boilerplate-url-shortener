
const path = "http://localhost:8080"
//elements
const userInput = document.getElementById('userInput')
const inputbtn = document.getElementById('inputbtn')
const urloutput = document.getElementById('urloutput')
const stats = document.getElementById('stats')
const shortUrlinput = document.getElementById('shortUrlinput')
const showstatsBtn = document.getElementById('showstatsBtn')

//event listener
inputbtn.addEventListener('click', async ()=>{
    try {
        const longUrl = userInput.value;
        // const shortUrl = undefined
        if(!validator.isURL(longUrl)){
            urloutput.textContent = "Please enter a valid URL";
            return;
        }
        const data =  await axios.get(`${path}/makeUrl`, {headers: {longurl: longUrl, shorturl:undefined}});
        userInput.value= "";
        urloutput.textContent = data.data;
        stats.style.visibility = 'visible'
    } catch (error) {
        urloutput.textContent = error;
    }
    })

showstatsBtn.addEventListener('click', async()=>{
    const shortUrl = shortUrlinput.value;
    const data = await axios.get(`${path}/status`, {headers: {shorturl:shortUrl}});
    const longurl = createElement('div', 'status');
    const counter = createElement('div', 'status');
    const date = createElement('div', 'status');
    longurl.textContent = `Original URL: ${data.data.longurl}`;
    counter.textContent = `Times Visited: ${data.data.counter}`;
    date.textContent = `Date Created: ${data.data.date}`;
    stats.append(longurl, counter , date);
})

function createElement(tag, classname){
    const elem = document.createElement(tag);
    elem.classList.add(classname);
    return elem;
}