const wrap = document.querySelector('.wrap');
const filterBlock = document.querySelector('.filtres-block');
const filterBtn = document.querySelector('.filter-btn');
const backBtn = document.querySelector('.back-btn');
const cocktailsList= document.querySelector('.cocktails-list');
const filterApplyBtn = document.querySelector('.submit-btn');
const filterChekedBlock = document.querySelector('.filterChekedBlock');
const nothigErr = document.querySelector('.nothing-err')
const dataSource = [];

let startPost = 0;
let endPost = 6;
const filterList = ['Ordinary Drink', 'Cocktail','Milk / Float / Shake','Other/Unknown','Cocoa','Shot','Coffee / Tea','Homemade Liqueur','Beer'];

function getCocktails(filterLists) {

    const url ='https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
    const filterArr = filterLists.map(item => url + filterList[item]);

    //multi fetch
    Promise.all(filterArr.map(url =>
        fetch(url).then(resp => resp.json())
    )).then(cocktails => {
        cocktailArr(cocktails)
    })

}

function cocktailArr(cocktailArr) {

    cocktailArr.forEach(items =>{
        (items.drinks).forEach(item =>{
            dataSource.push(item);
        })
    })

    // load more data
    displayCocktails(dataSource);
}


function displayCocktails(cocktails){
    let cocktailsHtml = '';

    if(cocktails.length === 0){
        nothigErr.style.display = 'block';
    }
    else{
        for(let i = startPost; i< endPost; i++){
            cocktailsHtml += `<div class='cocktail-item'>
        <img width=100 height=100 src="${cocktails[i].strDrinkThumb == undefined ? './img/no img.png' : cocktails[i].strDrinkThumb}" alt=''/>
         <p class='cocktail-item__text'>
         ${cocktails[i].strDrink}</p>
         </div>`
        }
        startPost += 4;
        endPost += 4;
        nothigErr.style.display = 'none';
    }

    wrap.innerHTML += cocktailsHtml
    filterChekedBlock.innerHTML = `Result is: ${dataSource.length} cocktails`

}
let listItems = '';
let filtresItems = ''

filterList.forEach((item,index) =>{
        listItems +=
        `<li class='filter-item'><label for=${item}>${item}</label>
    <input value=${index} id=${item} ${index === 0 ? checked="checked" : ''} type="checkbox"/></li>`
});



cocktailsList.innerHTML = listItems;

// toggle menu
filterBtn.addEventListener('click', ()=>{
    filterBlock.style.left = '0px'
    nothigErr.style.display = 'none';

})

backBtn.addEventListener('click', ()=>{
    filterBlock.style.left = '999px';

})

//infinity scroll

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log( { scrollTop, scrollHeight, clientHeight });
    if(clientHeight + scrollTop >= scrollHeight - 20) {
        displayCocktails(dataSource)
    }
});

// select checked value

function getCheckedCheckBoxes() {
    let selectedCheckBoxes = document.querySelectorAll('input:checked');
    let checkedValues = Array.from(selectedCheckBoxes).map(cb => cb.value);

    checkedValues.forEach(item =>{
        filtresItems += `<li>${item}</li>`
    });

    getCocktails(checkedValues);
}

getCheckedCheckBoxes();

filterApplyBtn.addEventListener('click', ()=>{
    wrap.innerHTML = '';
    getCheckedCheckBoxes();
    dataSource.length = 0;
    filterChekedBlock.innerHTML = `Result is: ${dataSource.length}`
    backBtn.click();
    startPost = 0;
    endPost = 6;
})
