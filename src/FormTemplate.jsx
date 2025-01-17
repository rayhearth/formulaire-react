import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const FormTemplate = () => {
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();
		const formMess = document.querySelector(".form-message");

		emailjs
			.sendForm("service_peqyvrd", "template_7s41sin", form.current, {
				publicKey: import.meta.env.VITE_APP_ID,
			})
			.then(
				(result) => {
					// console.log("SUCCESS!");
					form.current.reset();
					formMess.innerHTML = `<p class='success'> Message envoyé !</p>`;
					setTimeout(() => {
						formMess.innerHTML = "";
					}, 2500);
				},
				(error) => {
					// console.log("FAILED...", error.text);
					formMess.innerHTML =
						"<p class= 'error'> Une erreur s'est produite, veuillez réessayer</p>";
					setTimeout(() => {
						formMess.innerHTML = "";
					}, 2500);
				}
			);
	};

	return (
		<div className="form-container">
			<form ref={form} onSubmit={sendEmail}>
				<label>Name</label>
				<input type="text" name="name" required autoComplete="off" />
				<label>Email</label>
				<input type="email" name="email" required autoComplete="off" />
				<label>Message</label>
				<textarea name="message" required />
				<input type="submit" value="Envoyer" />
			</form>
			<div className="form-message"></div>
		</div>
	);
};

export default FormTemplate;
