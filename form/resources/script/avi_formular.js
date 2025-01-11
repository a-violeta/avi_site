//document.addEventListener("DOMContentLoaded", () => {
//});  

window.onload = function() {
    const bugetSlider = document.getElementById('buget');
    const creditValue = document.getElementById('bugetul');
    
    //slider ul
    bugetSlider.addEventListener('input', function() {
        creditValue.textContent = bugetSlider.value;
    });

    const form = document.getElementById("user_form");
    const notification = document.createElement("p");
    notification.id = "notification";
    form.insertAdjacentElement("afterend", notification);

    const intervalId = setInterval(() => {
        notification.textContent = "Nu uita să trimiți formularul cât mai repede!";
    }, 10000); //la fiecare 10 secunde

    form.addEventListener("submit", (event) => {
        event.preventDefault(); //pt testare, previne trimiterea reala
        clearInterval(intervalId); //opreste intervalul
        notification.textContent = "Formularul a fost trimis. Mulțumim!";
    });

    const body = document.body;
    const themeButton = document.createElement("button");
    themeButton.id = "theme_toggle";
    themeButton.textContent = "Schimba tema!";
    const p = document.getElementsByClassName("instructiuni"); //MODIFICARE
    p[0].insertAdjacentElement("beforebegin", themeButton);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        body.classList.add(savedTheme);
    } else {
        body.classList.add("light_mode"); //implicit light mode
    }
    //buton pt schimbarea temei
    themeButton.addEventListener("click", () => {
        if (body.classList.contains("light_mode")) {
            body.classList.replace("light_mode", "dark_mode");
            localStorage.setItem("theme", "dark_mode");
        } else {
            body.classList.replace("dark_mode", "light_mode");
            localStorage.setItem("theme", "light_mode");
        }
    });
  
    const romaniaRadio = document.getElementById("romania");
    const otherRadio = document.getElementById("other");
    const countyDropdown = document.getElementById("county-dropdown");
    const countyText = document.getElementById("county-text");

    //MODIFICARI
    function populateCounties() {
      countyDropdown.innerHTML = '<option value="">-- Selectează județul --</option>'; //reseteaza dropdown  
      fetch("../form/resources/json file/judete.json")
        .then(function(response) {
          if (response.ok) {
            return response.json(); //conversie raspuns la json
          } else {
            throw "Eroare la încărcarea fișierului JSON";
          }
        })
        .then(function(judete) {
         //iterare prin judete si adaugare la dropdown
          judete.forEach(function(judet) {
            const option = document.createElement("option");
            option.value = judet.toLowerCase();
            option.textContent = judet;
            countyDropdown.appendChild(option);
          });
        })
        .catch(function(error) {
          console.error("Eroare:", error);
        });
    }

    //actualizare campuri judet
    function updateCountyField() {
      if (romaniaRadio.checked) {
        //afisare camp pt judet
        countyDropdown.style.display = "block";
        countyText.style.display = "none";
        populateCounties(); //pune judetele
      } else if (otherRadio.checked) {
        //afiseaza camp text daca nu e romania tara
        countyDropdown.style.display = "none";
        countyText.style.display = "block";
      }
    }
  
    romaniaRadio.addEventListener("change", updateCountyField);
    otherRadio.addEventListener("change", updateCountyField);
  
    //setarea implicita
    updateCountyField();
}