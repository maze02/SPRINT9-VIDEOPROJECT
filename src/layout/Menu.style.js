import styled from 'styled-components';

export const MenuStyled = styled.header`
  background-color: var(--background-primary-1);
  color: var(--font-white-1);
  h2 {
    font-size: 1rem;
  }
  li {
    margin-bottom: 1rem;
  }
  .navLink {
    color: var(--font-white-1);
    transition: all 0.1s ease-out;

    &:hover {
      color: seagreen;
      font-size: 1.05rem;
    }
  }
  .active {
    color: seagreen;
  }
  .sub-menu-separator {
    width: auto;
    margin-right: 5rem;
    height: 0.05rem;
    background-color: var(--font-white-1);
  }
`;
