import { Input } from '@mui/base/Input';
import { styled } from '@mui/system';
import * as React from 'react';

import { defaultTheme } from '@/components/select/DestinationChainSelector';

const CustomInput = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <Input slots={{ input: StyledInputElement }} {...props} ref={ref} />;
});

export default function TokenInput({
  onChange,
}: {
  onChange: (value: number) => void;
}) {
  return (
    <CustomInput
      aria-label='Demo input'
      placeholder='Enter amount'
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${defaultTheme === 'dark' ? grey[300] : grey[900]};
  background: ${defaultTheme === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${defaultTheme === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 24px ${defaultTheme === 'dark' ? blue[900] : blue[100]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${defaultTheme === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
