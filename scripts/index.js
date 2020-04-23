let sliderList = {elements: document.getElementById("sliderList").children, shown: [0, 1, 2]}


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