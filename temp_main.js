function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
  function handleLocationSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("Location coordinates:", { latitude, longitude });
    determineStateAndDisplayCenters(latitude, longitude);
  }
  
  function handleLocationError(error) {
    console.log("Error getting location:", error);
  }
  
  function determineStateAndDisplayCenters(latitude, longitude) {
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
  
    fetch(nominatimUrl)
      .then(response => response.json())
      .then(data => {
        const addressComponents = data.address;
        const stateOrRegion = addressComponents.state || addressComponents['ISO3166-2-lvl4'];
  
        console.log("Retrieved state or region:", stateOrRegion);
  
        if (stateOrRegion) {
          const userState = stateOrRegion.trim().toLowerCase();
          console.log("User state after normalization:", userState);
          displayDonationCenters(userState);
        } else {
          console.log('Unable to determine state or region');
          displayError("Unable to determine your state or region.");
        }
      })
      .catch(error => {
        console.log('Error occurred during reverse geocoding:', error);
        displayError("Error occurred during reverse geocoding.");
      });
  }
  
  function displayDonationCenters(userState) {
    const donationCentersContainer = document.getElementById('donation-centers-container');
    donationCentersContainer.innerHTML = ''; // Clear any existing content
  
    // Log the normalized state names for comparison
    console.log("User state for comparison:", userState);
    console.log("Predefined state names:", window.stateData.map(state => state.state.trim().toLowerCase()));
  
    const normalizedStateData = window.stateData.map(state => {
      return {
        ...state,
        state: state.state.trim().toLowerCase()
      };
    });
  
    const stateData = normalizedStateData.find(state => state.state === userState);
  
    if (stateData) {
      const stateDiv = document.createElement('div');
      stateDiv.classList.add('box');
      stateDiv.innerHTML = `<h2>${stateData.state.toUpperCase()}</h2>`;
      donationCentersContainer.appendChild(stateDiv);
  
      stateData.donationCenters.forEach(center => {
        const centerDiv = document.createElement('div');
        centerDiv.innerHTML = `
          <h3>${center.name}</h3>
          <p>Contact: ${center.contact}</p>
          <p>Address: ${center.address}</p>
          <iframe src="${center.mapLink}" allowfullscreen></iframe>
        `;
        stateDiv.appendChild(centerDiv);
      });
    } else {
      console.log("No donation centers found for state:", userState);
      displayError("No donation centers found for your location.");
    }
  }
  
  function displayError(message) {
    const donationCentersContainer = document.getElementById('donation-centers-container');
    donationCentersContainer.innerHTML = `<p>${message}</p>`;
  }
  
  // Hardcoded test case for Karnataka
  const testUserState = 'karnataka'; // Use the same format for predefined states in states.js
  console.log("Displaying hardcoded test case for state:", testUserState);
  displayDonationCenters(testUserState);
  
  getUserLocation();
  