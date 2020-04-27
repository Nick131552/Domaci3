setTimeout(function(){
    if (window.innerWidth <= 450){
        var script= document.createElement('script');
        script.type= 'text/javascript';
        script.src= 'scripts/indexPhone.js';
        document.getElementById("body").appendChild(script);
    }
    
    else if (window.innerWidth > 450 && window.innerWidth <= 1023){
        var script= document.createElement('script');
        script.type= 'text/javascript';
        script.src= 'scripts/indexTablet.js';
        document.getElementById("body").appendChild(script);
    }
    
    else {
        var script= document.createElement('script');
        script.type= 'text/javascript';
        script.src= 'scripts/indexLaptop.js';
        document.getElementById("body").appendChild(script);
    }
}, 1000)
