import React, { useState } from 'react';
import { Button, Form, Input, Table, Popconfirm, Modal, Select, Checkbox, Space } from 'antd';
import './index.css';
import { useEffect } from 'react';
import { useDispatch } from '@umijs/max';
import { useNavigate } from 'umi';

const User = () => {
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
      title: '常住地',
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
      navigate('/information');
    } else {
      setModalType(1);
      //表单数据回填
      navigate('/information', {
        state: {
          data: data,
        },
      });
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

  return (
    <div className="user">
      <div className="flex-box">
        <Button
          type="primary"
          onClick={() => {
            handleClick('add');
          }}
        >
          新增
        </Button>

        <Form form={searchForm} layout="inline" onFinish={handleSearch}>
          <Form.Item name="username" label="姓名">
            <Input placeholder="姓名" />
          </Form.Item>
          <Form.Item name="role" label="岗位">
            <Select
              options={roleList}
              value={role}
              onChange={changeRole}
              className="form-select"
              placeholder="请选择选择"
            />
          </Form.Item>
          <Form.Item name="checkedList" label="常住地" valuePropName="region">
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              checked={checked}
              onChange={onChange}
            ></CheckboxGroup>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Button
            onClick={() => {
              searchForm.resetFields();
              setCheckedList([]);
            }}
          >
            重置
          </Button>
        </Form>
      </div>
      <Table
        dataSource={tableData}
        columns={columns}
        rowKey={'id'}
        loading={loading}
        pagination={{
          total: total,
          showSizeChanger: true,
          onChange: (current, pageSize) => {
            setListData({
              page: current,
              limit: pageSize,
            });
          },
          pageSizeOptions: [10, 20, 50, 100],
          showTotal: (total) => `共 ${total} 条`,
          defaultPageSize: 10,
        }}
      />

      <Modal
        title={modalType ? '编辑用户' : '新增用户'}
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={handleFinish}>
          {modalType ? (
            <Form.Item label="身份ID" name="id">
              <Input disabled />
            </Form.Item>
          ) : null}
          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item label="角色" name="role" rules={[{ required: true, message: '请输入角色' }]}>
            <Input placeholder="请输入角色" />
          </Form.Item>
          <Form.Item
            label="主要技能"
            name="skills"
            rules={[{ required: true, message: '请输入主要技能' }]}
          >
            <Input placeholder="请输入主要技能" />
          </Form.Item>
          <Form.Item
            label="常住地"
            name="region"
            rules={[{ required: true, message: '请输入常住地' }]}
          >
            <Input placeholder="请输入常住地" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
