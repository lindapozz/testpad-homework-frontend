import React from 'react';
import InputForm from './InputForm';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, waitFor } from '@testing-library/react';

describe('InputForm', () => {
  it('should change the state when the input value is changed', () => {
    let component;
    act(() => {
      component = render(<InputForm />);
    });
    const input = component!.queryByLabelText('Insert the URL:');
    act(() => {
      fireEvent.change(input, { target: { value: 'http://lindapozzato.com' } });
    });
    expect(input.value).toBe('http://lindapozzato.com');
  });
  it('should set the error state if the url is invalid', () => {
    let component;
    act(() => {
      component = render(<InputForm />);
    });
    const input = component!.queryByLabelText('Insert the URL:');
    act(() => {
      fireEvent.change(input, { target: { value: 'invalid-url' } });
    });
    const submitButton = component!.getByText('Submit');
    act(() => {
      fireEvent.click(submitButton);
    });
    expect(component!.getByText('Please enter a valid URL')).toBeDefined();
  });
});
