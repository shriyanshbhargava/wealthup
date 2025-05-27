import React from 'react'
import Searchbar from './SearchBar'
import { Box } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import {BsCheckLg} from 'react-icons/bs'

const style = { 
  color: "#0DC3B0",
  '&.Mui-checked': { color: "#0DC3B0", },
  '& .MuiSvgIcon-root': { fontSize: 28 }
  }

const Filter = ({checkSate, setCheckState, setSearchTerm}) => {


  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCheckState(prevState => ({
      ...prevState, [name] : checked
    }));
  }

  return (
    <>
        <Box maxWidth={"720px"} margin={"auto"} padding="1rem 1.5rem 0 1.5rem">
            <Searchbar onSubmit={setSearchTerm} />
            <div className='w-full flex pt-8 pb-4'>
              <div className='basis-1/3 flex items-center justify-center'>
                <Checkbox 
                  id='static'
                  name='static'
                  checked={checkSate.static}
                  sx={style}
                  onChange={handleChange}
                />
                <label htmlFor='static' className='mb-0 text-base sm:text-xl'>Static</label>
              </div>
              <div className='basis-1/3 flex items-center justify-center'>
                <Checkbox 
                  // checkedIcon={<BsCheckLg color='white'  />}
                  id='carousels'
                  name='carousels'
                  checked={checkSate.carousels}
                  sx={style}
                  onChange={handleChange}
                />
                <label htmlFor='carousels' className='mb-0 text-base sm:text-xl'>Carousels</label>
              </div>
              <div className='basis-1/3 flex items-center justify-center'>
                <Checkbox 
                  id='video'
                  name='video'
                  checked={checkSate.video}
                  sx={style}
                  onChange={handleChange}
                />
                <label htmlFor='video' className='mb-0 text-base sm:text-xl'>Video</label>
              </div>
            </div>
        </Box>
    </>
  )
}

export default Filter