let sliderList = {elements: document.getElementById("sliderList").children, shown: [0, 1, 2]}
let ratingList = {elements: document.getElementById("ratingList").children, shown: [0, 1, 2, 3, 4, 5]}
let modalWindow = document.getElementById("modalWindow");

function moveSlider(direction){
    if (direction === 'left'){
        if (sliderList["shown"][0] != 0){
            sliderList["elements"][sliderList["shown"][0]-1].style.display = "block";
            sliderList["elements"][sliderList["shown"][2]].style.display = "none";

            sliderList["shown"][0]--;
            sliderList["shown"][1]--;
            sliderList["shown"][2]--;
        }
    else {
        sliderList["elements"][sliderList["shown"][0]].style.display = "none";
        sliderList["elements"][sliderList["shown"][1]].style.display = "none";
        sliderList["elements"][sliderList["shown"][2]].style.display = "none";
        sliderList["elements"][7].style.display = "block";
        sliderList["elements"][8].style.display = "block";
        sliderList["elements"][9].style.display = "block";


        sliderList["shown"][0] = 7;
        sliderList["shown"][1] = 8;
        sliderList["shown"][2] = 9;
    }
    }

    else if(direction === 'right'){
        if (sliderList["shown"][2] != 9){
            sliderList["elements"][sliderList["shown"][0]].style.display = "none";
            sliderList["elements"][sliderList["shown"][2]+1].style.display = "block";

            sliderList["shown"][0]++;
            sliderList["shown"][1]++;
            sliderList["shown"][2]++;
        }
        else {
            sliderList["elements"][sliderList["shown"][0]].style.display = "none";
            sliderList["elements"][sliderList["shown"][1]].style.display = "none";
            sliderList["elements"][sliderList["shown"][2]].style.display = "none";
            sliderList["elements"][0].style.display = "block";
            sliderList["elements"][1].style.display = "block";
            sliderList["elements"][2].style.display = "block";


            sliderList["shown"][0] = 0;
            sliderList["shown"][1] = 1;
            sliderList["shown"][2] = 2;
        }
    }
}


function openModalWindow(e){
    let info = e.parentNode.children;
    modalWindow.style.display = "block"

    for (let i = 0; i < (info.length-1); i++){
        modalWindow.append(info[i].cloneNode(true))
    }

}

function closeModalWindow(){
    modalWindow.style.display = "none"
    modalWindow.innerHTML = "<button onclick=\"closeModalWindow()\">X</button>"
}


function loadMore(){
    ratingList["elements"][6].style.display = "block"
    ratingList["elements"][7].style.display = "block"
    ratingList["elements"][8].style.display = "block"

    document.getElementsByTagName("main")[0].style.height = "110vh";
    document.getElementById("topRated").lastElementChild.innerText = "CLOSE";
    document.getElementById("topRated").lastElementChild.onclick = close;
}

function close(){
    ratingList["elements"][6].style.display = "none"
    ratingList["elements"][7].style.display = "none"
    ratingList["elements"][8].style.display = "none"

    document.getElementsByTagName("main")[0].style.height = "90vh";
    document.getElementById("topRated").lastElementChild.innerText = "LOAD MORE";
    document.getElementById("topRated").lastElementChild.onclick = loadMore;
}