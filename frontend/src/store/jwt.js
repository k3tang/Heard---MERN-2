function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === cookieName) return value;
    }
    return null;
  }

async function jwtFetch(url, options = {}) {

    options.method = options.method || "GET";
    
    options.headers = options.headers || {};
   
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) options.headers["Authorization"] = "Bearer " + jwtToken;
  
    if (options.method.toUpperCase() !== "GET") {
      options.headers["Content-Type"] =
        options.headers["Content-Type"] || "application/json";
        options.headers["CSRF-Token"] = getCookie("CSRF-TOKEN");
    }
    
    // Call fetch with the url and the updated options hash.
    const res = await fetch(url, options);
 
    // If the response status code is 400 or above, then throw an error with the
    // error being the response.
    if (res.status >= 400) throw res;

      // If the response status code is under 400, then return the response to the
      // next promise chain.
      return res;
  }
  
  export default jwtFetch;