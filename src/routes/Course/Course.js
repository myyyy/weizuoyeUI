import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Modal, Badge, Form, Input, message,Popconfirm} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';

import styles from './CourseList.less';

const FormItem = Form.Item;
@connect(state => ({
  list: state.course,
}))
export default class CourseList extends PureComponent {
  state = {
    modalVisible: false,
    coursename: '',
    coursecode: '',
    coursedescription: '',
    onOk:'',
    formdisabled:false,
    course_id:'',
  };
  // 公共方法
  get_course_data = ()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'course/fetch',
      payload: {
        count: 8,
      },
    });
  }
  componentDidMount() {
    this.get_course_data();
  }
  handleModalVisible = (flag,onOk,item={},formdisabled=false) => {
    console.log(onOk);
    this.setState({
      modalVisible: !!flag,
      onOk:onOk,
      formdisabled:formdisabled,
    });
    if(JSON.stringify(item) != '{}'){
      this.setState({
        course_id: item._id['$oid'],
        coursecode: item.code,
        coursename: item.name,
        coursedescription: item.description,
      });
    }
  }

  handleCourseName = (e) => {
    this.setState({
      coursename: e.target.value,
    });
  }
  handleCourseCode = (e) => {
    this.setState({
      coursecode: e.target.value,
    });
  }
  handleCourseDes = (e) => {
    this.setState({
      coursedescription: e.target.value,
    });
  }
  handleRemove = (_id,e) =>{
    this.props.dispatch({
      type: 'course/remove',
      payload:{
        _id: _id,
      },
    });
    console.log(this.props);
    if(this.props.list.rm===true){
      this.get_course_data();
    }
    message.success('删除成功');
    this.setState({
      modalVisible: false,
    });
  }
  handleEdit = () =>{
    console.log(this.state)
    this.props.dispatch({
      type: 'course/edit',
      payload: {
        _id:this.state.course_id,
        name: this.state.coursename,
        code: this.state.coursecode,
        description: this.state.coursedescription,
      },
    });
    // this.props 包含dom数据，即添加完成之后刷新页面的数据，每个添加都要掉一次这个
    message.success('编辑成功');
    this.setState({
      modalVisible: false,
    });
    this.get_course_data();
  }
  handleAdd = () => {
    this.props.dispatch({
      type: 'course/add',
      payload: {
        name: this.state.coursename,
        code: this.state.coursecode,
        description: this.state.coursedescription,
      },
    });
    // this.props 包含dom数据，即添加完成之后刷新页面的数据，每个添加都要掉一次这个
    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
    this.get_course_data();
  }

  render() {
    const { list: { list, loading,rm,newc } } = this.props;
    const { modalVisible, coursecode, coursename, coursedescription, onOk, formdisabled } = this.state;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          我的课程，用最简单的方式展示我的课程信息。
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" /> 全部课程
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" /> 我的课程
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" /> 加入的课程
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img alt="这是一个标题" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" />
      </div>
    );

    return (
      <PageHeaderLayout
        title="课程详情"
        content={content}
        extraContent={extraContent}
      >
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item => (item ? (
              <List.Item key={item._id['$oid']}>
                <Card hoverable className={styles.card} actions={[
                <a onClick={(e) => this.handleModalVisible(true,this.handleEdit,item,true)}>编辑</a>, 
                <Popconfirm title="确定删除这个课程吗？" onConfirm={(e) => this.handleRemove(item._id['$oid'],e)} okText="Yes" cancelText="No">
                <a>删除</a>
                </Popconfirm>,
                <a>查看</a>]}>
                  <Card.Meta
                    avatar={ <Badge count={item.unfinish}><img alt="" className={styles.cardAvatar} src={item.avatar} /></Badge>}
                    title={<a href="#">{item.name}</a>}
                    description={(
                      <Ellipsis className={styles.item} lines={3}>{item.description}</Ellipsis>
                    )}
                  />
                </Card>
              </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton} onClick={() => this.handleModalVisible(true,this.handleAdd,{},false)}>
                    <Icon type="plus" /> 新增课程
                  </Button>
                </List.Item>
              )
            )}
          />
        </div>
        <Modal
          title="新建课程"
          visible={modalVisible}
          onOk={onOk || this.handleAdd}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="名称"
          >
            <Input placeholder="课程名称" onChange={this.handleCourseName} value={coursename} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="编号"
          >
            <Input placeholder="课程编号" disabled={formdisabled} onChange={this.handleCourseCode} value={coursecode} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="描述"
          >
            <Input placeholder="课程描述（非必填）" onChange={this.handleCourseDes} value={coursedescription} />
          </FormItem>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
