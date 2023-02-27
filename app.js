const loadPhones = async(searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json()
    displayPhones(data.data)
  }

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent='';
    // Display 16 phones only
    phones = phones.slice(0,12);

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

document.getElementById('btn-search').addEventListener('click', function(){
  // start loader
  toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText)

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

  loadPhones('iphone')