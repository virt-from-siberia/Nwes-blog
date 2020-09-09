import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CreateNewsModal from "./CreateNewsModal";

export default function SerchBar({ setSearchValue }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onHandleChange = (evt) => {
    setSearchValue(evt.target.value);
  };

  return (
    <div className='news__searchBar'>
      <CreateNewsModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
      <div className='search-blok'>
        <SearchIcon />
        <TextField
          id='standard-basic'
          label='поиск'
          onChange={onHandleChange}
        />
      </div>
    </div>
  );
}
