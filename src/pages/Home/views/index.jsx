import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Avatar, Table } from 'antd';
import * as Icon from '@ant-design/icons';
import { useDispatch } from '@umijs/max';
import './index.css';

const list = [
  {
    key: '1',
    name: 'John Doe',
    role: 'Software Engineer',
    icon: 'WechatOutlined',
  },
  {
    key: '2',
    name: 'John Doe',
    role: 'Software Engineer',
    icon: 'TaobaoCircleOutlined',
  },
  {
    key: '3',
    name: 'John Doe',
    role: 'Software Engineer',
    icon: 'AlipayCircleOutlined',
  },
  {
    key: '4',
    name: 'John Doe',
    role: 'Software Engineer',
    icon: 'GithubOutlined',
  },
  {
    key: '5',
    name: 'John Doe',
    role: 'Software Engineer',
    icon: 'WeiboCircleOutlined',
  },
  {
    key: '6',
    name: 'John Doe',
    role: 'Software Engineer',
    icon: 'QqOutlined',
  },
];
//动态获取icon
const getIconElement = (name) => React.createElement(Icon[name]);

const Home = () => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);

  const columns = [
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
      title: '居住地',
      dataIndex: 'region',
      key: 'region',
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'home/getData',
      callback: (res) => {
        setDataSource(res.data);
      },
    });
  }, []);
  return (
    <Row className="home" gutter={2}>
      <Col span={8} className="left">
        <Card hoverable>
          <div className="user">
            {/* <Avatar
              src={require("../../assets/images/47170023.png")}
              size={100}
            /> */}
            <div className="user-info">
              <h2 className="user-name">John Doe</h2>
              <p className="user-title">Software Engineer</p>
            </div>
          </div>
          <div className="user-login-info">
            <p>
              <span>Last Login: </span>
              <span>2022-01-01</span>
            </p>
            <p>
              <span>Location:</span>
              <span> New York, USA</span>
            </p>
          </div>
        </Card>
        <Card hoverable style={{ marginTop: '5px' }}>
          <Table rowKey={'id'} columns={columns} dataSource={dataSource} pagination={false} />
        </Card>
      </Col>
      <Col span={16}>
        <div className="num">
          {list.map((item, index) => {
            return (
              <Card key={index} className="Card" hoverable>
                <div className="card-item">
                  <div className="icon-box">{getIconElement(item.icon)}</div>
                  <div className="num-info">
                    <p className="num-title">{item.name}</p>
                    <p className="num-count">{item.role}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        {/* <MyEchart chartData={echartdata} /> */}
      </Col>
    </Row>
  );
};

export default Home;
