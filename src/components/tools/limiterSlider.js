import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './limiterSlider.css';
function valuetext(value) {
  return `${value}`;
}

const minDistance = 10;

export default function MinimumDistanceSlider() {
  const [value2, setValue2] = React.useState([0, 100]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '100',
    },
  ];
  return (
    <Box style={{margin:'0px auto 0px auto', backgroundColor:'#fff'}} sx={{ width: 180 }}>

      <Slider
        
  getAriaLabel={() => 'Temperature range'}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        
        marks={marks}
      />
    </Box>
  );
}