import React, { useState } from 'react';
import { Button, Form, Input, Select, Checkbox, DatePicker, Radio } from 'antd';
import './index.css';
import { useEffect } from 'react';
import { useDispatch, useNavigate, useLocation } from '@umijs/max';
import UploadAvatar from '../components/UploadAvatar';
import CascaderProvince from '../components/CascaderProvince';
import dayjs from 'dayjs';
import { message } from 'antd';

const Information = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [form] = Form.useForm();

  const [role, setRole] = useState([]);
  const roleList = [
    {
      value: '软件工程师',
      label: '软件工程师',
    },
    {
      value: '数据分析师',
      label: '数据分析师',
    },
    {
      value: '产品经理',
      label: '产品经理',
    },
    {
      value: 'UI设计师',
      label: 'UI设计师',
    },
    {
      value: '测试工程师',
      label: '测试工程师',
    },
    {
      value: '前端工程师',
      label: '前端工程师',
    },
    {
      value: '后端工程师',
      label: '后端工程师',
    },
    {
      value: '运维工程师',
      label: '运维工程师',
    },
    {
      value: '网络安全工程师',
      label: '网络安全工程师',
    },
    {
      value: '大数据工程师',
      label: '大数据工程师',
    },
  ];
  const plainOptions = ['广州', '深圳'];
  const changeRole = (value) => {
    setRole(value);
  };

  const handleFinish = () => {
    form
      .validateFields()
      .then((values) => {
        values = {
          ...values,
          birthday: values['birthday'].format('YYYY-MM-DD'),
          area: values['area'],
          region: values['regionList'],
          remark: values['remark'],
        };
        if (!state.modalType) {
          //编辑
          dispatch({
            type: 'user/updateUser',
            payload: values,
            callback: (res) => {
              navigate('/Admin');
              message.success(res.data.message);
            },
          });
        } else {
          // 新增
          dispatch({
            type: 'user/addUser',
            payload: values,
            callback: (res) => {
              navigate('/Admin');
              message.success(res.data.message);
            },
          });
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const getTableData = () => {
    if (location.state) {
      form.setFieldValue('id', state.data['id']);
      form.setFieldValue('name', state.data['name']);
      form.setFieldValue('area', state.data['area']);
      form.setFieldValue(
        'birthday',
        dayjs(state.data['birthday'] ? state.data['birthday'] : '2024-01-01'),
      );
      changeAvatar(state.data['avatar']);
      form.setFieldValue('gender', state.data['gender']);
      form.setFieldValue('role', state.data['role']);
      form.setFieldValue('regionList', state.data['region']);
      form.setFieldValue('skills', state.data['skills']);
      form.setFieldValue('remark', state.data['remark']);
    }
  };

  useEffect(() => {
    // 页面加载时执行的函数
    getTableData();
  }, []);

  const changeArea = (area) => {
    //将 item.label 装进数组
    if (area.selectedOptions) {
      const prev = [];
      area.selectedOptions.map((item) => prev.push(item.label));
      form.setFieldValue('area', prev);
    }
  };

  const changeAvatar = (avatar) => {
    form.setFieldValue('avatar', avatar);
  };

  return (
    <div className="information">
      <div className="flex-box">
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={handleFinish}>
          {/* 上传头像 */}
          <Form.Item name="avatar">
            <div className="avatar">
              <UploadAvatar avatar={state?.data['avatar']} changeAvatar={changeAvatar} />
            </div>
          </Form.Item>
          {/* 存在id表单项，但是不展示 */}
          <Form.Item name="id" style={{ display: 'none' }}></Form.Item>
          <Form.Item
            label="姓名"
            name="name"
            rules={[
              { required: true, message: '请输入姓名' },
              {
                validator: (_, value) => {
                  if (value.length > 10) {
                    return Promise.reject(new Error('姓名不能超过10个字符'));
                  }
                  return Promise.resolve();
                },
              },
              {
                validator: (_, value) => {
                  if (value.length < 2) {
                    return Promise.reject(new Error('姓名不能少于2个字符'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item name="role" label="岗位" rules={[{ required: true, message: '请选择岗位' }]}>
            <Select
              options={roleList}
              value={role}
              onChange={changeRole}
              className="form-select"
              placeholder="请选择选择"
            />
          </Form.Item>
          <Form.Item label="省份" name="area" rules={[{ required: true, message: '请选择省份' }]}>
            <CascaderProvince form={form.getFieldsValue()} changeArea={changeArea} />
          </Form.Item>
          {/* 选择性别 */}
          <Form.Item label="性别" name="gender" rules={[{ required: true, message: '请选择性别' }]}>
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
            </Radio.Group>
          </Form.Item>
          {/* 出生日期 */}
          <Form.Item
            label="出生日期"
            name="birthday"
            rules={[{ required: true, message: '请选择出生日期' }]}
          >
            <DatePicker placeholder="请选择出生日期" style={{ width: '20%' }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="regionList" label="常住地">
            <Checkbox.Group options={plainOptions}></Checkbox.Group>
          </Form.Item>
          <Form.Item label="主要技能" name="skills">
            <Input placeholder="请输入技能" />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea rows={4} placeholder="请输入备注" />
          </Form.Item>

          <div className="btn">
            <Button type="primary" htmlType="submit">
              确认
            </Button>
            <Button
              onClick={() => {
                navigate('/admin');
              }}
            >
              取消
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Information;
