import React, { useState, useEffect,useCallback } from 'react';
import {Layout, Menu, theme, Table, Tag, Space, Select} from 'antd';
import {

} from '@ant-design/icons';
import './App.css';

function App() {
  interface DataType {
    key: string;
    host: string;
    time: string;
    visiting: string;
    score: string;
  }
  const data22f: DataType[] = [
    {
      key: '1',
      host: '祥波书院',
      time: "06-24",
      visiting: '思廷书院',
      score: "40:50",
    },
    {
      key: '2',
      host: '道扬书院',
      time: "06-25",
      visiting: '逸夫书院',
      score: "50:60",
    },
    {
      key: '3',
      host: '学勤书院',
      time: "06-26",
      visiting: '祥波书院',
      score: "60:70",
    },
  ];
  const data23s: DataType[] = [
    {
            key: '4',
            host: '学勤书院',
            time: "06-26",
            visiting: '逸夫书院',
            score: "45:51",
          },
          {
            key: '5',
            host: '逸夫书院',
            time: "06-27",
            visiting: '祥波书院',
            score: "34:55",
          },
          {
            key: '6',
            host: '思廷书院',
            time: "06-27",
            visiting: '道扬书院',
            score: "44:54",
          },
  ];
  const data23f: DataType[] = [
      {
            key: '7',
            host: '祥波书院',
            time: "06-29",
            visiting: '道扬书院',
            score: "33:56",
          },
          {
            key: '8',
            host: '逸夫书院',
            time: "06-29",
            visiting: '学勤书院',
            score: "33:28",
          },
          {
            key: '9',
            host: '学勤书院',
            time: "06-30",
            visiting: '祥波书院',
            score: "67:55",
          },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '主队',
      dataIndex: 'host',
      key: 'host',
    },
    {
      title: '比分',
      key: 'score',
      dataIndex: 'score',
    },
    {
      title: '客队',
      dataIndex: 'visiting',
      key: 'visiting',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const [matches, setMatches] = useState([]);
  const [season, setSeason] = useState(data23s);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Sider, Content } = Layout;

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const seasons = [{"season":"2022 Fall"}, {"season":"2023 Spring"},{"season":"2023 Fall"}]

  const handleHeaderClick = useCallback((item) => {
    console.log(item.key)
    if (item.key === '0') {
      setSeason(data22f);
    } else if (item.key === '1') {
      setSeason(data23s);
    } else if(item.key === '2'){
      setSeason(data23f);
    }
  }, [setSeason]);

  return(
    <Layout >
      <Header className='Header'>
        <div className="Logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={seasons.map((item,index) => ({
              key: String(index),
              label: item.season,
            }))}
            onSelect={(item)=>{handleHeaderClick(item)}}
          />
        </Header>
      <Layout>
      <Sider>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
          items={[
            {
              key: '1',
              label: '赛程',
            },
            {
              key: '2',
              label: '排行榜',
            },
          ]}
        />
      </Sider>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#ffffff',
          }}
        >
          <Table columns={columns} dataSource={season} />
        </Content>
      </Layout>
    </Layout>
  );
}
export default App;
