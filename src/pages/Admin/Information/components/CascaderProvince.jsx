import React from 'react';
import { Cascader } from 'antd';
import options from './Area.json';
import { useDispatch } from '@umijs/max';

const filter = (inputValue, path) =>
  path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
const CascaderProvince = (props) => {
  const { changeArea, value } = props;
  const onChange = (value, selectedOptions) => {
    changeArea({ value, selectedOptions });
  };
  return (
    <Cascader
      options={options}
      onChange={onChange}
      value={value}
      placeholder="Please select"
      showSearch={{
        filter,
      }}
    />
  );
};
export default CascaderProvince;
