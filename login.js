const loggedUser = () => {
    const user = localStorage.getItem(`user`);
    if (user) window.location.href = "./index.html"
}

loggedUser()

const login = () => {
    const userName = document.getElementById("userName").value
    const password = document.getElementById("password").value
    const user = {
        userName: userName,
        password: password,
    }
    if (userName && password) {
        const enJSON = JSON.stringify(user);
        localStorage.setItem(`user`, enJSON);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'Logueado exitosamente!',
            showConfirmButton: false,
            timer: 1200
        })
        setTimeout(() => {
            window.location.href = "./index.html"
        }, 1600);
    } else {
        Swal.fire({
            icon: 'error',
            text: '¡Debes completar ambos campos para ingresar!',
        })
    }
}

