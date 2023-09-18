export const iconButton = {
  background: "white",
  transition: ".4s",
  boxShadow: "0 0 5px var(--shadow)",
  color: "var(--theme)",
  "&:hover": {
    boxShadow: "0 0 10px 1px var(--shadow)",
    background: "white",
    color: "var(--active)",
  },
};

export const loadingBtn = {
  textTransform: "none",
  fontWeight: "bolder",
  fontFamily: "Averta",
  fontSize: "17px",
  padding: "10px 20px",
  borderRadius: "7px",
  background: "var(--active)",
  width: "240px",
  color: "white",
  marginTop: "20px",
  "&:hover": {
    background: "var(--theme)",
  },
};
