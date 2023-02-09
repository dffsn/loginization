"use strict";

// variables
let users = [
    {
        "login" : "admin@mail.ru",
        "password" : "admin_test",
        "key_code" : "test_admin",
        "is_admin"  : "true"
    },
    {
        "login" : "user@mail.ru",
        "password" : "user_test",
        "key_code" : "test_user",
        "is_admin"  : "false"
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
});

// wraper forms
function auth_form_wrap() {
    is_reg_flag = false;
    is_recovery_flag = false;

    clear_content();
    anti_wrap_reg_form();
    anti_wrap_recovery_form();

    let login_form = document.querySelector(".login_form");
    login_form.style.display = "block";

}

function reg_form_wrap() {
    is_reg_flag = true;
    is_recovery_flag = false;

    clear_content();
    anti_wrap_auth_form();
    anti_wrap_recovery_form();

    let registration_form = document.querySelector(".registration_form");
    registration_form.style.display = "block";
}

function recovery_form_wrap() {
    is_reg_flag = false;
    is_recovery_flag = true;

    clear_content();
    anti_wrap_auth_form();
    anti_wrap_reg_form();

    let recovery_form = document.querySelector(".recovery_form");
    recovery_form.style.display = "block";
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
function getLogPass(auth_log, auth_pwd, reg_log, reg_pwd, key_code, log, code, pwd) {
    if (is_reg_flag == true && is_recovery_flag == false){
        let reg_log = document.querySelector("#reg_log").value;
        let reg_pwd = document.querySelector("#reg_pwd").value;
        let key_code = document.querySelector("#key_code").value;

        if (reg_log && reg_pwd && key_code){
            checkLogPass(auth_log, auth_pwd, reg_log, reg_pwd, key_code);
        }
    }
    if (is_reg_flag == false && is_recovery_flag == false){
        let auth_log = document.querySelector("#auth_log").value;
        let auth_pwd = document.querySelector("#auth_pwd").value;
    
        checkLogPass(auth_log, auth_pwd);
    }
    if (is_reg_flag == false && is_recovery_flag == true){
        let log = document.querySelector("#log").value;
        let code = document.querySelector("#code").value;
        let pwd = document.querySelector("#pwd").value;

        if (log && code && pwd){
            checkLogPass(auth_log, auth_pwd, reg_log, reg_pwd, key_code, log, code, pwd);
        }
    }
}


function checkLogPass(auth_log, auth_pwd, reg_log, reg_pwd, key_code, log, code, pwd) {
    if (is_reg_flag == true){
       registration(reg_log, reg_pwd, key_code);
    }
    if (!is_reg_flag && auth_log != "[object HTMLInputElement]" && auth_pwd != "[object HTMLInputElement]"){
        log_in(auth_log, auth_pwd);
    }
    if (is_reg_flag == false && is_recovery_flag == true){
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
    clear_content();

    let to_log_btn = document.querySelector(".to_log_btn");
    to_log_btn.style.display = "block";
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
        users.push(
            {
                "login" : reg_log,
                "password" : reg_pwd,
                "key_code" : key_code,
                "is_admin" : "false"
            });
            console.table(users);

            is_reg_flag = false;

            auth_form_wrap();
    }
}

function log_in(auth_log, auth_pwd) {
    let flag = false;
    let is_admin_flag = false;
    let content = document.querySelector(".content");
    for (const user of users) {
        if (user.login == auth_log && user.password == auth_pwd) {
            flag = true;
            
            is_admin_flag = user.is_admin;
            add_content(is_admin_flag);
            
            anti_wrap_auth_form();

            let to_log_btn = document.querySelector(".to_log_btn");
            to_log_btn.style.display = "none";

            let log_out_btn = document.querySelector(".log_out_btn");
            log_out_btn.style.display = "block";

            break;
        }
    }
    if (!flag) {
        content.innerHTML = `Invalid username or password!`;
    }
}

function recovery(log, code, pwd) {
    let flag = false;
    let content = document.querySelector(".content");
    for (const user of users) {
        if (user.login == log && user.key_code == code) {
            flag = true;
            user.password = pwd;

            console.table(users);

            is_reg_flag = false;

            auth_form_wrap();
        }
    }
    if (!flag){
        content.innerHTML = `Invalid username or password!`;
    }
}

// add content
function add_content(is_admin_flag) {
    clear_content();
    let content = document.querySelector(".content");
    console.log(is_admin_flag);
    if (is_admin_flag){
        content.innerHTML = `<img src="img/admin.png" alt="admin" Width="25%">`;
    } else{
        content.innerHTML = `Hello`; 
    }
    
}