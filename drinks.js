 let groupCount = 0;
    const load_all_prod = () =>{
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          display_drink(data.drinks.slice(0, 8))
        });
    }

    const display_drink = (drinks) =>{
      const drinkContainer = document.getElementById('drink-container');
      drinkContainer.innerHTML = '';
      const message = document.getElementById('message');

        if (drinks.length > 0) {
            message.innerText = '';
        } 
        else 
        {
            message.innerText = 'No drinks found';
        }
      drinks.forEach(drink => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <img class="drink-img" src="${drink.strDrinkThumb}" alt="" />
          <h5>${drink.strDrink}</h5>
          <p>${drink.strCategory}</p>
          <p>${drink.strInstructions.slice(0,15)}...</p>
          <button onclick="handleAddToGroup('${drink.strDrink}')">Add to Group</button>
          <button onclick="showDetails('${drink.idDrink}')">Details</button>
        `;
        drinkContainer.appendChild(div);
      });
    };

    const handleAddToGroup = (name) =>{
      if(groupCount >= 7) {
        alert("Cannot add more than 7 drinks to the group.");
        return;
      }
      groupCount++;
      document.getElementById("items-no").innerText = groupCount;
      const container = document.getElementById("cart-main-container")
      const div = document.createElement("div")
      div.classList.add('cart-info')
      div.innerHTML = `<p>${name}</p>`;
      container.appendChild(div);
    };

    const searchDrink =() =>{
      const input = document.getElementById('search-input').value;
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
        .then(response => response.json())
        .then(data => {
          if(!data.drinks) {
            display_drink([]);
          } 
          else {
            display_drink(data.drinks);
          }
        });
    };

    const showDetails = (id)=>{
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data =>{
          const drink = data.drinks[0];
          const modal = document.getElementById('modal');
          modal.style.display = 'block';
          modal.innerHTML = `
            <h2>${drink.strDrink}</h2>
            <p>Category: ${drink.strCategory}</p>
            <p>Alcoholic: ${drink.strAlcoholic}</p>
            <p>Glass: ${drink.strGlass}</p>
            <p>Instructions: ${drink.strInstructions}</p>
            <p>Ingredient 1: ${drink.strIngredient1}</p>
            <button onclick="document.getElementById('modal').style.display='none'">Close</button>
          `;
        });
    };

    load_all_prod();