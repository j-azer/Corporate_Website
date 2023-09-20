
let url = "http://localhost:3000"

let menu = document.querySelector('#menu');
let nav = document.querySelector('.navegacao1');

let number = document.querySelector('#showtel');
let tel = document.querySelector('#fone');

let backgroundCookie = document.querySelector('.cookie-bacground');
let btnCookie = document.querySelector('#btnCookie');
let body = document.querySelector('body');

let time = 500;
let showInput = document.querySelector('#inputpesquisa');
let pesquisa = document.querySelector('#pesquisa');

let showLogin = document.querySelector('.login-bacground');
let login = document.querySelector('#login');
let closeLogin = document.querySelector('#btClose');

let validar = document.querySelector('#btnLogin');
let pass = document.querySelector('#txtpassword');
let email = document.querySelector('#txtemail');
let mensagemErro = document.querySelector('#msgErro');

let helloUser = document.querySelector('#helloUser');
let logout = document.querySelector('#logout');

let time1 = 5000;
let imageIndex = 0;
let images = document.querySelectorAll("#slider div");
let max = images.length;


//VERIFICAR COM PEDRO !!!!

// let linksMenu = document.querySelectorAll("#link li");

// function bodyLink() {
//     for (let link of linksMenu) {
//         link.addEventListener('click', function () {

//             body.style.overflowY = 'visible';
//         });
//     }
// }
// window.addEventListener('click', bodyLink);
// window.addEventListener('load', bodyLink);


menu.addEventListener('click', function () {

    if (nav.style.display === 'block') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
    }
});


tel.addEventListener('mouseover', function () {

    if (number.style.display === 'block') {
        number.style.display = 'none';
    } else {
        number.style.display = 'block';
    }
});


btnCookie.addEventListener('click', function () {

    backgroundCookie.style.display = 'none';
    body.style.overflowY = 'visible';

});


pesquisa.addEventListener('click', function () {

    setTimeout(function () {
        if (showInput.style.display === 'block') {
            showInput.style.display = 'none';
        } else {
            showInput.style.display = 'block';
        }
        showInput.focus();

    }, time);
});


body.addEventListener('click', function (e) {

    setTimeout(function () {
        if (e.target.id !== 'pesqIcon') {
            if (showInput.style.display === 'block')
                showInput.style.display = 'none';
        }
    }, time);
});


login.addEventListener('click', function () {

    showLogin.style.display = 'block';
});
closeLogin.addEventListener('click', closeModalLogin);


logout.addEventListener('click', function () {
    login.style.display = 'block';
    logout.style.display = 'none';
    helloUser.style.display = 'none';
    window.sessionStorage.removeItem("user");
})


window.addEventListener('DOMContentLoaded', function () {
    let user = window.sessionStorage.getItem('user');
    if (user !== null) {
        login.style.display = 'none';
        logout.style.display = 'block';
    }
});



function closeModalLogin() {
    showLogin.style.display = 'none';
}




function nextImage() {
    // console.log(images);
    images[imageIndex].classList.remove('select');

    imageIndex++;

    if (imageIndex >= max) {
        imageIndex = 0;
    }

    images[imageIndex].classList.add('select');
}




function start() {
    // console.log('carregou...');
    setInterval(() => {
        // console.log('Rodando a função...');
        nextImage();
    }, time1)
}
window.addEventListener('load', start)



function validationForm() {
    if (pass.value !== "" && email.value !== "") {

        let emalRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (emalRegex.test(email.value)) {

            buscarUser(email.value, pass.value);

        } else {
            mensagemErro.innerHTML = 'O e-mail tem um formato incorreto!';
            pass.value = "";
            email.value = "";
        }
    } else {
        mensagemErro.innerHTML = 'Os dois campos são de preenchimento obrigatório!';
    }
}
validar.addEventListener('click', validationForm);




function validarUtilizador(dados, email, pass) {
    // console.log(dados);
    let checked = false;
    let user = null;
    for (let dado of dados) {

        checked = dado.email == email && dado.senha == pass ? true : false;

        if (checked == true) {
            user = dado;
            break;
        }
    }
    return { checked, user };
}



function retornoValidacao(retorno, user) {
    if (retorno == true) {
        // mensagemErro.innerHTML = 'Parabéns, logado!';
        closeLogin.click();
        helloUser.innerHTML = `Bem-vindo(a), ${user.nome} !`;
        login.style.display = 'none';
        logout.style.display = 'block';
        window.sessionStorage.setItem("user", JSON.stringify(user));

    } else {
        mensagemErro.innerHTML = 'Utilizador inexistente!';
        pass.value = "";
        email.value = "";
    }
}



function buscarUser(email, pass) {
    fetch(`${url}/utilizadores`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject("Erro na recepção dos dados!");
            }
        })
        .then(dados => {
            let result = validarUtilizador(dados, email, pass);
            // console.log(checkeduser);
            retornoValidacao(result.checked, result.user);
        })
        .catch(erro => console.log("Ocorreu um erro: " + erro));
}


