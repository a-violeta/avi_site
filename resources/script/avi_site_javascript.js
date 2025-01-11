
window.onload = function(){

    //highlight paragrafe apasate
    const paragrafe = document.querySelectorAll("p");

    paragrafe.forEach(paragraf => {
        paragraf.addEventListener("click", () => {
            paragraf.classList.toggle("highlight");
        });
        const links = paragraf.querySelector("a");
        if (links) {
            links.addEventListener("click", (event) => {
                event.stopPropagation();
            });
        }
    });

    //marire imagini galerie la click
    const imagini_de_marit = document.querySelectorAll('img:not(#throw img)');
    imagini_de_marit.forEach(imagine => {
        imagine.addEventListener("click", () => {
            imagine.classList.toggle("marita");
        });
    });

    //eliminare reclame
    const removeButton = document.createElement("button");
    removeButton.id = "remove_aside";
    removeButton.textContent = "Doresc eliminarea reclamelor!";
    const asideSection = document.querySelector("aside");
    if (asideSection) {
        asideSection.insertAdjacentElement("afterend", removeButton);
    }
    removeButton.addEventListener("click", () => {
        if (asideSection) {
            asideSection.remove();
            alert("Reclamele vor fi eliminate!");
        } else {
            alert("Secțiunea cu reclame nu există.");
        }
    });

    //imagine random pe header
    const images = [
        "../images/IMG_20240601_104055.jpg",
        "../images/IMG_20240623_100650.jpg",
        "../images/IMG_20210211_112526.jpg",
        "../images/IMG_20210115_133807.jpg"
    ];

    const header = document.querySelector("header");
    const changeBg = document.createElement("button");
    changeBg.id = "change_bg";
    changeBg.textContent = "Schimba fundalul header-ului!";
    const menu = document.getElementsByClassName("meniu");
    menu[0].insertAdjacentElement("afterbegin", changeBg);

    function changeBackground() {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        header.style.backgroundImage = `url(${randomImage})`;
    }
    changeBg.addEventListener("click", changeBackground);
    changeBackground(); //img random la incarcarea paginii

    //inghetare animatii
    const body = document.body;
    const div_special = document.getElementById("dezactivare_animatii");

    div_special.addEventListener("keydown", (event) => {
        event.stopPropagation();

        const key = event.key.toLowerCase(); //litere mici

        const toca = document.querySelector("#throw");
        
        const eye = document.getElementsByClassName("eye");
        const pupil = document.getElementsByClassName("eye-pupil");
        
        if (key === 'n') {
            alert("Animațiile vor fi pastrate!");
            if (toca.classList.contains("no_animation")){
                if (toca){
                    toca.classList.toggle("no_animation"); //adaug sau sterg clasa obiectelor, afisez mesaje diferite in functie de ce am facut
                }
                if (eye){
                    eye[0].classList.toggle("no_animation");
                    eye[1].classList.toggle("no_animation");
                }
                if (pupil){
                    pupil[0].classList.toggle("no_animation");
                    pupil[1].classList.toggle("no_animation");
                }
            }
        } else if (key === 'y') {
            alert("Animațiile vor fi dezactivate!");
            if (!toca.classList.contains("no_animation")){
                if (toca){
                    toca.classList.toggle("no_animation"); //adaug sau sterg clasa obiectelor, afisez mesaje diferite in functie de ce am facut
                }
                if (eye){
                    eye[0].classList.toggle("no_animation");
                    eye[1].classList.toggle("no_animation");
                }
                if (pupil){
                    pupil[0].classList.toggle("no_animation");
                    pupil[1].classList.toggle("no_animation");
                }
            }
        }
    });

    //light and dark mode
    const themeButton = document.createElement("button");
    themeButton.id = "theme_toggle";
    themeButton.textContent = "Schimba tema!";
    //const menu = document.getElementsByClassName("meniu");
    menu[0].insertAdjacentElement("afterbegin", themeButton);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        body.classList.add(savedTheme);
    } else {
        body.classList.add("light_mode"); //implicit light mode
    }
    //schimba tema la apăsarea butonului
    themeButton.addEventListener("click", () => {
        if (body.classList.contains("light_mode")) {
            body.classList.replace("light_mode", "dark_mode");
            localStorage.setItem("theme", "dark_mode");
        } else {
            body.classList.replace("dark_mode", "light_mode");
            localStorage.setItem("theme", "light_mode");
        }
    });

    //sesiuni cu localStorage
    const loginSection = document.getElementById("login-section");
    const welcomeSection = document.getElementById("welcome-section");
    const usernameInput = document.getElementById("username");
    const loginButton = document.getElementById("login-btn");
    const logoutButton = document.getElementById("logout-btn");
    const welcomeMessage = document.getElementById("welcome-message");

    //verifica daca utilizatorul este deja logat
    if (localStorage.getItem("loggedInUser")) {
        displayWelcome(localStorage.getItem("loggedInUser"));
    }

    //functie login
    loginButton.addEventListener("click", () => {
        const username = usernameInput.value.trim();

        if (username) {
            //stocam user in localStorage
            localStorage.setItem("loggedInUser", username);
            displayWelcome(username);
        } else {
            alert("Introduceți un nume de utilizator!");
        }
    });

    //functie logout
    logoutButton.addEventListener("click", () => {
        //sterg utilizatorul din localStorage
        localStorage.removeItem("loggedInUser");
        loginSection.style.display = "block";
        welcomeSection.style.display = "none";
    });

    // Funcție pentru afișarea mesajului de bun venit
    function displayWelcome(username) {
        welcomeMessage.textContent = `Bun venit, ${username}! Momentan nu sunt detalii disponibile.`;
        loginSection.style.display = "none";
        welcomeSection.style.display = "block";
    }

    const paragraph = document.getElementById("myParagraph");
    //const button = document.getElementById("changeColorButton");

    if (paragraph) {
        paragraph.addEventListener("click", () => {
            //stilul paragrafului
            const computedStyle = getComputedStyle(paragraph);
            const currentColor = computedStyle.color;

            //console.log("Culoarea curentă:", currentColor);

            //schimba culoarea paragrafului
            if (currentColor === "rgb(75, 0, 130)") {
                paragraph.style.color = "rgb(0, 130, 54)";
            } else if (currentColor === "rgb(0, 130, 54)"){
                paragraph.style.color = "rgb(75, 0, 130)";
            }
        });
    }
}
