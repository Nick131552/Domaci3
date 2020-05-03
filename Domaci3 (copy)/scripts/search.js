let modalWindow = document.getElementById("modalWindow")
let searchResult = document.getElementById("searchResult").children;
let mealType = localStorage.getItem("mealType");
let currentPage = 0;

if (mealType === undefined) {
    mealType = "lunch";
}


function recipeAnalysis(e){
    localStorage.setItem("recipe", JSON.stringify([document.getElementsByName("q")[0].value, e.parentNode.getElementsByClassName("url")[0].innerText, mealType]))
}


function checkIfChecked(e){
    let name = e.name.toLowerCase()
    if (e.checked){
        document.getElementsByName(name)[0].parentNode.style.display = "flex";
    }
    else {
        document.getElementsByName(name)[0].parentNode.style.display = "none";
    }
}


function setMealType(str){
    localStorage.setItem("mealType", str);
}


function search(){
    searchResult[currentPage].style.display = "none"

    let diet = {key:"diet=", value: document.getElementsByName("diet")[0].value.replace(" ", "-")}
    let ingr = {key:"ingr=", value: document.getElementsByName("ingr")[0].value.replace(" ", "-")}
    let health = {key:"health=", value: document.getElementsByName("health")[0].value.replace(" ", "-")}
    let searchKey = []


    if (document.getElementsByName("diet")[0].parentNode.style.display == "flex"){
        searchKey.push(diet)
    }
    if (document.getElementsByName("ingr")[0].parentNode.style.display == "flex"){
        searchKey.push(ingr)
    }
    if (document.getElementsByName("health")[0].parentNode.style.display == "flex"){
        searchKey.push(health)
    }

    let str = "search?q="+document.getElementsByName("q")[0].value.replace(" ", "-").toLowerCase()+"&";

    for (let i = 0; i < searchKey.length; i++){
        if (searchKey[i]["value"] !== ""){
            str += searchKey[i]["key"]+searchKey[i]["value"]+"&"
        }
    } 


    fetch('https://api.edamam.com/'+str+mealType+'&app_id=05b25fe9&app_key=4ac7b2f30d6e35231997c00de0a9bd45')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data = data["hits"]

        for (let i = 0; i < 20; i++){
            let pageNum = Math.floor(i/4)
            data[i] = [data[i]["recipe"]["label"], data[i]["recipe"]["image"], data[i]["recipe"]["ingredientLines"], "Search keys: "+document.getElementsByName("q")[0].value+", "+data[i]["recipe"]["healthLabels"]+", "+data[i]["recipe"]["dietLabels"]+", "+ingr["value"], data[i]["recipe"]["url"]]
            data[i][5] = data[i][4].replace("https://", "")
            data[i][5] = data[i][5].replace("http://", "")
            data[i][5] = data[i][5].substr(0,data[i][5].indexOf("/"))

            searchResult[pageNum].firstElementChild.children[i%4]

            searchResult[0].style.display = "flex"
            searchResult[pageNum].firstElementChild.children[i%4].style.display = "flex";

            searchResult[pageNum].firstElementChild.children[i%4].firstElementChild.setAttribute("src", data[i][1])
            searchResult[pageNum].firstElementChild.children[i%4].getElementsByClassName("name")[0].innerText = data[i][0]
            searchResult[pageNum].firstElementChild.children[i%4].getElementsByClassName("search-tags")[0].innerText = data[i][3]
            searchResult[pageNum].firstElementChild.children[i%4].getElementsByClassName("info")[0].innerText = data[i][2]
            searchResult[pageNum].firstElementChild.children[i%4].getElementsByClassName("url")[0].setAttribute("href", data[i][4])
            searchResult[pageNum].firstElementChild.children[i%4].getElementsByClassName("url")[0].innerText = data[i][5];

        }
        })
    
    }

search()


function changeCurrentPage(dir, num){
    if (dir === 'right' && currentPage != 4){
        currentPage++
        searchResult[currentPage-1].style.display = "none"
        searchResult[currentPage].style.display = "flex"
    }

    else if (dir === 'left' && currentPage != 0){
        currentPage--;
        searchResult[currentPage+1].style.display = "none"
        searchResult[currentPage].style.display = "flex"
    }
    else if (dir === undefined && num != undefined){
        searchResult[currentPage].style.display = "none"
        currentPage = num;
        searchResult[currentPage].style.display = "flex"
    }
}