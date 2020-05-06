const wrap = document.querySelector('.wrap');
const filterBlock = document.querySelector('.filtres-block');
const filterBtn = document.querySelector('.filter-btn');
const backBtn = document.querySelector('.back-btn');
const cocktailsList= document.querySelector('.cocktails-list');
const filterApplyBtn = document.querySelector('.submit-btn');
const filterChekedBlock = document.querySelector('.filterChekedBlock');

const dataSource = [];

let startPost = 0;
let endPost = 6;
const filterList = ['Ordinary Drink', 'Cocktail','Milk / Float / Shake','Other/Unknown','Cocoa','Shot','Coffee / Tea','Homemade Liqueur','Beer'];

function getCocktails() {

    const url ='https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
    const filterArr = filterList.map(item => url + item);

    // filterArr.forEach(item => {
    //     fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filterList[4]}`)
    // Promise.all(filterArr.map(u=>fetch(u))).then(responses =>
    //     Promise.all(responses.map(res => res.text()))
    // )
    // .then(
    //         function (response) {
    //             if (response.status !== 200) {
    //                 console.log(`server has some problem ${response.status}`);
    //                 return;
    //             }
    //             response.json().then(function (data) {
    //                 (data.drinks).forEach(cocktail => {
    //                     dataSource.push(cocktail);
    //                 })
    //             });
    //         }
    //     )
    //     .catch(function (err) {
    //         console.log(`fetch err ${err}`);
    //     })

    // Promise.all(filterArr.map(url =>
    //     fetch(url).then(resp => resp.json())
    // )).then(texts => {
    //     texts.forEach(items => {
    //        //  (items.drinks).forEach(item => {
    //        //     dataSource.push(item);
    //        // })
    //         dataSource.push(items)
    //
    //     })
    // })

    Promise.all(filterArr.map(u=>fetch(u))).then(responses =>
        Promise.all(responses.map(res => res.json()))
    )
    .then(texts => {
        cocktailArr(texts)
    })


    // displayCocktails(dataSource)
    // console.log(dataSource);

    //
    //
    // console.log(dataSource);
}

getCocktails()

function cocktailArr(cocktailArr) {
    cocktailArr.forEach(items =>{
        (items.drinks).forEach(item =>{
            dataSource.push(item);
        })
    })
    displayCocktails(dataSource);
}


function displayCocktails(cocktails){

    let cocktailsHtml = '';
    console.log(cocktails);

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
})

backBtn.addEventListener('click', ()=>{
    filterBlock.style.left = '999px'
})

//infinity scroll

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log( { scrollTop, scrollHeight, clientHeight });
    if(clientHeight + scrollTop >= scrollHeight - 5) {
        getCocktails(dataSource)
    }
});


// select checked value

function getCheckedCheckBoxes() {
    let selectedCheckBoxes = document.querySelectorAll('input:checked');
    let checkedValues = Array.from(selectedCheckBoxes).map(cb => cb.value);

    checkedValues.forEach(item =>{
        filtresItems += `<li>${item}</li>`
    });
    filterChekedBlock.innerHTML = filtresItems
    getCocktails(checkedValues);
}
getCheckedCheckBoxes();

filterApplyBtn.addEventListener('click', ()=>{
    getCheckedCheckBoxes();
})
