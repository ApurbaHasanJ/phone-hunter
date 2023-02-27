const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json()
    displayPhones(data.data, dataLimit)
  }

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent='';
    // Display 12 phones only
    const showAll = document.getElementById('show-more');
    if(dataLimit && phones.length > 12){
      phones = phones.slice(0,12);
      showAll.classList.remove('d-none')
    }
    else{
      showAll.classList.add('d-none')
    }

    // Display no phones
    const noPhoneFound = document.getElementById('no-found-msg');
    if(phones.length === 0){
      noPhoneFound.classList.remove('d-none')
    }

    else {
      noPhoneFound.classList.add('d-none')
    }


    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-3 h-100 shadow border border-0">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.phone_name}</h5>
                          <p class="card-text text-secondary">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                      </div>
        `;
        phonesContainer.appendChild(phoneDiv)
    })
    toggleSpinner(false)

    console.log(phones)
}

const searchProcess = (dataLimit) =>{
  toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit)
}

// Handle search btn click
document.getElementById('btn-search').addEventListener('click', function(){
  // start loader
  searchProcess(10)

});

const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')
  }

}

// Show all products
document.getElementById('show-more-btn').addEventListener('click', function(){
  searchProcess()
})

  loadPhones('iphone')