import React from 'react';
import { Cascader } from 'antd';
import options from './Area.json';
import { useDispatch } from '@umijs/max';

const filter = (inputValue, path) =>
  path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
const CascaderProvince = (props) => {
  const { changeArea } = props;
  const dispatch = useDispatch();
  const onChange = (value, selectedOptions) => {
    changeArea({ value, selectedOptions });
  };

  return (
    <Cascader
      options={options}
      onChange={onChange}
      placeholder="Please select"
      showSearch={{
        filter,
      }}
      onSearch={(value) => console.log(value)}
    />
  );
};
export default CascaderProvince;
