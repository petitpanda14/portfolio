//////////////////////////////////////////////////
// Auteur : James Benone                        //
// Description : Gère le formulaire de contact  //
// Date de modification : 10/12/2025            //
//////////////////////////////////////////////////

async function contactBtnClick()
{
    const email = document.querySelector("#input-contact-email").value;
    const nom = document.querySelector("#input-contact-name").value;
    const message = document.querySelector("#input-contact-message").value;

    const body = JSON.stringify({
        "email": email,
        "nom": nom,
        "message": message
    });

    console.log(body);

    const response = await fetch('./mail.php', {
        "body": body,
        "method": "POST",
        "headers": {
            "Content-type": 'application/json'
        }
    });

    const result = await response.json();

    console.log(result);

    if (result.status === "ok")
    {
        alert(result.message);
    }
    else
    {
        alert(result.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#btn-contact-form").addEventListener("click", contactBtnClick);
});