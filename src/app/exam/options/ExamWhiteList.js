import React, {useEffect} from 'react';
import {SubtitleLine} from '../../commons/titles/TitleLine';
import {useTextItems} from '../../usecases/TextItemUseCase';
import {TextInputField} from '../../commons/TextInputForm/TextInputField';
import {FixedTextInputField} from '../../commons/TextInputForm/FixedTextInputField';
import './ExamOptions.scss';

const ExamWhiteList = ({whitelist, onWhitelistChange}) => {
  const { textItems: ipAddresses, addTextItem: addIpAddress, removeTextItem: removeIpAddress } = useTextItems(whitelist);

  useEffect(() => {
    onWhitelistChange(ipAddresses);
  }, [ipAddresses]);

  const onAddIpAddress = (ipAddress) => {
    const ipAddressFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if(ipAddressFormat.test(ipAddress)) {
      addIpAddress(ipAddress);
    }
  };

  return (
    <div>
      <SubtitleLine title={'WhiteList'}/>
      <TextInputField placeholder={'Add IP'} onSubmit={onAddIpAddress}/>
      <FixedTextInputField items={ipAddresses} removeItem={removeIpAddress}/>
    </div>
  );
};

export default ExamWhiteList;
