const wrap = document.querySelector('.wrap');
const filterBlock = document.querySelector('.filtres-block');
const filterBtn = document.querySelector('.filter-btn');
const backBtn = document.querySelector('.back-btn');
const cocktailsList= document.querySelector('.cocktails-list');
const filterApplyBtn = document.querySelector('.submit-btn')
const dataSource = [];

let startPost = 0;
let endPost = 6;

function getCocktails() {
     fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink')
    .then(
        function(response){
        if(response.status !== 200){
            console.log(`server has some problem ${response.status}`);
            return;
        }
        response.json().then(function(data){
            displayCocktails(data.drinks);
            (data.drinks).forEach(cocktail =>{
                dataSource.push(cocktail);
            })
        });
    }
)
    .catch(function(err){
        console.log(`fetch err ${err}`);
    })
}


getCocktails();

const filteList = ['Ordinary Drink', 'Cocktail','Milk / Float / Shake','Other/Unknown','Cocoa','Shot','Coffee / Tea','Homemade Liqueur','Beer'];



function displayCocktails(cocktails){
    let cocktailsHtml = '';

    for(let i = startPost; i< endPost; i++){
        cocktailsHtml += `<div class='cocktail-item'>
        <img width=100 height=100 src="${cocktails[i].strDrinkThumb}" alt=''/>
         <p class='cocktail-item__text'>
         ${cocktails[i].strDrink}</p>
         </div>`
    }

    wrap.innerHTML += cocktailsHtml

    startPost += 4;
    endPost += 4;

}
let listItems = '';

filteList.forEach((item,index) =>{
        listItems +=
        `<li class='filter-item'><label for=${item}>${item}</label>
    <input value=${item} id=${item} checked type="checkbox"/></li>`});

cocktailsList.innerHTML = listItems;


// toggle menu
filterBtn.addEventListener('click', ()=>{
    filterBlock.style.left = '0px'
})

backBtn.addEventListener('click', ()=>{
    filterBlock.style.left = '999px'
})

//infinity scroll

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    console.log( { scrollTop, scrollHeight, clientHeight });

    if(clientHeight + scrollTop >= scrollHeight - 5) {

        displayCocktails(dataSource)
    }
});


// select checked value

function getCheckedCheckBoxes() {
    let selectedCheckBoxes = document.querySelectorAll('input:checked');
    let checkedValues = Array.from(selectedCheckBoxes).map(cb => cb.value);

    console.log(checkedValues);


    return checkedValues;
}

filterApplyBtn.addEventListener('click', ()=>{
    getCheckedCheckBoxes();
})
