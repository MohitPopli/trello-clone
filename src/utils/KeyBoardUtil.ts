export const keyboardHandlerForEditableContent = (
    event: React.KeyboardEvent<HTMLInputElement>,
    callbackFn: (value: string) => void,
  ) => {
    if (event.key === 'Enter' || event.key === 'Tab') callbackFn(event.currentTarget.value);
  };
  