import React, { useState, useEffect,useCallback, useRef } from 'react';
import {Layout, Menu, theme, Table, Tag, Space, Select, Button, Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import './App.css';

function App() {
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
            key: '1',
            player: '乔冠',
            schedual_id: '9',
            team: 'Muse',
            rank: "1",
            points: "28",
          },
      {
            key: '2',
            player: '陈澍霖',
            schedual_id: '12',
            team: 'Ling',
            rank: "2",
            points: "25",
          },
      {
            key: '3',
            player: '李恒元',
            schedual_id: '9',
            team: 'Diligentia',
            rank: "3",
            points: "21",
          },
      {
            key: '4',
            player: '赵旭航',
            schedual_id: '5',
            team: 'Harmonia',
            rank: "4",
            points: "20",
          },
    {
    key: '5',
    player: '章洪涛',
    schedual_id: '1',
    team: 'Harmonia',
    rank: "5",
    points: "20",
    },]

  const data22f = [
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
  const data23s = [
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


  const [matches, setMatches] = useState(data23s);
  const [season, setSeason] = useState("1");
  const [sider, setSider] = useState("1");
  const [stats, setStats]=useState(stats23s);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { Header, Sider, Content } = Layout;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
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

  useEffect(()=>{
    if(admin === true){
      setstatsColumns(statsColumns1)
      setmatchColumns(matchColumns1)
    }else{
      setstatsColumns(statsColumns2)
      setmatchColumns(matchColumns2)

    }
  },[admin])

  const handleSearch = (
    selectedKeys,
    confirm,
    dataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys)[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const statsColumns1 = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      ...getColumnSearchProps('rank'),
    },
    {
      title: '选手',
      dataIndex: 'player',
      key: 'player',
      ...getColumnSearchProps('player')
    },
    {
      title: '场次',
      dataIndex: 'schedual_id',
      key: 'schedual_id',
      ...getColumnSearchProps('schedual_id'),
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
      ...getColumnSearchProps('team')
    },
    {
      title: '得分',
      dataIndex: 'points',
      key: 'points',
      ...getColumnSearchProps('points')

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
  const statsColumns2 = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      ...getColumnSearchProps('rank')

    },
    {
      title: '选手',
      dataIndex: 'player',
      key: 'player',
      ...getColumnSearchProps('player')
    },
    {
      title: '场次',
      dataIndex: 'schedual_id',
      key: 'schedual_id',
      ...getColumnSearchProps('schedual_id'),
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
      ...getColumnSearchProps('team')

    },
    {
      title: '得分',
      dataIndex: 'points',
      key: 'points',
      ...getColumnSearchProps('points')
    },
  ]
  const matchColumns1= [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      ...getColumnSearchProps('time')

    },
    {
      title: '主队',
      dataIndex: 'host',
      key: 'host',
      ...getColumnSearchProps('host')
    },
    {
      title: '比分',
      key: 'score',
      dataIndex: 'score',
      ...getColumnSearchProps('score')

    },
    {
      title: '客队',
      dataIndex: 'visiting',
      key: 'visiting',
      ...getColumnSearchProps('visiting')
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
  const matchColumns2= [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      ...getColumnSearchProps('time')

    },
    {
      title: '主队',
      dataIndex: 'host',
      key: 'host',
      ...getColumnSearchProps('host')
    },
    {
      title: '比分',
      key: 'score',
      dataIndex: 'score',
      ...getColumnSearchProps('score')
    },
    {
      title: '客队',
      dataIndex: 'visiting',
      key: 'visiting',
      ...getColumnSearchProps('visiting')
    },
  ];
  const [statsColumns, setstatsColumns] = useState(statsColumns2);
  const [matchColumns, setmatchColumns] = useState(matchColumns2);
  return(
    <Layout className='App'>
      <Header className='Header'>
        <img className="Logo" src='header_institution.png' alt=""/>
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
          <Button style={{position:"fixed",right:"40px"}} ghost={true} onClick={()=>{setAdmin(!admin)}}>{admin?"游客模式":"管理员模式"}</Button>
      </Header>
      <Layout>
      <Sider className='Sider'>
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
