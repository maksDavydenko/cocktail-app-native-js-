const wrap = document.querySelector('.wrap');
const filterBlock = document.querySelector('.filtres-block');
const filterBtn = document.querySelector('.filter-btn');
const backBtn = document.querySelector('.back-btn');
const cocktailsList = document.querySelector('.cocktails-list');
const filterApplyBtn = document.querySelector('.submit-btn');
const filterChekedBlock = document.querySelector('.filterChekedBlock');
const nothingErr = document.querySelector('.nothing-err')
const toUpBtn = document.querySelector('.toUp-btn')
const dataSource = [];

let startPost = 0;
let endPost = 6;
const filterList = [];

getFiltersItems();

function getFiltersItems() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        getFilterArr(data);
    });
}

function getFilterArr(arr){
    (arr.drinks).forEach(item =>{
        filterList.push(item.strCategory);
    })
    growFilterList();
}

function getCocktails(checkedValue) {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
    const filterArr = checkedValue.map(item => url + filterList[item]);
    //multi fetch

    Promise.all(filterArr.map(url =>
        fetch(url).then(resp => resp.json())
    )).then(cocktails => {
        cocktailArr(cocktails)
    })
}

function cocktailArr(cocktailArr) {
    cocktailArr.forEach(items => {
        (items.drinks).forEach(item => {
            dataSource.push(item);
        })
    })
    displayCocktails(dataSource)
}


function displayCocktails(cocktails) {
    let cocktailsHtml = '';

    if (cocktails.length === 0) {
        nothingErr.style.display = 'block';
    } else {
        for (let i = startPost; i < endPost; i++) {
            cocktailsHtml += `<div class='cocktail-item'>
        <img width=100 height=100 src="${cocktails[i].strDrinkThumb == undefined ? './img/no img.png' : cocktails[i].strDrinkThumb}" alt="${cocktails[i].strDrink}"/>
         <p class='cocktail-item__text'>
         ${cocktails[i].strDrink}</p>
         </div>`
        }
        startPost += 4;
        endPost += 4;
        nothingErr.style.display = 'none';
    }

    wrap.innerHTML += cocktailsHtml
    filterChekedBlock.innerHTML = `Result is: ${dataSource.length} cocktails`

}



function growFilterList() {
    let listItems = '';

    filterList.forEach((item, index) => {
        listItems +=
            `<li class='filter-item'><label for=${item}>${item}</label>
    <input value=${index} id=${item} ${index === 0 ? checked = 'checked' : ''} type="checkbox"/></li>`
    });
    cocktailsList.innerHTML = listItems;
    getCheckedCheckBoxes();
    displayCocktails(dataSource);
}

// toggle menu

filterBtn.addEventListener('click', () => {
    filterBlock.style.left = '0px'
    nothingErr.style.display = 'none';
    document.body.style.overflowY = 'hidden'
    popUp.style.display = 'none';
    toUpBtn.style.display = 'none';
})

backBtn.addEventListener('click', () => {
    filterBlock.style.left = '999px';
    document.body.style.overflowY = 'scroll'
    toUpBtn.style.display = 'flex';

})

//infinity scroll

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    console.log({scrollTop, scrollHeight, clientHeight});

    if (clientHeight + scrollTop >= scrollHeight - 20) {
        displayCocktails(dataSource)
    }
});

// select checked value

function getCheckedCheckBoxes() {
    let filtresItems = ''
    let selectedCheckBoxes = document.querySelectorAll('input:checked');
    let checkedValues = Array.from(selectedCheckBoxes).map(cb => cb.value);

    checkedValues.forEach(item => {
        filtresItems += `<li>${item}</li>`
    });

    getCocktails(checkedValues);
}


filterApplyBtn.addEventListener('click', () => {
    wrap.innerHTML = '';
    getCheckedCheckBoxes();
    dataSource.length = 0;
    filterChekedBlock.innerHTML = `Result is: ${dataSource.length}`
    backBtn.click();
    startPost = 0;
    endPost = 6;
})


const popUp = document.querySelector('.popUp');

document.body.addEventListener('click', () => {
    let target = event.target;

    if (target.closest('div').classList.contains('cocktail-item')) {
        let block = target.closest('div')
        let outers = block.childNodes;
        let filterItem;

        outers.forEach((item, i) => {
            (outers[i].tagName === 'IMG') ? filterItem = outers[i] : null;
        })

        popUp.innerHTML = `<img src="${filterItem.src}" width="350" height="350" alt="${filterItem.alt}">
<p>${filterItem.alt}</p>
        <div class="close"><img src="./img/close-icon.svg" width="20" height="20" alt="x"></div>`
        popUp.style.display = 'block'
        document.body.style.overflowY = 'hidden'
    }

    if(target.closest('div').classList.contains('close')){
        popUp.style.display = 'none'
        document.body.style.overflowY = 'scroll'
    }
})


