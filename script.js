
function fetchData(url, callback) {
    fetch(url, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NDI3OWMwNTgzNTAwMTg1MjMxOWQiLCJpYXQiOjE3MDIzODAxNTMsImV4cCI6MTcwMzU4OTc1M30.-ZyXsx7p7y0c2Ww3K9fLdtNmZu2BAVCGGJo2T-N1Vlg"
        }
    })
    .then(response => response.json())
    .then(json => {
        callback(json);
    })
    .catch(error => console.log(error));
}

function firstFunction() {
    fetchData("https://striveschool-api.herokuapp.com/api/product/", json => {
        console.table(json);
        showData(json);
        
    });
}

function secondFunction() {
    fetchData("https://striveschool-api.herokuapp.com/api/product/", json => {
        console.table(json);
        elenco(json);
    });
}
firstFunction();
secondFunction();
    
document.addEventListener('DOMContentLoaded', () => {
    
    
    const addBtn = document.querySelector(".addBtn");
    addBtn.addEventListener("click", addProd);
    const editBtn = document.querySelector(".editBtn");
    editBtn.addEventListener("click", editProd);

    const delBtn = document.querySelector(".delBtn");
    delBtn.addEventListener("click", delProd);
    
    
});



function showData(data){

    const cards = document.querySelector(".cardz");
    
    for(let i = 0; i < data.length; i++){

        let card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";
        card.innerHTML = 
        `
            <img src="${data[i].imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${data[i].name}</h5>
              <p class="card-text">${data[i].description}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${data[i].brand}</li>
              <li class="list-group-item">${data[i].price} $</li>
            </ul>
            <div class="card-body">
              <a href="#" class="card-link">Card link</a>
              <a href="#" class="card-link">Another link</a>
            </div>
        
        `
        cards.appendChild(card);
    }
 
}
    

function elenco(data){

    
    const tabella = document.querySelector(".tbody");

    for(let i = 0; i < data.length; i++){
        
        const elenco = document.createElement("tr");
        elenco.innerHTML = 
    `
                        <th scope="row">1</th>
                        <td>${data[i]._id}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].price}</td>
    `

    tabella.appendChild(elenco);

    }
    
}
    

    function addProd(){

        const nome = document.querySelector("#nomeProd").value;
        console.log(nome);
        const descrizione = document.querySelector("#descProd").value;
        const brand = document.querySelector("#brandProd").value;
        const img = document.querySelector("#imgProd").value;
        const prezzo = document.querySelector("#prezzoProd").value;


        let obj = {
            name: `${nome}`,
            description: `${descrizione}`,
            brand: `${brand}`,
            imageUrl: `${img}`,
            price: `${prezzo}`
          };

        fetch("https://striveschool-api.herokuapp.com/api/product", {
    
        // Chiamata di tipo POST
        method: "POST", // Method della chiamata - Salvataggio di una risorsa
        body: JSON.stringify(obj), // nel body della richiesta invio il dato al server
        headers: {
          "Content-Type": "application/json", // il tipo del contenuto che sto inviando
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NDI3OWMwNTgzNTAwMTg1MjMxOWQiLCJpYXQiOjE3MDIzODAxNTMsImV4cCI6MTcwMzU4OTc1M30.-ZyXsx7p7y0c2Ww3K9fLdtNmZu2BAVCGGJo2T-N1Vlg"
        },
      })
      .then(response => response.json())
        .then(json => {
    console.log("Risposta del server alla chiamata POST:", json);
})
.catch(error => console.error("Errore durante la chiamata POST:", error));
    }
      
      
function editProd(){

    const nome = document.querySelector("#nomeProd").value;
        
        const descrizione = document.querySelector("#descProd").value;
        const brand = document.querySelector("#brandProd").value;
        const img = document.querySelector("#imgProd").value;
        const prezzo = document.querySelector("#prezzoProd").value;
        const id = document.querySelector("#idProd").value;


    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
  // Chiamata di tipo PUT
  method: "PUT", // Method della chiamata - Modifica di una risorsa
  body: JSON.stringify({
    name: `${nome}`,
    description: `${descrizione}`,
    brand: `${brand}`,
    imageUrl: `${img}`,
    price: `${prezzo}`
  }), // nel body della richiesta invio il dato al server
  headers: {
    "Content-Type": "application/json", 
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NDI3OWMwNTgzNTAwMTg1MjMxOWQiLCJpYXQiOjE3MDIzODAxNTMsImV4cCI6MTcwMzU4OTc1M30.-ZyXsx7p7y0c2Ww3K9fLdtNmZu2BAVCGGJo2T-N1Vlg"// il tipo del contenuto che sto inviando
  },
});
}


function delProd(){
    const id = document.querySelector("#idProd").value;

    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
        // Chiamata di tipo PUT
        method: "DELETE", // Method della chiamata - Modifica di una risorsa// nel body della richiesta invio il dato al server
        headers: {
          "Content-Type": "application/json", 
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NDI3OWMwNTgzNTAwMTg1MjMxOWQiLCJpYXQiOjE3MDIzODAxNTMsImV4cCI6MTcwMzU4OTc1M30.-ZyXsx7p7y0c2Ww3K9fLdtNmZu2BAVCGGJo2T-N1Vlg"// il tipo del contenuto che sto inviando
        },
      });
}
      