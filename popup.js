const wrap=document.querySelector('.wrap');
input_search=wrap.querySelector("input");
itext=wrap.querySelector(".itext")
 sound=wrap.querySelector(".word i");
 synonyms = wrap.querySelector(".synonyms .list");
let pronounciation;
//when enter key is pressed
input_search.addEventListener("keyup",e=>{
    if(e.key ==="Enter" && e.target.value){
        fetch_Api(e.target.value);
        console.log(e.target.value);
    }
});
//function that fetch api to get result
function fetch_Api(word)
{
    itext.innerHTML = `Searching for <span>"${word}"</span>`;
    let url="https://api.dictionaryapi.dev/api/v2/entries/en/"
    fetch(url+word).then(res=> res.json()).then(data=>{
        api_work(data,word)
        
        // pronounciation=new 
        console.log(data);
    });
}
function api_work(api_data,word){
    let audio_source="https:"+api_data[0].phonetics[0].audio
    pronounciation=new Audio(audio_source);
    //if meaning is not found for the entered word
if(api_data.title){
    itext.innerHTML = `Nothing found for <span>"${word}"</span>`;
}

//if meaning is found for entered word
else{
    wrap.classList.add("active");
   //taking out the entered word from api data
    let data=api_data[0].meanings[0].definitions[0];
    // meaning of the word
    let meaning=data.definition;
    document.querySelector(".word p").innerText = api_data[0].word;
    document.querySelector(".meaning span").innerText=meaning;
    if(data.synonyms[0]==undefined)
    {
        synonyms.parentElement.style.display="none";
    }
    else{
        synonyms.parentElement.style.display = "block";
        synonyms.innerHTML="";
        let x="";
        for(var i=0;i<4;i++)
{
   let sy=data.synonyms[i];
   x=`<span onClick="search_synon_mean('${sy}')">${sy}</span>`+","+x;
 //x=`<span>${sy}</span>`+","+x;
}
x=x+`<span onClick="search_synon_mean('${data.synonyms[4]}')">${data.synonyms[4]}</span>`
//x=`<span>${data.synonyms[4]}</span>`+","+x;
synonyms.innerHTML=x;

//console.log(x);
    }
 //   console.log(meaning);
}
}
//search the menaing of synonyms of the given word
function search_synon_mean(word)
{
    fetch_Api(word);
    input_search.value=word;
}
sound.addEventListener("click",()=>{
    pronounciation.play();
    sound.style.color = "#4db4e4";
    
     setTimeout(()=>{
         sound.style.color="#2125d8";
     },800);
   
})