let searchResult = document.getElementById("resultDiv");
let searchKey
let fromTo = ""

if (localStorage.getItem("recipe") != undefined){
  document.getElementsByName("q")[0].value = JSON.parse(localStorage.getItem("recipe"))[0]
  document.getElementsByName("url")[0].value = JSON.parse(localStorage.getItem("recipe"))[1]
  fromTo = JSON.parse(localStorage.getItem("recipe"))[2];

  localStorage.removeItem("recipe")
}

let result = {};
function analysis(){
    searchKey = [ document.getElementsByName("q")[0].value.replace(" ", "-"), document.getElementsByName("url")[0].value]

    fetch('https://api.edamam.com/search?q='+searchKey[0]+fromTo+'&app_id=05b25fe9&app_key=4ac7b2f30d6e35231997c00de0a9bd45')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data = data["hits"]
        for (let i = 0; i < data.length; i++){
            let url = data[i]["recipe"]["url"].replace("https://", "")
            url = url.replace("http://", "")
            url = url.substr(0, url.indexOf("/"));
            console.log(url)
            console.log(searchKey[1])

            if (searchKey[1].indexOf(url) != -1){
                result = {
                    "title": data[i]["recipe"]["label"],
                    "ingr": data[i]["recipe"]["ingredientLines"]
                }
                searchResult.firstElementChild.firstElementChild.setAttribute("src", data[i]["recipe"]["image"])
                searchResult.getElementsByClassName("link")[0].innerText = url;
                searchResult.getElementsByClassName("link")[0].setAttribute("href", data[i]['recipe']['url'])
                searchResult.getElementsByClassName("name")[0].innerText = data[i]['recipe']['label']
                searchResult.lastElementChild.lastElementChild.innerHTML = (data[i]['recipe']['ingredientLines']).reduce((value, elem) => value+="<br>"+"-"+elem, "")
            }
            console.log(result)
        }
        fetch("https://api.edamam.com/api/nutrition-details?app_id=c5bd02f3&app_key=000675b2628597535a85a8efb888ca21", {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(result)
          }).then((response) => {
            return response.json();
          }).then((data) =>{
            searchResult.getElementsByClassName("serving")[0].innerText = data['yield']+' servings'
            searchResult.getElementsByClassName("calories")[0].innerText = 'Calories: '+data['calories']
            searchResult.getElementsByClassName("energy")[0].innerText = 'Energy: '+Math.floor(Number(data['totalNutrients']['ENERC_KCAL']['quantity']))+' kcal'
            searchResult.getElementsByClassName("fat")[0].innerText = 'Fat: '+Math.floor(Number(data['totalNutrients']['FAT']['quantity']))+' g'

            searchResult.style.display = "flex"
              console.log(data)
          })
        })
        
        
    }

analysis()
