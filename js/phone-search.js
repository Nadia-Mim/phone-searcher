document.getElementById('error-message').style.display = 'none';
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    if (searchText == '') {
        displayError()
    }
    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));
    }
}

const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('error-message').innerText = "No Phone Found !!!";
}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (phones.length == 0) {
        displayError();
    }

    phones.data.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadPhoneDetail('${phone.slug}')" class="card h-100 rounded">
            <img src="${phone.image}" class="card-img-top image-size m-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h5 class="card-title">${phone.brand}</h5>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadPhoneDetail = slug => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
    // displayPhoneDetail(data)
}

const displayPhoneDetail = phone => {
    console.log(phone)
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    if (phone.releaseDate == '') {
        div.innerHTML = `
        <img src="${phone.image}" class="card-img-top image-size m-3" alt="...">
        <div class="card-body">
            <h3 class="card-title">${phone.name}</h3>
            <h3 class="card-text">${phone.brand}</h3>
            <h3 class="card-text">"No release date available"</h3> 
        </div>
        `;
        phoneDetails.appendChild(div);
    }
    else {
        div.innerHTML = `
        <img src="${phone.image}" class="card-img-top image-size m-3" alt="...">
        <div class="card-body">
            <h3 class="card-title">${phone.name}</h3>
            <h3 class="card-text">${phone.brand}</h3>
            <h3 class="card-title">${phone.releaseDate}</h3> 
        </div>
        `;
        phoneDetails.appendChild(div);
    }
}

