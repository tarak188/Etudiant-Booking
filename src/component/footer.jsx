import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div>
     
<footer class="footer-distributed">

			<div class="footer-left">

				<h3>Etudiant-<span>Booking</span></h3>

				<p class="footer-links">
					<a href="#" class="link-1">Home</a>
					
					<a href="#">Blog</a>
				
					<a href="#">Pricing</a>
				
					<a href="#">About</a>
					
					<a href="#">Faq</a>
					
					<a href="#">Appartements</a>
				</p>

				<p class="footer-company-name">etudiant-Booking © 2024</p>
			</div>

			<div class="footer-center">

				<div>
					<i class="fa fa-map-marker"></i>
					<p><span>2073,Tunis</span> Ariana,Borj Louzir</p>
				</div>

				<div>
					<i class="fa fa-phone"></i>
					<p>+214 26 431 912</p>
				</div>

				<div>
					<i class="fa fa-envelope"></i>
					<p><a href="mailto:support@company.com">Belhibatarak2@gmail.com</a></p>
				</div>

			</div>

			<div class="footer-right">

				<p class="footer-company-about">
					<span>About the company</span>
					This is a company that offer university students the ability to pick the best rented houses/appartaments near their university
				</p>
	

			</div>

		</footer>
    </div>
  );
}

export default Footer;
