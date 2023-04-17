import React, { useState, useEffect,useCallback } from 'react';
import {Layout, Menu, theme, Table, Tag, Space, Select} from 'antd';
import {

} from '@ant-design/icons';
import './App.css';

function App() {
  interface statsDataType {
    key: string;
    player: string;
    schedual_id: string;
    team: string;
    rank: string;
    points: string;
  }
  const statsColumns: ColumnType<statsDataType> = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: '选手',
      dataIndex: 'player',
      key: 'player',
    },
    {
      title: '场次',
      dataIndex: 'schedual_id',
      key: 'schedual_id',
      render: (schedual_id) => (
        <Space size="middle">
          {`第 ${schedual_id} 场`}
        </Space>
      ),
    },
    {
      title: '队伍',
      key: 'team',
      dataIndex: 'team',
    },
    {
      title: '得分',
      dataIndex: 'points',
      key: 'points',
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
  ]
  const stats22f = [
    {
            key: '1',
            player: '潘奇',
            schedual_id: '9',
            team: 'Diligentia',
            rank: "1",
            points: "27",
          },
      {
            key: '2',
            player: '柯云飞',
            schedual_id: '3',
            team: 'Shaw',
            rank: "2",
            points: "21",
          },
      {
            key: '3',
            player: '张泽宇',
            schedual_id: '2',
            team: 'Harmonia',
            rank: "3",
            points: "19",
          },
      {
            key: '4',
            player: '王博威',
            schedual_id: '7',
            team: 'Muse',
            rank: "4",
            points: "18",
          },
      {
            key: '5',
            player: '林垚芃',
            schedual_id: '8',
            team: 'Ling',
            rank: "5",
            points: "17",
          },
  ]
  const stats23s = [
    {
    key: '5',
    player: '章洪涛',
    schedual_id: '1',
    team: 'Harmonia',
    rank: "5",
    points: "20",
    },]
  interface matchDataType {
    key: string;
    host: string;
    time: string;
    visiting: string;
    score: string;
  }
  const data22f: matchDataType[] = [
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
  const data23s: matchDataType[] = [
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
  const data23f: matchDataType[] = [
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
  const matchColumns: ColumnsType<matchDataType> = [
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
  const [matches, setMatches] = useState(data23s);
  const [season, setSeason] = useState("1");
  const [sider, setSider] = useState("1");
  const [stats, setStats]=useState(stats23s);
  const [loading, setLoading] = useState(true);
  const { Header, Sider, Content } = Layout;

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const seasons = [{"season":"2022 Fall"}, {"season":"2023 Spring"},{"season":"2023 Fall"}]

  const handleHeaderClick = (item) => {
    console.log(item.key)
    setSeason(item.key)
  };
  const handleSiderClick = (item) =>{
    console.log(item.key)
    setSider(item.key)
  }
  useEffect(()=>{
    if(sider === '1'){
      if (season === '0') {
        setMatches(data22f);
      } else if (season === '1') {
        setMatches(data23s);
      } else if(season === '2'){
        setMatches(null);
      }
    }else if(sider === '2'){
      if (season === '0') {
        setStats(stats22f);
      } else if (season === '1') {
        setStats(stats23s);
      } else if(season === '2'){
        setStats(null);
      }
    }
  },[season,sider])



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
          onSelect={(item)=>{handleSiderClick(item)}}
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
          <Table columns={sider==='1'?matchColumns:statsColumns} dataSource={sider==='1'?matches:stats} />
        </Content>
      </Layout>
    </Layout>
  );
}
export default App;
