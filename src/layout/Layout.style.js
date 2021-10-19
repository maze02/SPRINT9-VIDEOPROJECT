import styled from 'styled-components';

export const LayoutStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 17% 83%;
  }
`;
