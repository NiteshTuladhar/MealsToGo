
import styled from "styled-components/native";


const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
}

const positionVariant = {
  top : 'marginTop',
  left : 'marginLeft',
  bottom : 'marginBottom',
  right : 'marginRight',
}

const getVariant = (sposition, size, theme) => {

    const sizeIndex = sizeVariant[size];
    const property = positionVariant[sposition];
    const value = theme.space[sizeIndex];

    return `${property}:${value}`;
}

export const Spacer = styled.View`
  ${({ sposition, size, theme }) => getVariant(sposition, size, theme )}
`