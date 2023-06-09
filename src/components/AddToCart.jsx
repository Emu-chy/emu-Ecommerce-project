import React, { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import CartAmountToggle from "./CartAmountToggle";
import { Button } from "../styles/Button.js";
import { useCartContext } from "../Context/Cart-context";

const AddToCart = ({ product }) => {
    const { addToCart } = useCartContext();
    const { id, colors, stock } = product;
    const [color, setColor] = useState(colors[0]);
    const [amount, setAmount] = useState(1);

    const setIncrement = () => {
        amount < stock ? setAmount(amount + 1) : setAmount(stock);
    };
    const setDecrement = () => {
        amount > 1 ? setAmount(amount - 1) : setAmount(1);
    };
    return (
        <Wrapper>
            <div className="colors">
                <p>
                    Colors:
                    {colors.map((currentColor) => {
                        return (
                            <button
                                key={currentColor.id}
                                className={color === currentColor ? "btnStyle active" : "btnStyle"}
                                style={{ backgroundColor: currentColor }}
                                onClick={() => setColor(currentColor)}
                            >
                                {color === currentColor ? <FaCheck className="checkStyle" /> : null}
                            </button>
                        );
                    })}
                </p>
                <CartAmountToggle
                    amount={amount}
                    setIncrement={setIncrement}
                    setDecrement={setDecrement}
                />
            </div>
            <NavLink to="/cart" onClick={() => addToCart(id, color, amount, product)}>
                <Button> Add To Card</Button>
            </NavLink>
        </Wrapper>
    );
};
const Wrapper = styled.section`
    .colors p {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .btnStyle {
        width: 2rem;
        height: 2rem;
        background-color: #000;
        border-radius: 50%;
        margin-left: 1rem;
        border: none;
        outline: none;
        opacity: 0.5;
        cursor: pointer;
        &:hover {
            opacity: 1;
        }
    }
    .active {
        opacity: 1;
    }
    .checkStyle {
        font-size: 1rem;
        color: #fff;
    }
    /* we can use it as a global one too  */
    .amount-toggle {
        margin-top: 3rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 1.4rem;
        button {
            border: none;
            background-color: #fff;
            cursor: pointer;
        }
        .amount-style {
            font-size: 2.4rem;
            color: ${({ theme }) => theme.colors.btn};
        }
    }
`;
export default AddToCart;
