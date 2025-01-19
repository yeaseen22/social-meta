'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { useColorScheme } from '@mui/material/styles';
import { MUICustomisedSwitch } from '.';

export default function ModeSwitch() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <FormControl>
        {/* ==== CUSTOMISED FOR THE SWITCH ON THE DARK AND LIGHT MODE HERE ==== */}
        <MUICustomisedSwitch
          value={mode === 'dark'}
          onChange={(event) => setMode(event.target.checked ? 'dark' : 'light')}
        />
      </FormControl>
    </Box>
  );
}
