import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
interface ButtonProps {
    color?: string;
    to?: string;
}

const ButtonMaker = (style: any) => (button: any) => button`${style}`;
const CommonButtonStyle = css`
    border: 1px solid;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: ${(props: ButtonProps) =>
        props.color ? props.color : palette.gray[8]};
    height: 40px;
    /* background: blue; */
    margin: 10px;
    text-decoration: none;
`;
const DefaultButton = ButtonMaker(CommonButtonStyle);

const StyledButton = DefaultButton(styled.button);
const StyledLink = DefaultButton(styled(Link));

const Button: React.FC<ButtonProps> = ({ ...props }) => {
    return props.to ? <StyledLink {...props} /> : <StyledButton {...props} />;
};

export default Button;
