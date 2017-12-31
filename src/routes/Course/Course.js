import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Modal, Badge, Form, Input, message} from 'antd';

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
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'course/fetch',
      payload: {
        count: 8,
      },
    });
  }
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
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
  handleAdd = () => {
    this.props.dispatch({
      type: 'course/add',
      payload: {
        name: this.state.coursename,
        code: this.state.coursecode,
        description: this.state.coursedescription,
      },
    });
    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const { list: { list, loading } } = this.props;
    const { modalVisible, coursecode, coursename, coursedescription } = this.state;

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
                <Card hoverable className={styles.card} actions={[<a>编辑</a>, <a>删除</a>,<a>查看</a>]}>
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
                  <Button type="dashed" className={styles.newButton} onClick={() => this.handleModalVisible(true)}>
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
          onOk={this.handleAdd}
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
            <Input placeholder="课程编号" onChange={this.handleCourseCode} value={coursecode} />
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
