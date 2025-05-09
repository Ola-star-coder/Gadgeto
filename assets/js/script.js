'use strict'

// Add events on elements
const addEventonElem = function(elem, type, callback){
    if(elem.length > 1){
        for(let i = 0; i < elem.length; i++){
            elem[i].addEventListener(type, callback);
        }
    } else{
        elem.addEventListener(type, callback)
    }
}

// Variables
//nav toggler variables
const navbar = document.querySelector('[data-navbar]');
const navbarLinks = document.querySelectorAll('[data-nav-link]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const overlay = document.querySelector('[data-overlay]');
//Dark mode toggler variable
const darkModeToggler = document.querySelector('[data-dark-mode-toggler]');

// Header active variable when we scroll down window.
const header = document.querySelector('[data-header]');
// Back Top Btn active variable when we scroll down window.
const backTopBtn = document.querySelector('[data-back-top-btn]');

//Product filter variables
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterBox = document.querySelector('[data-filter]');

// Functionality
// toggler navbar
const toggleNavbar = function(){
  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('active');
}

const toggleDarkMode = function(){
    darkModeToggler.classList.toggle('active');
    document.body.classList.toggle('dark-theme');
    if(document.body.classList.contains('dark-theme')){
        localStorage.setItem('dark-theme', 'true');
    } else{
        localStorage.removeItem('dark-theme');
    }
}

// this is the image slider functionality
const mainImage = document.getElementById("main-image");
const thumbnails = document.querySelectorAll(".thumb");

thumbnails.forEach(thumb => {
  thumb.addEventListener("click", () => {
    mainImage.style.opacity = 0;
    setTimeout(() => {
      mainImage.src = thumb.src;
      mainImage.style.opacity = 1;
    }, 400);
  });
});

// it is the lightbox functionality
 function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  lightboxImg.src = src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}



// toggler navbar close
const closeNavbar = function(){
    navbar.classList.remove('active');
    overlay.classList.remove('active');
 document.body.classList.remove('active');
}

//Header active & Back to top  when we scroll down window.
const showElemOnScroll = function(){
    if(window.scrollY > 100){
    header.classList.add('active');
    backTopBtn.classList.add('active');
    } else{
        header.classList.remove('active');
        backTopBtn.classList.remove('active');
    }
   }

// product filter
let lastClickedFilterBtn = filterBtns[0];
const filter = function (){
lastClickedFilterBtn.classList.remove('active');
this.classList.add('active');
lastClickedFilterBtn = this;
filterBox.setAttribute('data-filter', this.dataset.filterBtn)
}

// Dom for checkout form
// Checkout form validation
// document.addEventListener("DOMContentLoaded", function () {
//   const checkoutForm = document.getElementById("checkoutForm");

//   if (!checkoutForm) return; // If this form doesn't exist, do nothing

//   checkoutForm.addEventListener("submit", function (e) {
//     e.preventDefault(); // Stop default form behavior/ refreshing the page

//     // Get form values
//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const address = document.getElementById("address").value.trim();
//     const phone = document.getElementById("phone").value.trim();

//     // Validate form values
//     // Simple validation checks (you can expand these as needed)
//     const errorMsg = document.getElementById("errorMsg");
//     const successMsg = document.getElementById("successMsg");

//     errorMsg.textContent = "";
//     successMsg.textContent = "";


//     if (!name || !email || !address) {
//       errorMsg.textContent = "❌ Please fill out all fields correctly.";
//       return;
//     }
    
//     if (
//       phone.length !== 11 || !/^\d+$/.test(phone) ||
//       !/^\d{2}\/\d{2}$/.test(expiry) ||
//       cvv.length < 3 || cvv.length > 4 || !/^\d+$/.test(cvv)
//     ) {
//       errorMsg.textContent = "❌ Invalid card details. Please check and try again.";
//       return;
//     }
    
//     // If all validations pass, show success message
//     successMsg.textContent = "✅ Payment successful! Thank you for your order.";
//     checkoutForm.reset();
//   });
// });


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("checkoutForm");
  const inputs = form.querySelectorAll("input");
  const submitBtn = form.querySelector("button[type='submit']");

  const validators = {
    name: value => value.trim().length >= 2,
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    address: value => value.trim().length >= 5,
    phone: value => /^[\d\s+()-]{7,}$/.test(value)
  };

  const validateInput = (input) => {
    const id = input.id;
    const value = input.value;
    const isValid = validators[id] ? validators[id](value) : true;
    const errorEl = input.nextElementSibling;

    if (isValid) {
      input.classList.add("valid");
      input.classList.remove("invalid");
      errorEl.textContent = "";
    } else {
      input.classList.remove("valid");
      input.classList.add("invalid");
      errorEl.textContent = `Please enter a valid ${id}.`;
    }

    checkFormValidity();
  };

  const checkFormValidity = () => {
    let isFormValid = true;
    inputs.forEach(input => {
      const id = input.id;
      if (validators[id] && !validators[id](input.value)) {
        isFormValid = false;
      }
    });
    submitBtn.disabled = !isFormValid;
  };

  // Real-time validation
  inputs.forEach(input => {
    input.addEventListener("input", () => validateInput(input));
  });

  // Submit event
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("✅ Order confirmed. Thank you!");
    form.reset();
    inputs.forEach(input => input.classList.remove("valid"));
    submitBtn.disabled = true;
  });
});




// event on element
addEventonElem(navTogglers, 'click', toggleNavbar);
addEventonElem(darkModeToggler, 'click', toggleDarkMode);
addEventonElem(navbarLinks, 'click', closeNavbar);
addEventonElem(window, 'scroll', showElemOnScroll);
addEventonElem(filterBtns, 'click', filter);