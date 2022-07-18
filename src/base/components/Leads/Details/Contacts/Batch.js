import { useState } from 'react';
import { ReactComponent as BatchIcon } from 'assets/images/batch_active.svg';
import { ManageBox, Check, BlockMargin, AccentButton, OutlinedButton } from 'base/styled';
import styled from 'styled-components';
import { useForm } from "react-hook-form";

const BatchWrapper = styled.div`
  position: relative;
  padding-top: 8px;
  a {
    margin-left: 10px;
    cursor: pointer;
  }
`;

const ManageBoxTop = styled(ManageBox)`
  right: -13px;
  top: 35px;
  padding: 10px;
  width: 170px;
  a {
    padding: 8px 39px;
    margin: 0;
    &:hover {
      border-radius: 0;
    }
    span {
      font-size: 12px;
      font-weight: 400;
    }
  }
  button {
    height: 28px;
    padding: 5px 8px;
    margin: 3px;
  }
`;

const BlockMarginRelative = styled(BlockMargin)`
  position: relative;
  max-width: fit-content;
  margin: 5px 5px 5px 10px;
  label {
    font-size: .7rem
  }
  @media (max-width: 768px) {
    margin: 8px 0
  }
`;

export default function Batch() {
  const [batch, setBatch] = useState();
  const [text, setText] = useState('');
  const {
    register,
    getValues,
    handleSubmit
  } = useForm();
  const atLeastOne = () =>
    getValues("contact").length ? setText('') : setText("errorFormText");
  const [setList] = useState();

  const options = [
    {name:'has name'},
    {name:'has position'},
    {name:'has phone number'},
    {name:'has Linkedin'},
    {name: 'has Twitter'}
  ];
   
  const onSubmit = data => {
    if (getValues("contact").length) {
      console.log('contact filters:', data);
      setList(data.contact);
      setBatch(false);
    }
    else {
      setBatch(false);
      console.log(batch);
      return;
    }
  };

  function handleBatch() {
    setBatch(true);
  }
  function handleBatchOff() {  
    setText('n');
    setBatch(false);
    console.log(text, batch);
  }

  return (
    <BatchWrapper>
      <a onClick={handleBatch}>
        <BatchIcon />
      </a>
      {batch && (
        <ManageBoxTop>
          {options.map((value) => (
            <>
              <BlockMarginRelative key={value.name}>
                <Check
                  type="checkbox"
                  value={value.name}
                  {...register('contact', {
                    validate: atLeastOne,
                  })}
                />
                <span></span>
                <label>{value.name}</label>
              </BlockMarginRelative>
            </>
          ))}
          <AccentButton onClick={handleSubmit(onSubmit)}>show</AccentButton>
          <OutlinedButton onClick={handleBatchOff}>
            cancel
          </OutlinedButton>
        </ManageBoxTop>
      )}
    </BatchWrapper>
  );
}
