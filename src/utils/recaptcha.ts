import { toast } from "react-toastify";

export const handleRecaptchaResponse = async (recaptchaValue: string | null) => {
    try {
      const response = await fetch('/api/verify_recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recaptchaValue })
      });
  
      const data = await response.json();
  
      if (data.success) {
        return true;
        // reCAPTCHA verification passed
        // Continue with your logic here
      } else {
        // reCAPTCHA verification failed
        // Handle failure case here
        return false
      }
    } catch (error) {
      toast.error('Failed to verify reCAPTCHA' + error);
    }
  };