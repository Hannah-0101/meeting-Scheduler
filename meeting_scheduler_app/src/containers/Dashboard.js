import React, { Component } from 'react'
import {Layout, Avatar, Menu, Icon, Breadcrumb} from "antd";
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
import './Dashboard.css';
 import Notes from "./Notes";
const { Header, Footer, Sider, Content } = Layout;


 class Dashboard1 extends Component {


    // constructor(props) {
    //     super(props)
    //     //this takes you back to the home page when you try accessing other pages without loggin in at runtime
    //     const bounce = window.localStorage.getItem('name')
    //       if(!bounce){
    //       const path ='/'
    //       this.props.history.push(path)
    //     }
    //     const img = window.localStorage.getItem('image')
    // }

    // handleFormLogout( event ) {
    //     event.preventDefault();
      
    //     window.localStorage.removeItem("first_name")
    //     const path = '/'
    //     this.props.history.push(path)
      
    //   }
    //   handleFormLogin( event ) {
    //     event.preventDefault();
      
    //     // window.localStorage.getItem("name")
    //     const path = '/'
    //     this.props.history.push(path)
      
    //   }


    render() {
        const img = window.localStorage.getItem('image')
        return (
            <div className="App">
                 <Notes/>
      <Layout>
      <Header style={{padding:10}}>
      <Avatar style={{float:'right'}}  src={img} />
      <DisplayNumber  id='first_name' />
      <Title style={{color:'white'}} level={3}>MEETING SCHEDULER</Title>
      </Header>
        <Layout>
        <Sider>
          <Menu
          defaultSelectedKeys={['Dashboard']}
          mode="inline"
          >
            <Menu.Item key='Dashboard'>
              Dashboard
            </Menu.Item>
            <SubMenu
            title={
              <span>
                <Icon type="mail" />
                <span>About US</span>
              </span>
            }
            >
                <Notes/>
              <Menu.ItemGroup key='AboutUS' title='Country 1'>
                <Menu.Item key='location1'> Scheduled Meeting</Menu.Item>
                <Menu.Item key='location2'> Upcoming Meeting</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>          
        <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>Content</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design Layout example Created by Shrideep</Footer>
        </Layout>
      </Layout>    
    </Layout>
    </div>
        )
    }
}

export default Dashboard1


class DisplayNumber extends React.Component{
    componentDidMount () {
      document.getElementById('first_name').innerHTML = window.localStorage.getItem('first_name')
    //   document.getElementById('email').innerHTML = window.localStorage.getItem('email')
    //   document.getElementById('country').innerHTML = window.localStorage.getItem('country')
    //   document.getElementById('city').innerHTML = window.localStorage.getItem('city')
    //   document.getElementById('job').innerHTML = window.localStorage.getItem('job')
      // document.getElementById("image").innerHTML = window.localStorage.getItem('image')
    }
    
    render() {
      return (
        <div className={'display-number'}>
          <p id={this.props.id} />
          <img src={this.props.image}/>
          {/* <p>fghfdhd</p> */}
        </div>
      )
    }
    }





