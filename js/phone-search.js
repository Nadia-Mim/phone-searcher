document.getElementById('error-message').style.display = 'none';

const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('phone-details').textContent = '';
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
    if (phones.data.length <= 20) {
        phones.data.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100 rounded">
            <img src="${phone.image}" class="card-img-top image-size m-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h5 class="card-title">${phone.brand}</h5>
                <p onclick="loadPhoneDetail('${phone.slug}')" class="card-title btn btn-info text-white">Explore</p>
            </div>
        </div>
        `;
            searchResult.appendChild(div);
        })
    }
    else {
        let count = 0;
        phones.data.forEach(phone => {
            if (count < 20) {
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
                <div class="card h-100 rounded">
                <img src="${phone.image}" class="card-img-top image-size m-3" alt="...">
                <div class="card-body mt-3">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <h5 class="card-title">${phone.brand}</h5>
                    <p onclick="loadPhoneDetail('${phone.slug}')" class="card-title btn btn-info text-white">Explore</p>
                </div>
                </div>
                `;
                searchResult.appendChild(div);
            }
            count++;
        })

    }
}

const loadPhoneDetail = slug => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
    // displayPhoneDetail(data)
}

const displayPhoneDetail = phone => {
    console.log(Object.fromEntries(Object.entries(phone.mainFeatures)))
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    if (phone.releaseDate == '') {
        div.innerHTML = `
        <img src="${phone.image}" class="card-img-top image-size m-3" alt="...">
        <div class="card-body">
            <h4 class="card-title">Name: ${phone.name}</h4>
            <h4 class="card-text">Brand: ${phone.brand}</h4>
            <h4 class="card-text">Release Date: No release date available</h4>
            <h4 class="card-text">Main Features:</br> ${displayMainFeatures(phone.mainFeatures)}</h4> 
            <h4 class="card-text">Others:</br> ${displayOthers(phone.others)}</h4>  
        </div>
        `;
        phoneDetails.appendChild(div);
    }
    else if (phone.others == '' || !('others' in phone)) {
        div.innerHTML = `
        <img src="${phone.image}" class="card-img-top image-size m-3" alt="...">
        <div class="card-body">
            <h4 class="card-title">Name: ${phone.name}</h4>
            <h4 class="card-text">Brand: ${phone.brand}</h4>
            <h4 class="card-text">Release Date: ${phone.releaseDate}</h4> 
            <h4 class="card-text">Main Fatures:</br> ${displayMainFeatures(phone.mainFeatures)}</h4> 
            <h4 class="card-text">Others: No other details available</h4> 
        </div>
        `;
        phoneDetails.appendChild(div);
    }
    else {
        div.innerHTML = `
        <img src="${phone.image}" class="card-img-top image-size m-3" alt="...">
        <div class="card-body">
            <h4 class="card-title">Name: ${phone.name}</h4>
            <h4 class="card-text">Brand: ${phone.brand}</h4>
            <h4 class="card-text">Release Date: ${phone.releaseDate}</h4> 
            <h4 class="card-text">Main Fatures:</br> ${displayMainFeatures(phone.mainFeatures)}</h4> 
            <h4 class="card-text">Others:</br> ${displayOthers(phone.others)}</h4> 
        </div>
        `;
        phoneDetails.appendChild(div);
    }
}
const displayMainFeatures = feature => {
    let features = "";
    Object.entries(feature).forEach(([key, value]) => {
        features = `${features}</br> ${key} : ${value}`;
    })
    return features;
}
const displayOthers = other => {
    let others = "";
    Object.entries(other).forEach(([key, value]) => {
        others = `${others}</br> ${key} : ${value}`;
    })
    return others;
}

