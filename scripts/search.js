let modalWindow = document.getElementById("modalWindow")
let searchResult = document.getElementById("searchResult").children;



function openModalWindow(e){
    if (modalWindow.style.display !== "flex"){
        modalWindow.style.display = "flex"


            modalWindow.style.width = "90vw";
            modalWindow.style.height = "90vh"

            setTimeout(function(){
                modalWindow.innerHTML = "<button onclick=\"closeModalWindow()\">X</button>"+e.parentNode.innerHTML;
                modalWindow.removeChild(modalWindow.lastElementChild)
            }, 1000)
    }
}

function closeModalWindow(){
    modalWindow.style.height = "0vh"
    modalWindow.style.width = "0vw"

    modalWindow.innerHTML = ""
    
    setTimeout(function(){
        modalWindow.style.display = "none"
        modalWindow.innerHTML = ""
    }, 1000)
    
}


function search(){
    let diet = {key:"diet=", value: document.getElementsByName("diet")[0].value.replace(" ", "-").toLowerCase()}
    let ingr = {key:"ingr=", value: document.getElementsByName("ingr")[0].value.replace(" ", "-").toLowerCase()}
    let health = {key:"health=", value: document.getElementsByName("health")[0].value.replace(" ", "-").toLowerCase()}
    
    let searchKey = [ diet, ingr, health]
    let str = "search?q="+document.getElementsByName("q")[0].value.replace(" ", "-").toLowerCase()+"&";

    for (let i = 0; i < searchKey.length; i++){
        if (searchKey[i]["value"] !== ""){
            str += searchKey[i]["key"]+searchKey[i]["value"]+"&"
        }
    } 

    console.log(str)

    fetch('https://api.edamam.com/'+str+'app_id=05b25fe9&app_key=4ac7b2f30d6e35231997c00de0a9bd45')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data = data["hits"]

        for (let i = 0; i < 10; i++){
            data[i] = [data[i]["recipe"]["label"], data[i]["recipe"]["image"], data[i]["recipe"]["ingredientLines"], "Search keys: "+document.getElementsByName("q")[0].value+", "+data[i]["recipe"]["healthLabels"]+", "+data[i]["recipe"]["dietLabels"]+", "+ingr["value"], data[i]["recipe"]["url"]]
            data[i][4] = data[i][4].replace("https://", "")
            data[i][4] = data[i][4].replace("http://", "")
            data[i][4] = "http://"+data[i][4].substr(0,data[i][4].indexOf("/"))

            searchResult[i].style.display = "flex"
            searchResult[i].firstElementChild.setAttribute("src", data[i][1])
            searchResult[i].getElementsByClassName("name")[0].innerText = data[i][0]
            searchResult[i].getElementsByClassName("search-tags")[0].innerText = data[i][3]
            searchResult[i].getElementsByClassName("info")[0].innerText = data[i][2]
            searchResult[i].getElementsByClassName("url")[0].setAttribute("href", data[i][4])
            searchResult[i].getElementsByClassName("url")[0].innerText = data[i][4];
        }
        })
    
    }
