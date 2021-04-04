document.querySelectorAll('#kévin, #annaelle, #et, #group').forEach(element => element.addEventListener('animationend', endAnimation));

document.querySelector('#kévin').addEventListener('animationend',function(){document.getElementsByTagName("html")[0].classList.remove("disable-scroll")})

function endAnimation(){
    this.style.opacity='1'   
}


let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const slider = document.querySelector('.third-section');

slider.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
    console.log()
}, false);

slider.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false); 

function handleGesture() {
    if (touchendX < touchstartX) {
        plusSlides(1)
    }
    if (touchendX >= touchstartX) {
        plusSlides(-1)
    }
    
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slide_image = document.querySelector('.slide-image');
    const images      = slide_image.children;
    const slide_info  = document.querySelector('.slide-info');
    const info        = slide_info.getElementsByTagName('span');
    const dots        = document.getElementsByClassName("dot");
    
    if (n > images.length) {slideIndex = 1}
    if (n < 1) {slideIndex = images.length}

    for (i = 0; i < images.length; i++) {
        images[i].classList.remove('opaque');
    }
    const selected_image = images[slideIndex-1]

    for (i=0; i < info.length; i++){
        if (selected_image.dataset.place == info[i].dataset.show){
            info[i].classList.add('active');
        }
        else{
            info[i].classList.remove('active')
        }
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].style.backgroundColor='#bbb';
    }
    selected_image.classList.add('opaque');
    dots[slideIndex-1].style.backgroundColor='#717171';

    showInfo()
    slideColor(selected_image.dataset.place)
} 
  
function showMap(e) {
    const active          = document.querySelector('.active');
    const mapContainer    = document.querySelector('.map-container');
    const maps            = mapContainer.children;
    const info            = document.querySelector('.info-reveal');
    const activeMap       = document.querySelector('.activeMap')
    const mairiePosition  = {lat: -20.879416, lng: 55.447837};
    const mairieContainer = document.getElementById('map-mairie');
    const eglisePosition  = {lat: -20.883818986105087, lng: 55.45866714106996}; 
    const egliseContainer = document.getElementById('map-eglise');
    const sallePosition   = {lat: -20.94285485312177, lng: 55.63389676426542}; 
    const salleContainer  = document.getElementById('map-salle');
  
    
    info.classList.remove('info-reveal')
    activeMap.classList.remove('activeMap')
    for (i=0; i < maps.length; i++){
        if (active.dataset.show == maps[i].dataset.show){
            if (active.dataset.show == 'mairie'){initMap(mairiePosition,mairieContainer); mapsId = document.getElementById(maps[i].id)}
            else if (active.dataset.show == 'eglise'){initMap(eglisePosition,egliseContainer); mapsId = document.getElementById(maps[i].id)}
            else if (active.dataset.show == 'salle'){initMap(sallePosition,salleContainer); mapsId = document.getElementById(maps[i].id)}
            break;
        }
    }
    mapsId.classList.add('activeMap')
    mapContainer.classList.add('info-reveal')
    e.stopPropagation()
}

function showInfo(e=0) {
    const mapContainer = document.querySelector('.map-container');
    const info         = document.querySelector('.steps');

    
    mapContainer.classList.remove('info-reveal');
    info.classList.add('info-reveal');
    if(e!=0){
       e.stopPropagation() 
    }
    
}

function slideColor(slide){
    let color
    let name
    const label   = document.querySelector('.slide-label');
    const showBut = document.querySelectorAll('.show');
    const textBut = document.querySelector('.text');
    const mapBut  = document.querySelector('.map')
    const icons   = document.querySelectorAll('.material-icons-round');
    if (slide == 'mairie'){color = '#f1faf9'; name  = 'Mairie';}
    else if (slide == 'eglise'){color = '#faeeeb'; name  = 'Eglise';}
    else if (slide == 'salle'){color = '#faf7f1'; name  = 'Réception';}

    label.innerHTML=name;
    label.style.backgroundColor=color;
    
    textBut.style.backgroundColor=color;
    mapBut.style.backgroundColor='white';
    for (i=0; i<showBut.length; i++){
        showBut[i].addEventListener('click', (e)=> {
            showBut.forEach(element => element.style.backgroundColor='white')
            e.target.style.backgroundColor=color;
        })
    }
    icons.forEach(icon => icon.style.color=color)

}


// Ajax POST request to send confirmation form
function confirmation(){

    const data={};
    data.email=document.querySelector('#email').value;
    data.last_name=document.querySelector('#nom').value;
    data.first_name=document.querySelector('#prénom').value;
    data.adults=document.querySelector('#adultes').value;
    data.children=document.querySelector('#enfants').value;
    data.message=document.querySelector('#message').value;

    
    validation = ValidateEmail(data.email);

    if (validation == false){
        alert("Adresse e-mail invalide!");
    }
    else if (data.last_name==''){
        alert("Oups! Tu as oublié ton nom!")
    }
    else if (data.first_name==''){
        alert("Oups! Tu as oublié ton prénom!")
    }
    else {
        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/')
        xhttp.setRequestHeader("X-CSRFToken",  getCookie('csrftoken')); 
        xhttp.onload = () => {
            const registration = document.querySelector(".registration");
            const confirmation = document.querySelector(".confirmation")
            confirmation.querySelector('h1').innerHTML=`Merci ${data.first_name} pour ta confirmation!`;
            registration.style.animation='scale-down .8s forwards'
            registration.addEventListener('animationend', ()=> {
                registration.style.display='none'
                confirmation.style.display='flex'
                confirmation.style.animation='scale-up .8s forwards'
            })    
        }

        j_data=JSON.stringify(data)

        xhttp.send(j_data);
            return false; 
    }	
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function ValidateEmail(inputText){
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    validation = mailformat.test(inputText)
    return validation
}

function initMap(position,container) {
    // The location of Uluru
    var mairie = {lat: -20.879416, lng: 55.447837};
    var eglise  = {lat: -19.879416, lng: 53.447837};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        container, {
            mapId: '17a2994719f5f1cc',
            zoom: 15,
            center: position,
            disableDefaultUI: true,
            zoomControl: true,
            scaleControl: true,
            rotateControl: true,
            fullscreenControl: true
        });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: position, map: map});
  }
  