import styled from "styled-components";
import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
    height: 300px;
    display: inline-block;
    border: solid 1px #000;
    padding: 18px;
    background-color: #f2f2f2;
    margin: 0 auto;
    width: 55%;
    left: 0;
    right: 0;
    position: absolute;
`

export const FormContainer = styled.form`
    height: 100px;
    min-height: 500px;
    width: 100%;
`

export const PaymentButton = styled(Button)`
    margin-left: auto;
    margin-top: 30px;
`