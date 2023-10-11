export const useArray = () => {
  //return string of subject SWP391, SWT301 not SWP391, SWT301,
  const ArrayToString = (ArrOfString) => {
    let itemString = "";
    ArrOfString.map((item) => {
      ArrOfString[ArrOfString.length - 1] === item
        ? (itemString += item)
        : (itemString += `${item}, `);
    });

    return itemString;
  };

  return ArrayToString;
};
