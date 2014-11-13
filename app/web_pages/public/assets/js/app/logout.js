function logout(){
    localStorage.removeItem('user_data');
    window.location.href = local_host+"index.html";
}

