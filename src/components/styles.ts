import styled from "@emotion/styled";
import background from "../assets/rickandmorty.jpg";
import type { Theme } from "@mui/material/styles";

export const Container = styled("div")<{ theme?: Theme }>`
  background-color: ${({ theme }) =>
    theme?.palette.mode === "dark" ? "#2c2c2c" : "#f8edf6"};
  padding: 20px;
  border-radius: 12px;
  text-align: center;
`;

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &::before {
    content: "";
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    position: absolute;
    inset: 0;
    opacity: 0.3;
    z-index: -1;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

export const Image = styled.img`
  width: 200px;
  border-radius: 12px;
`;

export const ImgIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
