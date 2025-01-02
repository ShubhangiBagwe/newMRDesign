
document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        // console.log("base URL", process.env.BASE_API_URL)
        const response = await fetch(`https://mrdesign.onrender.com/send-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, message }),
        });
        console.log('response', response)
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Email Sent!",
                text: "Your email has been sent successfully.",
                confirmButtonText: "OK",
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Failed to Send",
                text: "There was a problem sending your email. Please try again later.",
                confirmButtonText: "OK",
            });
        }
    } catch (error) {
        console.log('error', error)
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "An unexpected error occurred. Please try again.",
            confirmButtonText: "OK",
        });
    }
});
