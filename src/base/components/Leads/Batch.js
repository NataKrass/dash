import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as BatchIcon } from 'assets/images/batch_active.svg';
import { ManageBox } from 'base/styled';
import styled from 'styled-components';

const BatchWrapper = styled.div`
  position: relative;
  padding-top: 15px;
  a {
    margin-left: 10px;
    cursor: pointer;
  }
`;

const ManageBoxTop = styled(ManageBox)`
  right: -41px;
  top: 35px;
  padding: 0;
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
`;

export default function Batch() {
  const { t: homeT } = useTranslation('home');
  const [batch, setBatch] = useState(false);

  function handleBatch() {
    setBatch(!batch);
  }

  return (
    <BatchWrapper onClick={handleBatch}>
      <a>
        <BatchIcon />
      </a>
      {batch && (
        <ManageBoxTop>
          <a>
            <span>{homeT('export')}</span>
          </a>
          <a>
            <span>{homeT('asign')}</span>
          </a>
          <a>
            <span>{homeT('move')}</span>
          </a>
          <a>
            <span>{homeT('archive')}</span>
          </a>
          <a>
            <span>{homeT('hide')}</span>
          </a>
          <a>
            <span>{homeT('tags')}</span>
          </a>
        </ManageBoxTop>
      )}
    </BatchWrapper>
  );
}
