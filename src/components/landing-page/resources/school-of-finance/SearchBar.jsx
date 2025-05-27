'use client'
import {
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import { useState } from "react";

import { AiOutlineSearch } from 'react-icons/ai';


const Searchbar = ({onSubmit}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const inputProps = { "aria-label": "search",className:"search", style:{"&::placeholder": {opacity:1, color:'red'} } }

  return (
    <Paper
      component="form"
      elevation={3}
      sx={{ display: "flex", alignItems: "center", px: 1, py: 0.5, borderRadius:0, backgroundColor:"#E7F9F2",}}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit((searchTerm) ?? "");
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color:"#045783", letterSpacing:1, fontWeight:500} }
        placeholder="Search for words"
        inputProps={inputProps}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSubmit(e.target.value);
        }}
      />
      <IconButton type="submit">
        <AiOutlineSearch color="#045783" />
      </IconButton>
    </Paper>
  );
};
export default Searchbar;
