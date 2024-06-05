$(document).ready(function() {
    $("#loginForm").on("click",function(){
        
        var username = $('#username').val();
        var password = $('#password').val();
        var role = $('#role').val();
        
            let user=$("#username").val()
            let password=$("#password").val()
            if(user=="shreyash" && password=="abc"){
                alert("welcome")
                window.location="./components/registration.html"   
            }
        })
        if (role === 'restaurant') {
            window.location.href = 'restaurant.html';
        } else if (role === 'ngo') {
            window.location.href = 'ngo.html';
        } else if (role === 'admin') {
            window.location.href = 'admin.html';
        }
    });
