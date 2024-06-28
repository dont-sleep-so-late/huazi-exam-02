import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  Table,
  Popconfirm,
  Modal,
  Select,
  Checkbox,
  Space,
  DatePicker,
  Radio,
} from 'antd';
import './index.css';
import { useEffect } from 'react';
import { useDispatch, useNavigate } from '@umijs/max';
import UploadAvatar from '../components/UploadAvatar';
import CascaderProvince from '../components/CascaderProvince';
const Information = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [listData, setListData] = useState({
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [checked, setChecked] = useState(false);

  const columns = [
    {
      title: '身份ID',
      width: 150,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '主要技能',
      dataIndex: 'skills',
      key: 'skills',
    },
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (rowData) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              handleClick('edit', rowData);
            }}
          >
            查看详情
          </Button>
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => handleDelete(rowData)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
  const CheckboxGroup = Checkbox.Group;
  const plainOptions = ['广州', '深圳'];
  const [checkedList, setCheckedList] = useState();
  const onChange = (list) => {
    setCheckedList(list);
  };
  const changeRole = (value) => {
    setRole(value);
  };

  const handleClick = (type, data) => {
    setIsModalOpen(true);
    // 处理点击事件
    if (type == 'add') {
      setModalType(0);
    } else {
      setModalType(1);
      //表单数据回填
      form.setFieldsValue(data);
    }
  };

  const handleDelete = (data) => {
    // 处理删除事件
    dispatch({
      type: 'user/deleteUser',
      payload: data,
      callback: (res) => {
        handleCancel();
        getTableData();
      },
    });
  };

  const handleSearch = (e) => {
    // 处理表单提交事件
    setListData({
      name: e.username,
      role: e.role,
      region: e.checkedList,
    });
  };
  const handleFinish = (values) => {};
  useEffect(() => {
    getTableData();
  }, [listData]);

  const getTableData = () => {
    setLoading(true);
    // 获取表格数据
    dispatch({
      type: 'user/getUser',
      payload: listData,
      callback: (res) => {
        setTableData(res.data);
        setTotal(res.total);
        setLoading(false);
      },
    });
  };

  const handleOK = () => {
    // 处理确定按钮点击事件
    form
      .validateFields()
      .then((values) => {
        values = {
          ...values,
          birthday: values['birthday'].format('YYYY-MM-DD'),
        };
        setIsModalOpen(false);
        if (modalType) {
          //编辑
          dispatch({
            type: 'user/updateUser',
            payload: values,
            callback: (res) => {
              handleCancel();
              getTableData();
            },
          });
        } else {
          // 新增
          dispatch({
            type: 'user/addUser',
            payload: values,
            callback: (res) => {
              handleCancel();
              getTableData();
            },
          });
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    // 处理取消按钮点击事件
    setIsModalOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    // 页面加载时执行的函数
    getTableData();
  }, []);

  const changeArea = (area) => {
    form.setFieldValue('area', area.value);
  };

  const changeAvatar = (avatar) => {
    form.setFieldValue('avatar', avatar);
  };

  return (
    <div className="information">
      <div className="flex-box">
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={handleFinish}>
          {/* 上传头像 */}
          <div className="avatar">
            <UploadAvatar changeAvatar={changeAvatar} />
          </div>
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
          <Form.Item label="省份" name="area" rules={[{ required: true, message: '请选择省份' }]}>
            <CascaderProvince changeArea={changeArea} />
          </Form.Item>
          {/* 选择性别 */}
          <Form.Item label="性别" name="gender" rules={[{ required: true, message: '请选择性别' }]}>
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
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
          <Form.Item name="checkedList" label="常住地" valuePropName="region">
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              checked={checked}
              onChange={onChange}
            ></CheckboxGroup>
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea rows={4} placeholder="请输入备注" />
          </Form.Item>

          <div className="btn">
            <Button type="primary" onClick={() => handleOK()} htmlType="submit">
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
