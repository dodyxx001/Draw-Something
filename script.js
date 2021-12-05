
// Creating 32 x 32 field of divs
let container = document.querySelector('.container');

for (let i= 0; i < 32 ** 2; i++){
    let newDiv = document.createElement('div');
    newDiv.classList.add('box');
    container.appendChild(newDiv);
};

// Declaring a variable to select all boxes that can be drawn-over
let divs = document.querySelectorAll('.box');

// Declaring a boolean variable for drawing phase (switch)
let drawing = false;

// Declaring checkbox wich enables erasing
let eraseSwitch = document.querySelector('#erase');

// Adding functionality:
//___________________________________________________________________________START


// Adding functionality to Color button - random RGB color rendering
let colorButton = document.querySelector('#color-button');
let colorOn = false;  //switch

let getRandomColor = () => {
    let randomColorCode = Math.floor(Math.random()*16777215).toString(16);
    let randomColor =  "#" + randomColorCode;
    return randomColor;
};

colorButton.addEventListener('click', (e) => {
    if(e.target.textContent === 'Enable Color'){
        e.target.textContent = 'Back to Black';
        colorOn = true;
    }else{
        e.target.textContent = 'Enable Color';
        colorOn = false;
    };
});


// On click start drawing, draw until user releases the mouse button.
divs.forEach((div) => {
        div.addEventListener('mousedown', (e) => {
            e.target.classList.add('colored');
            if(colorOn){e.target.style.backgroundColor = getRandomColor()};
            drawing = true;
        });
        div.addEventListener('mouseover', (f) => {
            if( drawing === true){
                f.target.classList.add('colored');
                if(colorOn){f.target.style.backgroundColor = getRandomColor()};
            };
        });
        div.addEventListener('mouseup', (g) => {
            if (drawing === true){
                drawing = false;
            };
        });
});
// Adding erasing functionality:
// If erase checkbox is checked, enable erasing. If disabled, enable drawing again.
eraseSwitch.addEventListener('click', (d) => {
    if(d.target.checked === true){
        divs.forEach((div) => {
            div.addEventListener('mousedown', (e) => {
                e.target.classList.remove('colored');
                e.target.removeAttribute('style');
                drawing = true;  
            });
            div.addEventListener('mouseover', (f) => {
                if( drawing === true){
                    f.target.classList.remove('colored');
                    f.target.removeAttribute('style');
                };
            });
            div.addEventListener('mouseup', (g) => {
                if (drawing === true){
                    drawing = false;
                };
            });
        });
    }else if(d.target.checked === false){
    divs.forEach((div) => {
        div.addEventListener('mousedown', (e) => {
            e.target.classList.add('colored');
            if(colorOn){e.target.style.backgroundColor = getRandomColor()};
            drawing = true;
        });
        div.addEventListener('mouseover', (f) => {
            if( drawing === true){
                f.target.classList.add('colored');
                if(colorOn){f.target.style.backgroundColor = getRandomColor()};
            };
        });
        div.addEventListener('mouseup', (g) => {
            if (drawing === true){
                drawing = false;
            };
        });
        });
    };
});
//____________________________________________________________________________END


// Adding functionality to the slider _______________________________________START  

let slider = document.querySelector('#slider');
let slidervalue = document.querySelector('.value');

// Function to remove child elements, while there are child elements - will be called later:
function removeAllChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    };
};

slider.addEventListener('input', (e) => {
    // print the value of slider into text field, so we can see the value
    slidervalue.textContent = e.target.value;

    // removing the grid
    removeAllChildNodes(container);

    // setting up the new grid 
    container.setAttribute('style', `grid-template: repeat(${e.target.value}, 1fr)/repeat(${e.target.value}, 1fr)`);

    // creating new grid
    for(let i= 0; i < e.target.value ** 2; i++){
        let newDiv = document.createElement('div');
        newDiv.classList.add('box');
        container.appendChild(newDiv);
        divs = document.querySelectorAll('.box');

        // adding the functionality to the new grid
        newDiv.addEventListener('mousedown', (h) => {
            h.target.classList.add('colored');
            if(colorOn){h.target.style.backgroundColor = getRandomColor()};
            drawing = true;
        });
        newDiv.addEventListener('mouseover', (f) => {
            if( drawing === true){
                f.target.classList.add('colored');
                if(colorOn){f.target.style.backgroundColor = getRandomColor()};
            };
        });
        newDiv.addEventListener('mouseup', (g) => {
            if (drawing === true){
                drawing = false;
            };
        });
    };
});

// __________________________________________________________________________END




// Adding functionality to Clear button - remove (colored) class and 
// (style) attribute from all boxes
let clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', () => {
    divs.forEach((div) => {
        div.classList.remove('colored');
        div.removeAttribute('style');
    });
});







