"use strict";

// variables
let users = [
    {
        "login" : "admin@mail.ru",
        "password" : "admin_test",
        "key_code" : "test_admin",
        "is_admin"  : "1"
    },
    {
        "login" : "user@mail.ru",
        "password" : "user_test",
        "key_code" : "test_user",
        "is_admin"  : "0"
    }
];

let is_reg_flag = false;
let is_recovery_flag = false;

// buttons listeners
let to_log_btn = document.querySelector(".to_log_btn");
to_log_btn.addEventListener("click", auth_form_wrap);

let log_out_btn = document.querySelector(".log_out_btn");
log_out_btn.addEventListener("click", log_out);

let log_in_btn = document.querySelector(".log_in_btn");
log_in_btn.addEventListener("click", getLogPass);

let to_recovery_pwd = document.querySelector(".to_recovery_pwd");
to_recovery_pwd.addEventListener("click", recovery_form_wrap);

let to_reg_btn = document.querySelector(".to_reg_btn");
to_reg_btn.addEventListener("click", reg_form_wrap);

let reg_btn = document.querySelector(".reg_btn");
reg_btn.addEventListener("click", getLogPass);

let recovery_btn = document.querySelector(".recovery_btn");
recovery_btn.addEventListener("click", getLogPass);

document.addEventListener('submit', (e) => { 
    e.target.reset(); 
    e.preventDefault();
});

// wraper forms
function auth_form_wrap() {
    is_reg_flag = false;
    is_recovery_flag = false;

    anti_wrap_reg_form();
    anti_wrap_recovery_form();

    let login_form = document.querySelector(".login_form");
    login_form.style.display = "block";
    clear_content();
}

function reg_form_wrap() {
    is_reg_flag = true;
    is_recovery_flag = false;

    anti_wrap_auth_form();
    anti_wrap_recovery_form();

    let registration_form = document.querySelector(".registration_form");
    registration_form.style.display = "block";
    clear_content();
}

function recovery_form_wrap() {
    is_reg_flag = false;
    is_recovery_flag = true;

    anti_wrap_auth_form();
    anti_wrap_reg_form();
    
    let recovery_form = document.querySelector(".recovery_form");
    recovery_form.style.display = "block";
    clear_content();
}

//antiwrapper forms
function anti_wrap_auth_form() {
    let login_form = document.querySelector(".login_form");
    login_form.style.display = "none";
}

function anti_wrap_reg_form() {
    let registration_form = document.querySelector(".registration_form");
    registration_form.style.display = "none";

}

function anti_wrap_recovery_form() {
    let recovery_form = document.querySelector(".recovery_form");
    recovery_form.style.display = "none"; 
}


// data's functions
function getLogPass(){

    if (is_reg_flag == true && is_recovery_flag == false){
        let reg_log = document.querySelector("#reg_log").value;
        let reg_pwd = document.querySelector("#reg_pwd").value;
        let key_code = document.querySelector("#key_code").value;

        if(reg_log && reg_pwd && key_code){
            check_reg(reg_log, reg_pwd, key_code);
        }
        else{
            alert("Not all fields are filled correctly");
        }
    }
    if (is_reg_flag == false && is_recovery_flag == false){
        let auth_log = document.querySelector("#auth_log").value;
        let auth_pwd = document.querySelector("#auth_pwd").value;
    
        if(auth_log && auth_pwd){
            check_log_in(auth_log, auth_pwd);
        }
        else{
            alert("Not all fields are filled correctly");
        }   
    }
    if (is_reg_flag == false && is_recovery_flag == true){
        let log = document.querySelector("#log").value;
        let code = document.querySelector("#code").value;
        let pwd = document.querySelector("#pwd").value;

        if(log && code && pwd){
            check_recovery(log, code, pwd);
        }
        else{
            alert("Not all fields are filled correctly");
        }   
    }
}


function check_log_in(auth_log, auth_pwd){
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(auth_log)) {
        alert('Invalid username!');
        auth_log.focus;
        return false;
    }
    else{
        log_in(auth_log, auth_pwd);
    }
}

function check_reg(reg_log, reg_pwd, key_code){
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(reg_log)) {
        alert('Invalid username!');
        reg_log.focus;
        return false;
    }
    else{
        registration(reg_log, reg_pwd, key_code);
    }
}

function check_recovery(log, code, pwd){
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(log)) {
        alert('Invalid username!');
        log.focus;
        return false;
    }
    else{
        recovery(log, code, pwd);
    }
}


function clear_content(){
    let div = document.getElementById('content_page');
    while(div.firstChild){
    div.removeChild(div.firstChild);
    }
}

function log_out(){
    let log_out_btn = document.querySelector(".log_out_btn");
    log_out_btn.style.display = "none";

    let to_log_btn = document.querySelector(".to_log_btn");
    to_log_btn.style.display = "inline";
    clear_content();
}

function registration(reg_log, reg_pwd, key_code) {
    let flag = false;
    for (const user of users) {
        if (user.login == reg_log) {
            flag = true;
            alert("A user with this name already exists");
        }
    }
    if (!flag){
        let add = {
                "login" : reg_log,
                "password" : reg_pwd,
                "key_code" : key_code,
                "is_admin" : "0"
        };
        users.push(add);
        localStorage.setItem("users", JSON.stringify(users));
        console.table(users);
        log_in(auth_log, auth_pwd, reg_log, reg_pwd);
        anti_wrap_reg_form();
    }
}

function log_in(auth_log, auth_pwd, reg_log, reg_pwd) {
    let flag = false;
    let is_admin_flag = 0;

    let list_of_users = JSON.parse(localStorage.getItem("users"));

    for (const user of list_of_users) {
        if ((user.login == auth_log && user.password == auth_pwd)||(user.login == reg_log && user.password == reg_pwd)) {
            flag = true;
            
            is_admin_flag = user.is_admin;   
            add_content(is_admin_flag);
            anti_wrap_auth_form();
            let to_log_btn = document.querySelector(".to_log_btn");
            to_log_btn.style.display = "none";

            let log_out_btn = document.querySelector(".log_out_btn");
            log_out_btn.style.display = "inline";
            break;
        }
    }
    if (!flag) {
        alert("Invalid username or password!");
    }
}

function recovery(log, code, pwd) {
    let flag = false;

    let list_of_users = JSON.parse(localStorage.getItem("users"));

    for (const user of list_of_users) {
        if (user.login == log && user.key_code == code) {
            flag = true;
            user.password = pwd;

            localStorage.setItem("users", JSON.stringify(list_of_users));

            is_reg_flag = false;
            auth_form_wrap();
        }
    }
    if (!flag){
        alert("Invalid username or recovery code!");
    }
}

// add content
function add_content(is_admin_flag) {
    clear_content();
    let content = document.querySelector(".content");

    if(is_admin_flag == 1){
        content.innerHTML = `<img src="img/admin.png" alt="admin" Width="100px">`;
    }
    else if(is_admin_flag == 0){
        content.innerHTML = `Hello User`;
    }   
}
