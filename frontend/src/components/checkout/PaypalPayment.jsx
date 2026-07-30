import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const PaypalPayment = () => {
  return (

    // Centers the message on the page
    <div className='h-96 flex justify-center items-center'>

        {/* Material UI Alert component */}
        {/* Shown because PayPal integration hasn't been implemented yet */}
        <Alert
            severity="warning"      // Yellow warning style
            variant="filled"        // Filled background
            style={{ maxWidth: "400px" }} // Prevents alert from becoming too wide
        >

            {/* Alert heading */}
            <AlertTitle>
                Paypal Unavailable
            </AlertTitle>

            {/* Message shown to the user */}
            Paypal payment is unavailable. Please use another payment method.

        </Alert>

    </div>
  )
}

export default PaypalPayment;