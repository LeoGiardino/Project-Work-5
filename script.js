
function fetchData(url, callback) {
    fetch(url, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NDI3OWMwNTgzNTAwMTg1MjMxOWQiLCJpYXQiOjE3MDIzODAxNTMsImV4cCI6MTcwMzU4OTc1M30.-ZyXsx7p7y0c2Ww3K9fLdtNmZu2BAVCGGJo2T-N1Vlg"
        }
    })
    .then(response => response.json())
    .then(json => {
        callback(json);
        console.log(json);
    })
    .catch(error => console.log(error));
}

function firstFunction() {
    fetchData("https://striveschool-api.herokuapp.com/api/product/", json => {
        console.table(json);
        showData(json);
        dettaglio(json);

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

function dettaglio(data) {
    const cardz = document.querySelectorAll(".carta");
  
    cardz.forEach((el, index) => {
      el.addEventListener("click", function() {
        let dato = data[index];

        let obj = JSON.stringify(dato);
  
        // Aggiungi il parametro 'dato' all'URL e reindirizza l'utente
        window.location.href = `dettaglio.html?dato=${encodeURIComponent(obj)}`;
      });
    });
  }


document.addEventListener('DOMContentLoaded', () => {
    

    // Ottieni i parametri di query dalla URL
  const urlParams = new URLSearchParams(window.location.search);

  // Controlla se il parametro 'dato' è presente
  if (urlParams.has('dato')) {
    // Recupera il valore del parametro 'dato'
    const obj = urlParams.get('dato');

    const dato = JSON.parse(obj);

    // Fai qualcosa con il dato, ad esempio, lo puoi visualizzare nell'HTML
    const contenitore = document.querySelector(".cardzz");
    let div = document.createElement("div");

    div.innerHTML = 
        
    `
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4 text-center">
        <img src="${dato.imageUrl}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${dato.name}</h5>
          <p class="card-text">${dato.description}</p>
          <p class="card-text"><small class="text-body-secondary">$${dato.price}</small></p>
          <p class="card-text"><small class="text-body-secondary">${dato.brand}</small></p>
          <p class="card-text"><small class="text-body-secondary">${dato._id}</small></p>
        </div>
      </div>
    </div>
  </div>



    `



    contenitore.appendChild(div);
    
    
  }
    

    const links = document.querySelectorAll(".back");
    links.forEach(el => el.addEventListener("click", function() {
        window.location.href = "index.html";
    }))

 

    const addBtn = document.querySelector(".addBtn");
    addBtn.addEventListener("click", addProd);
    
    
    
    const resetBtn = document.querySelector(".resetBtn");
    resetBtn.addEventListener("click", resetInput);


    

    // const delBtn = document.querySelector(".delBtn");
    // delBtn.addEventListener("click", delProd);

});



function showData(data){

    const cards = document.querySelector(".carte");
    
    for(let i = 0; i < data.length; i++){

        let card = document.createElement("div");
        card.classList.add("carta");
        card.innerHTML = 
        `
  
            
        <div class="elemento d-flex">
                <div class="img">
                    <img src="${data[i].imageUrl}" class="bd-placeholder-img card-img-top" alt="" width="150" height="100">
                </div>
                <div class="corpo p-3">
                  <h6 class="card-title fw-bold">${data[i].name}</h6>
                  <p class="card-text"><small class="text-body-info">$${data[i].price}</small></p>
                  <div class="icone">
                  <i class="bi bi-pencil-square  px-1 border rounded fs-5"></i>
                  <a href="#"><i class="bi bi-info-circle  p-1 border rounded fs-5 infos"></i></a>
                  
                  </div>
                </div>
            </div>

        
        `
        cards.appendChild(card);
    }
 
}



function showDettagli(data){

    const bottone = document.querySelector(".infos");
    const cards = document.querySelector(".cardzz");

    bottone.addEventListener("click", function(e){
        console.log(e.target);
    })
    
    for(let i = 0; i < data.length; i++){

        let card = document.createElement("div");
        card.classList.add("carta");
        card.innerHTML = 
        `
  
            
        <div class="elemento d-flex">
                <div class="img">
                    <img src="${data[i].imageUrl}" class="bd-placeholder-img card-img-top" alt="" width="150" height="100">
                </div>
                <div class="corpo p-3">
                  <h6 class="card-title fw-bold">${data[i].name}</h6>
                  <p class="card-text"><small class="text-body-info">$${data[i].price}</small></p>
                  <div class="icone">
                  <i class="bi bi-pencil-square  px-1 border rounded fs-5"></i>
                  <a href="#"><i class="bi bi-info-circle  p-1 border rounded fs-5 infos"></i></a>
                  
                  </div>
                </div>
            </div>

        
        `
        cards.appendChild(card);
    }
 
}
    

function elenco(data) {
    const tabella = document.querySelector(".tbody");

    for (let i = 0; i < data.length; i++) {
        const elenco = document.createElement("tr");
        elenco.innerHTML = `
            <td scope="row">${i + 1}</td>
            <td>${data[i]._id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].brand}</td>
            <td>${data[i].price}</td>
            <td class="d-none">${data[i].description}</td>
            <td class="d-none">${data[i].imageUrl}</td>
            <td>
                <button type="button" class="modifica" 
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal"
                    data-id="${data[i]._id}"
                    data-name="${data[i].name}"
                    data-brand="${data[i].brand}"
                    data-price="${data[i].price}"
                    data-description="${data[i].description}"
                    data-imageUrl="${data[i].imageUrl}"
                >
                    <i class="bi bi-pencil-square" type="button" data-bs-target="#exampleModal"></i>
                </button>
                <i class="bi bi-x-square"></i>
            </td>
        `;
        tabella.appendChild(elenco);
    }

    const modificaButtons = document.querySelectorAll(".modifica");
    modificaButtons.forEach((mod) => {
        mod.addEventListener("click", (e) => {
            const trElement = e.target.closest("tr");
            const id = trElement.querySelector("td:nth-child(2)").textContent;
            const name = trElement.querySelector("td:nth-child(3)").textContent;
            const brand = trElement.querySelector("td:nth-child(4)").textContent;
            const price = trElement.querySelector("td:nth-child(5)").textContent;
            const description = trElement.querySelector("td:nth-child(6)").textContent;
            const imageUrl = trElement.querySelector("td:nth-child(7)").textContent;
            
        

            // Popola i campi di input della modale con i dati estratti
            document.querySelector(".idProd").value = id;
            document.querySelector(".nomeProd").value = name;
            document.querySelector(".brandProd").value = brand;
            document.querySelector(".prezzoProd").value = price;
            document.querySelector(".descProd").value = description;
            document.querySelector(".imgProd").value = imageUrl;



            
        });
    });

// Aggiungi un gestore di eventi per l'evento shown.bs.modal
document.getElementById('exampleModal').addEventListener('shown.bs.modal', function () {
    // Seleziona il bottone all'interno della modale quando è aperta
    const modalButton = document.querySelector('.salva');

    // Ora puoi eseguire le operazioni desiderate con il bottone
    // ad esempio, aggiungere un gestore di eventi
    modalButton.addEventListener('click', editProd); 
        
    })


}


function addProd(){

        const nome = document.querySelector("#nomeProd").value;

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

          console.log(obj);

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
.catch(error => 

    console.log("errore dettaglio :" , error.response.data));
    }
      
      
function editProd(){

    const nome = document.querySelector(".nomeProd").value;
    const descrizione = document.querySelector(".descProd").value;
    const brand = document.querySelector(".brandProd").value;
    const img = document.querySelector(".imgProd").value;
    const prezzo = document.querySelector(".prezzoProd").value;
    const id = document.querySelector(".idProd").value;


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
      

function resetInput(){

    const inputs = document.querySelectorAll(".form-control");
    inputs.forEach((input) => {
        input.value = "";
    })
}