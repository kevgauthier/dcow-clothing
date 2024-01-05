import { useState, FormEvent } from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from '@stripe/stripe-js'
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useSelector } from 'react-redux';
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

//get user info
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {
    
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setProcessingPayment] = useState(false);

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) =>  {
        e.preventDefault();

        //if no element or stripe return and stop
        if(!stripe || !elements){
            return;
        }

        setProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 }),
        }).then( res => res.json());

        const { paymentIntent : { client_secret }} = response;
        
        const cardDetails = elements.getElement(CardElement);
        
        if(!ifValidCardElement(cardDetails)) return;

        const paymentResults = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                }
            }
        });

        setProcessingPayment(false);

        if(paymentResults.error){
            alert(paymentResults.error);
        }else if(paymentResults.paymentIntent.status === 'succeeded'){
            alert('Payment Successful');
        }
    }

    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}/>
                <PaymentButton 
                    isLoading={isProcessingPayment} 
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                > Pay Now </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
}

export default PaymentForm;
