var carousel = new bootstrap.Carousel(document.querySelector('#carouselExampleIndicators'));
var indicators = document.querySelectorAll('.indicator');

carousel._element.addEventListener('slide.bs.carousel', function (e) {
    var targetIndex = e.to;
    
    indicators.forEach(function (indicator) {
        indicator.classList.remove('active');
    });
    
    indicators[targetIndex].classList.add('active');
});

    // Function to scroll to the target section smoothly
    function scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 50, // Adjust the offset as needed
                behavior: 'smooth'
            });
        }
    }

    // Add click event listener to the "Certificate" link
    const certificateLink = document.querySelector('a[href="#registration-form-section"]');
    if (certificateLink) {
        certificateLink.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default link behavior
            scrollToSection('#registration-form-section'); // Scroll to the target section
        });
    }
function myFunction() {
          var dots = document.getElementById("dots");
          var moreText = document.getElementById("more");
          var btnText = document.getElementById("myBtn");
          
        
          if (dots.style.display === "none") {
            dots.style.display = "inline";
            btnText.innerHTML = "Read more"; 
            moreText.style.display = "block";
          } else {
            dots.style.display = "none";
            btnText.innerHTML = "Read less"; 
            moreText.style.display = "inline";
          }
        }
function myFunction1() {
          var dots = document.getElementById("dot");
          var moreText = document.getElementById("mor");
          var btnText = document.getElementById("myBt");
          
        
          if (dots.style.display === "none") {
            dots.style.display = "inline";
            btnText.innerHTML = "Read more"; 
            moreText.style.display = "none";
          } else {
            dots.style.display = "none";
            btnText.innerHTML = "Read less"; 
            moreText.style.display = "inline";
          }
        }
// read more vala kam 
function showPopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.style.display = "block";
  document.body.classList.add("disable-scroll");
}

function closePopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.style.display = "none";
  document.body.classList.remove("disable-scroll");
}