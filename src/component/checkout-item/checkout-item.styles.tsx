import styled from "styled-components";


export const CheckoutItemContainer = styled.div`
width: 100%;
    display: flex;
    min-height: 100px;
    border-bottom: 1px solid darkgrey;
    padding: 15px 0;
    font-size: 20px;
    align-items: center;
`
export const ItemImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;
`

export const ItemImg = styled.img`
  width: 100%;
  height: 100%;
`

export const ItemQtyContainer = styled.span`
  display: flex;
  width: 23%;
`
export const ItemName = styled.span`
  width: 23%;
`
export const ItemPrice = styled.span`
  width: 23%;
`
export const ItemQty = styled.span`
  margin: 0 10px;
`
export const ItemArrow = styled.div`
  cursor: pointer;
`
export const ItemRemove = styled.div`
  padding-left: 12px;
  cursor: pointer;
`

