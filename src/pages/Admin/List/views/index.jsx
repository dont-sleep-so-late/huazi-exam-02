import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  Table,
  Popconfirm,
  Avatar,
  Select,
  Checkbox,
  Space,
  message,
} from 'antd';
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
    role: '',
    page: 1,
    limit: 10,
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [checked, setChecked] = useState(false);

  const columns = [
    {
      title: '身份ID',
      width: 100,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '头像',
      width: 100,
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => <Avatar src={avatar} size={64} />,
    },

    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => (gender === 1 ? '男' : '女'),
    },
    {
      title: '出生日期',
      dataIndex: 'birthday',
      key: 'birthday',
    },
    {
      title: '省份',
      dataIndex: 'area',
      key: 'area',
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
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
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
              handleClick('information', rowData);
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

  const [role, setRole] = useState();
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
    var modalType = true;
    setIsModalOpen(true);
    // 处理点击事件
    if (type == 'add') {
      navigate('/information', {
        state: {
          modalType,
          data: {},
        },
      });
    } else {
      modalType = false;
      //表单数据回填
      navigate('/information', {
        state: {
          modalType,
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
        message.success(res.data.message);
      },
    });
  };

  const handleSearch = (e) => {
    // 处理表单提交事件
    setListData({
      name: e.username ? e.username.trim() : e.username,
      role: e.role,
      region: e.checkedList,
    });
    // sessionStorage.setItem('listData', JSON.stringify(listData));
  };

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
        //搜索条件及分页码的缓存
        // dispatch({
        //   type: 'user/setData',
        //   payload: {
        //     listData,
        //   },
        //   callback: (res) => {
        //     console.log(res, 'setData');
        //   },
        // });
      },
    });
  };

  const handleCancel = () => {
    // 处理取消按钮点击事件
    setIsModalOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    // if (sessionStorage.getItem('flag')) {
    //   dispatch({
    //     type: 'user/getData',
    //     callback: (res) => {
    //       console.log(res, 'resresresresres');
    //     },
    //   });
    //   sessionStorage.setItem('flag', false);
    // }
    // setListData(JSON.parse(sessionStorage.getItem('listData')));
    // searchForm.setFieldsValue(listData);
  }, []);

  useEffect(() => {
    getTableData();
  }, [listData]);

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
          <Form.Item style={{ width: 200 }} name="role" label="岗位">
            <Select
              placeholder="请选择选择"
              options={roleList}
              value={role}
              onChange={changeRole}
              className="form-select"
            />
          </Form.Item>
          <Form.Item name="checkedList" label="常住地">
            <Checkbox.Group options={plainOptions} onChange={onChange}></Checkbox.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Button
            onClick={() => {
              searchForm.resetFields();
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
    </div>
  );
};

export default User;
