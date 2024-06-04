function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // Use latitude and longitude to fetch user's city/state (explained later)
  }
  
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }
  function getAddress(lat, lng) {
    // Replace 'YOUR_API_KEY' with your actual Google Maps API key
    const url = https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_API_KEY;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const addressComponents = data.results[0].address_components;
        for (let component of addressComponents) {
          if (component.types.includes("administrative_area_level_1")) {
            const state = component.short_name;
            matchState(state); // Call function to match state with your data array
            break;
          }
        }
      })
      .catch(error => console.error(error));
  }
  
  function matchState(state) {
    // Access your state data array here (explained below)
    const matchingLinks = stateData[state];
    if (matchingLinks) {
      // Update your front-end to display the matching Google Maps links (explained below)
      displayLinks(matchingLinks);
    } else {
      console.log("No matching links found for this state.");
    }
  }
  function displayLinks(links) {
    const linkContainer = document.getElementById("link-container"); // Assuming you have an element with this ID
    linkContainer.innerHTML = ""; // Clear previous content
  
    for (let link of links) {
      const linkElement = document.createElement("a");
      linkElement.href = link;
      linkElement.textContent = link; // Or you can customize the link text here
      linkContainer.appendChild(linkElement);
    }
  }
  const stateData = {
    "Karnataka": ["https://www.google.co.in/maps/place/Karnataka/@14.7534637,72.8684096,8.34z/data=!4m6!3m5!1s0x3ba35a4c37bf488f:0x41f1d28cd1757cd5!8m2!3d15.3172775!4d75.7138884!16zL20vMDQ5bHI?coh=208015&entry=tt"],
    "Maharashtra": ["https://maps.app.goo.gl/cQrhUN11E1Yi6j1t7"],
    "goa":["https://www.google.co.in/maps/place/Goa/@15.3500845,73.347191,9z/data=!3m1!4b1!4m6!3m5!1s0x3bbfba106336b741:0xeaf887ff62f34092!8m2!3d15.2993265!4d74.123996!16zL20vMDFjMW5t?coh=208015&entry=tt"],
    "Bihar":["https://www.google.co.in/maps/place/Jagdeo+Path,+Patna,+Bihar+800025/@25.6058227,85.0706031,17z/data=!3m1!4b1!4m10!1m2!2m1!1sGoonj+,+Flat+no-+A%2F401,+Jagdeo+ashiyana+apartment,+Ashiyana+Nagar+Patna-+800025+(Near+Prabhuji+restaurant)!3m6!1s0x39ed57b79775970f:0x521cb9a2810bb7c!8m2!3d25.6058228!4d85.075474!15sCmpHb29uaiAsIEZsYXQgbm8tIEEvNDAxLCBKYWdkZW8gYXNoaXlhbmEgYXBhcnRtZW50LCBBc2hpeWFuYSBOYWdhciBQYXRuYS0gODAwMDI1IChOZWFyIFByYWJodWppIHJlc3RhdXJhbnQpIgOIAQGSAQVyb3V0ZeABAA!16s%2Fg%2F11cnq5gn09?entry=ttu"],
    "delhi":["https://maps.app.goo.gl/ZnxGuo8k1M9Xjixs7"],
    "harayan":["https://maps.app.goo.gl/5E1UDZt9WPwaTeDaA"],
    "kerla":["https://maps.app.goo.gl/Jnhth1aTaMHmd2xW8"],
    "Madyapradesh":["https://maps.app.goo.gl/hfz4Z8WdMUnStLAJ8"],
    "odissa":["https://maps.app.goo.gl/3WUrptcphyWxaPaW6"],
    "punjab":["https://maps.app.goo.gl/zLf7aJmbDanJRsJt7"],
    "rajastan":["https://maps.app.goo.gl/Zp6yrRtNZaDxgSfu6"],
    "tamilnadu":["https://maps.app.goo.gl/e5VLPhabFYTnQde4A"]

    // Add entries for other states
  };