const sendEmail = async (options) =>{
    try{
        const BREVO_API_KEY = process.env.BREVO_API_KEY;
        if(!BREVO_API_KEY){
            console.error("Brevo API key is not defined")
            throw new Error("Brevo API key is not defined")
        }

        const data = {
            "sender":{
                "name":"Real Estate",
                "email":process.env.EMAIL_USER
            },
            "to": [
                {
                    "email":options.email
                }
            ],
            "subject": options.subject,
            "htmlContent": options.htmlContent
        };

        const response = await fetch("https://api.brevo.com/v3/smtp/emails",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "api-key":BREVO_API_KEY
            },
            body:JSON.stringify(data)
        });

        const result = await response.json();
        if(response.ok){
            console.log("Email sent successfully:", result.messageId)
            return result;
        }else{
            console.error("Failed to send email:", result)
            throw new Error("Failed to send email")
        }
        
    }
    catch(error){
        console.error("Error in sending email:", error);
        throw new Error(error.message);
    }
    
    
}

export default sendEmail;