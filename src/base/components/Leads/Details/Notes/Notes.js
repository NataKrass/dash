import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  TextLightExtraSmall,
  TextBlackExtraSmall,
  TextAccentThin,
  TextArea,
  OutlinedButton,
  TextField,
} from 'base/styled';
import { ReactComponent as Note } from 'assets/images/note.svg';
import { fetchLeadNotes } from 'store/slices/leads';
import network from 'base/network';

const Wrap = styled.div`
  padding: 10px 0;
  background: ${(props) => props.theme.colors.bgMain};
`;

const Contact = styled.div`
  display: flex;
  background: white;
  border: ${(props) => props.theme.borders.textInput};
  border-radius: 8px;
  padding: 5px 15px 10px;
`;

const ContactLeft = styled.div`
  width: 65%;
  padding-right: 15px;
`;

const AddNote = styled.div`
  display: flex;
  justify-content: end;
  padding: 14px;
  cursor: pointer;
  p {
    margin: 9px;
  }
`;

const Form = styled.form`
  padding: 15px;
  input {
    margin-bottom: 15px;
  }
  textarea {
    height: 80px;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: end;
  padding-top: 10px;
  a {
    margin-right: 20px;
    cursor: pointer;
  }
  button{
    padding: 0 15px;
    height: 30px;
  } 
`;

function renderNotes(item) {
  return (
    <Contact key={item.id}>
      <ContactLeft>
        <TextBlackExtraSmall>{item.title}</TextBlackExtraSmall>
        <TextLightExtraSmall>{item.body}</TextLightExtraSmall>
      </ContactLeft>
      <div>
        <TextLightExtraSmall>{item.created_at}</TextLightExtraSmall>
        <TextBlackExtraSmall>By {item.user?.full_name}</TextBlackExtraSmall>
      </div>
    </Contact>
  );
}

export default function Notes(notesInfo){
  const [form, setForm] = useState();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  function handleForm() {
    setForm(true);
  }
  function handleFormOff() {
    setForm(false);
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleText(e) {
    setText(e.target.value);
  }

  function handleSubmit() {
    const Id = notesInfo.notesInfo.id;
    network.post(`/api/lead/${Id}/notes`, {title:title, body:text});
    dispatch(fetchLeadNotes(Id)); 
    setForm(false); 
  }
 
  return (
    <Wrap>
      {notesInfo && notesInfo?.notesInfo?.notes?.map(renderNotes)}
      {!form && (
        <AddNote onClick={handleForm}>
          <Note />
          <TextAccentThin>Add Note</TextAccentThin>
        </AddNote>
      )}
      {form && (
        <Form>
          <TextField placeholder="Title" value={title} onChange={handleTitle} />
          <TextArea style = {{padding:10}} placeholder="Note" value={text} onChange={handleText} />
          <Buttons>
            <a onClick={handleFormOff}>
              <TextAccentThin>Cancel</TextAccentThin>
            </a>
            <OutlinedButton onClick={() => handleSubmit()}>
              Save
            </OutlinedButton>
          </Buttons>
        </Form>
      )}
    </Wrap>
  );
}