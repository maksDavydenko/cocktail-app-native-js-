const wrap = document.querySelector('.wrap');
const filterBlock = document.querySelector('.filtres-block');
const filterBtn = document.querySelector('.filter-btn');
const backBtn = document.querySelector('.back-btn');
const dataSource = [];

function getCocktails() {
     fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink')
    .then(
        function(response){
        if(response.status !== 200){
            console.log(`server has some problem ${response.status}`);
            return;
        }
        response.json().then((data) =>{
            displayCocktails(data.drinks);
        });
    }
)
    .catch((err) => {
        console.log(`fetch err ${err}`);
    })
}


// getCocktails();

const filteList = ['Ordinary Drink', 'Cocktail','Milk / Float / Shake','Other/Unknown','Cocoa','Shot','Coffee / Tea','Homemade Liqueur','Beer'];

// function displayCocktails(cocktails){
//     const cocktailsHtml = cocktails.map(item => {
//         return (
//             `<div class='cocktail-item'>
//         <img width=100 height=100 src="${item.strDrinkThumb}" alt=''/>
//          <p class='cocktail-item__text'>
//          ${item.strDrink}
//          </p>
//          </div>`
//         )
//     })
//     wrap.innerHTML = cocktailsHtml
// }
// const listItems = filteList.forEach((item,index) => `<li key={index} class='filter-item'><label for={index}>{item}</label>
//     <input onChange={this.handleInputChange} value={index} id={index} type="checkbox"/></li>`);
//
// displayCocktails();

filterBtn.addEventListener('click', ()=>{
    filterBlock.style.left = '0px'
})

backBtn.addEventListener('click', ()=>{
    filterBlock.style.left = '999px'
})
// const cocktails = dataSource.forEach(item => {
//     return (
//         `<div class='cocktail-item'>
//         <img width=100 height=100 src="${item.strDrinkThumb}" alt=''/>
//         <p class='cocktail-item__text'>
//         ${item.strDrink}
//         </p>
//         </div>`
//
// )
//

