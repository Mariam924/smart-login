/* --- Signup Inputs --- */
var SignupUsername = document.getElementById('SignupUsername');
var SignupEmail = document.getElementById('SignupEmail');
var SignupPass = document.getElementById('SignupPass');

/* --- Login Inputs --- */
var LoginEmail = document.getElementById('LoginEmail');
var LoginPass = document.getElementById('LoginPass');

/* ------ URL ------- */
var pathparts = location.pathname.split('/'); 
var baseURL = ''

for (var i = 0; i < pathparts.length -1; i++) { 
    baseURL += '/' + pathparts[i]; 
}

/* ----- Storage --- */
if(localStorage.getItem(`Accounts`)!=null){
    signupContainer= JSON.parse(localStorage.getItem(`Accounts`));
}
else{
    signupContainer= [];
}

/* ------------------------------------------- Add Account ----------------------------------- */

function addAccount() {

    if(validateAccount()){
        var signUp = {
            name: SignupUsername.value,
            email: SignupEmail.value,
            password: SignupPass.value,
        }
        if(emailExist()){
            document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'
        }
        else{
            signupContainer.push(signUp);
            clearForm();
            localStorage.setItem(`Accounts`, JSON.stringify(signupContainer));
            document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        }
    }
}

/* -------------------------------- Check the existance of email ------------------------------*/

function emailExist(){
    var returnValue;
    
    for(var i=0 ; i< signupContainer.length ; i++){
        if(SignupEmail.value === signupContainer[i].email){
            console.log(signupContainer[i].email + "exist");
            returnValue = 1;
        }
        else{
            console.log(signupContainer);
            returnValue = 0;

        }
    }
    return returnValue;
}

/* ------------------------------------------- ClearForm ------------------------------------- */

function clearForm(){
    SignupUsername.value = "";
    SignupEmail.value = "";
    SignupPass.value = "";

    SignupUsername.classList.remove('is-valid');
    SignupUsername.classList.remove('is-invalid');

    SignupEmail.classList.remove('is-valid');
    SignupEmail.classList.remove('is-invalid');

    SignupPass.classList.remove('is-valid');
    SignupPass.classList.remove('is-invalid');
}

/* ------------------------------------- validateBookmark ------------------------------------- */

/* ----- validatName -----*/

function validateName(){
    var regex = /^[A-Za-z 0-9]{4,10}?$/gm;

    if(regex.test(SignupUsername.value)){

        if(SignupUsername.classList.contains('is-invalid')){
            SignupUsername.classList.replace('is-invalid', 'is-valid');
        }
        return true;
    }
    else{
        SignupUsername.classList.add('is-invalid');
        return false;
    }
}

/* ----- validatEmail -----*/

function validateEmail(){
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if(regex.test(SignupEmail.value)){

        if(SignupEmail.classList.contains('is-invalid')){
            SignupEmail.classList.replace('is-invalid', 'is-valid');
        }
        return true;
    }
    else{
        SignupEmail.classList.add('is-invalid');
        return false;
    }
}
/* ----- validatPassword -----*/

function validatePass(){
    var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    /* 
    (?=.*[0-9]) - Assert a string has at least one number
    (?=.*[!@#$%^&*]) - Assert a string has at least one special character.
    */

    if(regex.test(SignupPass.value)){

        if(SignupPass.classList.contains('is-invalid')){
            SignupPass.classList.replace('is-invalid', 'is-valid');
        }
        return true;
    }
    else{
        SignupPass.classList.add('is-invalid');
        return false;
    }
}

/* ----- validatAccount -----*/

function validateAccount(){
    if(validateName() && validatePass() && validateEmail()){
        return true;
    }
    else{
        return false;
    }
}

/* ------------------------------------------ Login -------------------------------------------- */

/* ----------------------------------- not empty login Inputs -----------------------------------*/

function isEmpty(){
    var email= LoginEmail.value;
    var password= LoginPass.value;

    if(email == "" || password == ""){
        return true;
    }
    else{
        return false;
    }
}

/* ------------------------------------------ login -------------------------------------------- */

function login() {
        

    if (isEmpty()) {
        document.getElementById('login-exist').innerHTML = '<span class="text-danger pt-3">All inputs is required</span>'
    }
    else{
        for (var i = 0; i < signupContainer.length; i++) {
            if ( (signupContainer[i].email == LoginEmail.value) && (signupContainer[i].password.toLowerCase() == LoginPass.value.toLowerCase())){
                
                document.getElementById('login-exist').innerHTML = '<span class="p-2 text-primary">truee</span>';
                localStorage.setItem('homeUsername', signupContainer[i].name)

                if (baseURL == '/') {
                    location.replace('http://127.0.0.1:5501/home.html')
    
                } else {
                    location.replace(baseURL + '/home.html')
    
                }
    
            }
            else if( (signupContainer[i].email == LoginEmail.value) || (signupContainer[i].password.toLowerCase() == LoginPass.value.toLowerCase())){
                document.getElementById('login-exist').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
            } 
           
        
        }
    }
    
}

/* ---------------------------------------- 3) home ------------------------------------------ */

var welcomeName = localStorage.getItem(`homeUsername`);
console.log(welcomeName);

if (welcomeName) {
    document.getElementById('welcomeName').innerHTML = "Welcome " + welcomeName + ' to our'+`<span class='x-space-subtitle m-3'>Xspace</span>` + "Team";
}

function logout() {
    localStorage.removeItem('homeUsername');
}
/* ---------------------------------------- References ------------------------------------------ */
/* 
1) https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
2) https://stackoverflow.com/questions/940577/javascript-regular-expression-email-validation
3) https://www.w3schools.com/howto/howto_css_fullscreen_video.asp
4) https://videos.space.com/m/mmLJ2CGb/spacex-crew-5-mission-launches-to-space-station-booster-nails-landing
*/
