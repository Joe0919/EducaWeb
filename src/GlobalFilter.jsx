import TextField from "@mui/material/TextField";
import { styled } from "styled-components";

export default ({ filter, setFilter }) => {
  return (
    <Buscador>
      <CssTextField
        label="Buscar: (Por reparar)"
        id="custom-css-outlined-input"
        InputLabelProps={{
          style: {
            color: "white",
          },
        }}
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        fullWidth
        fontColor="white"
      />
    </Buscador>
  );
};

const Buscador = styled.div`
  margin: 0;
  margin-top: 1rem;
  width: 100%;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const options = {
  shouldForwardProp: (prop) => prop !== "fontColor",
};

const CssTextField = styled(TextField, options)(
  {
    "& label.Mui-focused": {
      color: "#6BD1FF",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
      // + COLOR DE BORDE POR DEFECTO
      "& fieldset": {
        borderColor: "#fff",
      },
      // + COLOR DE BORDE AL PONER EL CURSOR
      "&:hover fieldset": {
        borderColor: "#B2BAC2",
      },
      // + COLOR DE BORDE AL ESTAR ESCRIBIENDO
      "&.Mui-focused fieldset": {
        borderColor: "#6F7E8C",
      },
      "&.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
        color: "red",
      },
    },
  },
  ({ fontColor }) => ({
    input: {
      color: fontColor,
    },
  })
);
