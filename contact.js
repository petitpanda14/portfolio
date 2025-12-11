//////////////////////////////////////////////////
// Auteur : James Benone                        //
// Description : Gère le formulaire de contact  //
// Date de modification : 10/12/2025            //
//////////////////////////////////////////////////

async function contactBtnClick()
{
    try
    {
        const email = document.querySelector("#input-contact-email").value;
        const nom = document.querySelector("#input-contact-name").value;
        const message = document.querySelector("#input-contact-message").value;

        if (!email)
            throw new Error("L'email est manquant.");

        if (!nom)
            throw new Error("Le nom est manquant.");

        if (!message)
            throw new Error("Le message est manquant.");

        const body = JSON.stringify({
            "email": email,
            "nom": nom,
            "message": message
        });

        const response = await fetch('./mail.php', {
            "body": body,
            "method": "POST",
            "headers": {
                "Content-type": 'application/json'
            }
        });

        const result = await response.json(); 

        if (result.status !== "ok")
            throw new Error(result.message);

        showMessage(result.message, {type: "success"});
    }
    catch(e)
    {
        showMessage(e.message, {duration: 10000, type: "error"});
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#btn-contact-form").addEventListener("click", contactBtnClick);
});