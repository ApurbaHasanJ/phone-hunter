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
                          <p class="card-text text-secondary">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                          <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-secondary " data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details </Button>
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

// search input field enter key handler
document.getElementById("search-field").addEventListener("keypress", function(e) {
  console.log(e.key)
    if (e.key === "Enter") {
        // start loader
  searchProcess(10)
    }
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
});

// Load phone details
const loadPhoneDetails = async id =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetail(data.data)
}

const displayPhoneDetail = phone => {
  console.log(phone)
  const modalTitle = document.getElementById('phoneDetailModalLabel');
  modalTitle.innerText = phone.name;

  const phoneStorage = document.getElementById('phone-storage');
  phoneStorage.innerText = phone.mainFeatures.storage;

  const phoneDisplay = document.getElementById('displaySize');
  phoneDisplay.innerText = phone.mainFeatures.displaySize;

  const phoneChipSet = document.getElementById('chipSet');
  phoneChipSet.innerText = phone.mainFeatures.chipSet;

  const phoneMemory = document.getElementById('phone-memory');
  phoneMemory.innerText = phone.mainFeatures.memory;

  const wlan = document.getElementById('wlan');
  wlan.innerText = phone.others.WLAN;

  const bluetooth = document.getElementById('bluetooth');
  bluetooth.innerText = phone.others.Bluetooth;

  const gps = document.getElementById('gps');
  gps.innerText = phone.others.GPS;

  const releaseDate = document.getElementById('release-date');
  releaseDate.innerText = phone.releaseDate;
}
  loadPhones('iphone', 10)
  