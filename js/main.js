const APP = {
  init: () => {
    console.log("APP.init");
    APP.addEventListeners();
    APP.fetchManifest();
  },
  addEventListeners: () => {
    console.log("APP.addEventListeners");
  },

  fetchManifest: () => {
    //temporary access to the manifest with https://cors-anywhere.herokuapp.com/
    // const url =
    // "https://cors-anywhere.herokuapp.com/https://app.mytoursapp.com/api/v3/app/manifest";
    const url = "https://app.mytoursapp.com/api/v3/app/manifest";
    const username = "9403";
    const password = "f313a575-e87e-45b4-88ef-43445071f0da";
    const authString = `${username}:${password}`;
    fetch(url, {
      method: "GET",
      mode: "no-cors",
      headers: {
        Authorization: `Basic ${btoa(`${authString}`)}`,
        "Content-Type": "application/json",
        HTTP_STQRY_PROJECT_TYPE: "app",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.screens);
        data.screens.forEach((screen) => {
          console.log(screen);
          const screenUrl = `https://cors-anywhere.herokuapp.com/https://app.mytoursapp.com/api/v3/screens/${screen.id}/en/${screen.version}`;
          fetch(screenUrl, {
            method: "GET",
            headers: {
              Authorization: `Basic ${btoa(`${authString}`)}`,
              "Content-Type": "application/json",
              HTTP_STQRY_PROJECT_TYPE: "app",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });
        });
      });
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
