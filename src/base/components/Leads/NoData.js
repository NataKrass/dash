import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from '@bootstrap-styled/v4';
import styled from 'styled-components';
import {
  AccentButton,
  Modal,
  OutlinedButton,
  Overflow,
  TextAccentThin,
  TextBlack,
  TextBlackSmallThin,
} from 'base/styled';
import FormEmail from 'pages/Websites/FormEmail';

const Content = styled.div`
  padding: 40px 0;
  text-align: center;
  margin: 0 auto;
  width: 70%;
  hr {
    border: none;
    background: #73ccfe;
    height: 1px;
    margin: 28px 0;
  }
`;

const FormCopy = styled.form`
  display: block;
  textarea {
    font-size: 12px;
    line-height: 14px;
    padding: 8px 15px;
    height: 96px;
    background: #f3f3f3;
    width: 100%;
    color: #85929b;
    border: 1px solid #73ccfe;
    border-radius: 13px;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  button {
    margin: 10px 0 0 20px;
    height: 37px;
  }
`;

const Resourses = styled.div`
  text-align: left;
  ul {
    list-style: none;
    padding: 0;
    li {
      padding: 2px 0;
      a {
        text-decoration: none;
      }
    }
  }
`;

export default function NoData() {
  const { t: homeT } = useTranslation('home');

  const [formEmail, setFormEmail] = useState(false);
  const [copied, setCopied] = useState(false);
  const list = [
    {
      name: 'How to Add the Visitor Queue Tracking Code to your Website',
      link: 'https://resources.visitorqueue.com/hc/en-us/articles/360039585631-How-to-Add-the-Visitor-Queue-Tracking-Code-to-your-Website',
    },
    {
      name: 'Add the Visitor Queue Tracking Script Using Google Tag Manager',
      link: 'https://resources.visitorqueue.com/hc/en-us/articles/360039160012-Add-the-Visitor-Queue-Tracking-Script-Using-Google-Tag-Manager',
    },
    {
      name: 'Add the Visitor Queue Tracking Script to a Wordpress Website',
      link: 'https://resources.visitorqueue.com/hc/en-us/articles/360039568851-Add-the-Visitor-Queue-Tracking-Script-to-a-Wordpress-Website',
    },
    {
      name: 'Add the Visitor Queue Tracking Script to a Wix Website',
      link: 'https://resources.visitorqueue.com/hc/en-us/articles/360039569531-Add-the-Visitor-Queue-Tracking-Script-to-a-Wix-Website',
    },
    {
      name: '+ View more',
      link: 'https://resources.visitorqueue.com/hc/en-us',
    },
  ];

  let text = `<script>function vqTrackId(){return 'f322c2df-2fa2-4b62-a1c2-9f0a8e577f78';}
   (function(d, e) { var el = d.createElement(e); el.sa = function(an, av){this.setAttribute(an, av); 
    return this;}; el.sa('id', 'vq_tracking').sa('src', '//t.visitorqueue.com/p/tracking.min.js?id='+vqTrackId())
    .sa('async', 1).sa('data-id', vqTrackId());
    d.getElementsByTagName(e)[0].parentNode.appendChild(el); })(document, 'script'); </script>`;

  function copyToClipboard(text) {
    const ta = document.createElement('textarea');
    ta.innerText = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    setCopied(true);
  }

  function Next() {
    copyToClipboard(text);
  }

  function handleFormEmailOff() {
    setFormEmail(false);
  }

  function handleFormEmail() {
    setFormEmail(true);
  }

  return (
    <Content>
      <Row>
        <Col xs="12">
          <TextBlack>{homeT('noData')}</TextBlack>
          <TextBlackSmallThin>{homeT('haveInstalled')}</TextBlackSmallThin>
          <FormCopy>
            <textarea defaultValue={text} />

            <Buttons>
              <AccentButton onClick={Next}>
                {copied ? homeT('copied') : homeT('copy')}
              </AccentButton>
              <OutlinedButton onClick={handleFormEmail}>
                {homeT('sendEmail')}
              </OutlinedButton>
            </Buttons>
            {formEmail && (
              <Modal>
                <Overflow onClick={handleFormEmailOff}></Overflow>
                <FormEmail
                  handleFormEmailOff={handleFormEmailOff}
                  code={text}
                />
              </Modal>
            )}
          </FormCopy>
          <hr />
          <Resourses>
            <TextBlack>{homeT('resourses')}</TextBlack>
            <ul>
              {list.map((item, idx) => (
                <li key={idx}>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    <TextAccentThin>{item.name}</TextAccentThin>
                  </a>
                </li>
              ))}
            </ul>
          </Resourses>
        </Col>
      </Row>
    </Content>
  );
}
