export const _onChangeInputValue = (
  e: React.ChangeEvent<HTMLInputElement>,
  setInputValueArray: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const value = e.target.value;
  const cursorPosition = e.target.selectionStart;
  const trimArray = value.split(',').map((item) => item.trim());

  //',' 추가 시
  if (
    value.length === cursorPosition &&
    trimArray[trimArray.length - 1] === ''
  ) {
    if (trimArray[trimArray.length - 2] === '') {
      trimArray.pop();
    }

    if (trimArray.findIndex((item) => isNaN(Number(item))) === -1) {
      setInputValueArray(trimArray);
    }
    return;
  }

  //배열중간에 공백 제거
  const setArray = trimArray.filter((item) => item !== '');

  //숫자만 입력가능
  if (trimArray.findIndex((item) => isNaN(Number(item))) === -1) {
    setInputValueArray(setArray);
  }
};

export const _onKeyPressInputValue = (
  e: React.KeyboardEvent<HTMLInputElement>,
  inputValueArray: string[],
  setInputValueArray: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (e.key === 'Backspace') {
    //마지막이 공백일경우 공백제거
    if (inputValueArray[inputValueArray.length - 1] === '') {
      const copyArray = [...inputValueArray];
      copyArray.pop();
      setInputValueArray(copyArray);

      e.preventDefault();
    }
  }
};
