import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List, Button, Modal, Input, Icon, DatePicker, 
Menu, Dropdown, Avatar, Progress, Radio} from 'antd';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import AvatarList from '../../components/AvatarList';
import styles from './Task.less';


const { Option } = Select;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const FormItem = Form.Item;
const { Search } = Input;

// const routeData = getRouteData('task');

/* eslint react/no-array-index-key: 0 */
@Form.create()
@connect(state => ({
  task: state.task,
  course: state.course,
}))
export default class CoverCardList extends PureComponent {
  state = {
    addTasklModalVisible:false,
    content:'',
  };
  courseid = ''
  componentDidMount() {
    this.courseid = this.props.location.query ? this.props.location.query.id : '';
    console.log(this.props.location.query);
    this.props.dispatch({
      type: 'course/crouseTaskStatus',
      payload: {
        count: 8,
        courseid: this.courseid,
      },
    });
    this.props.dispatch({
      type: 'course/fetch',
      payload: {
        count: 8,
      },
    });
  }
  handleModalVisible = (flag,onOk) =>{
    this.setState({
      addTasklModalVisible: !!flag,
      onOk:onOk,
    })
  }
  handleFormSubmit = () => {
    const { form, dispatch } = this.props;
    // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
    setTimeout(() => {
      form.validateFields((err,value) => {
        console.log(value);
        if (!err) {
          dispatch({
            type: 'coursetask/add',
            payload: {
              ...value,
              count: 8,
            },
          });
        }
      });
    }, 0);
  }

  render() {
    const { task: { task = [], loading },course:{course=[],courseTaskStatus=[]}, form } = this.props;
    const { getFieldDecorator } = form;
    const courseid = this.courseid
    const {addTasklModalVisible,onOk,content} = this.state
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    }
    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="waiting">等待中</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入"
          onSearch={() => ({})}
        />
      </div>
    );
    const MoreBtn = () => (
      <Dropdown overlay={menu}>
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );
    const menu = (
      <Menu>
        <Menu.Item>
          <a>编辑</a>
        </Menu.Item>
        <Menu.Item>
          <a>删除</a>
        </Menu.Item>
      </Menu>
    );
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div>
          <span>Owner</span>
          <p>{owner}</p>
        </div>
        <div>
          <span>开始时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD hh:mm')}</p>
        </div>
        <div>
          <Progress percent={percent} status={status} strokeWidth={6} />
        </div>
      </div>
    );
    const cardList = courseTaskStatus ? (
      <List
      size="large"
      rowKey="id"
      loading={loading}
      // pagination={0}
      dataSource={courseTaskStatus}
      renderItem={item => (
        <List.Item
          actions={[<a>编辑</a>, <MoreBtn />]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.owner.$oid} shape="square" size="large" />}
            title={<a href={item.content}>{item.content}</a>}
            description={item.content}
          />
          <ListContent data={item.fid} />
        </List.Item>
      )}
    />
    ) : null;



    return (
      <div className={styles.standardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect onChange={this.handleFormSubmit} expandable initialValue={courseid} >
                  {
                    course.map(function (item,index) {
                      return (
                        <TagSelect.Option key={index} value={item._id['$oid']} defaultChecked='true'>{item.name}</TagSelect.Option>
                      )})
                  }
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow
              title="其它选项"
              grid
              last
            >
              <Row gutter={24}>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem
                    {...formItemLayout}
                    label="作者"
                  >
                    {getFieldDecorator('author', {})(
                      <Select
                        onChange={this.handleFormSubmit}
                        placeholder="不限"
                        style={{ maxWidth: 200, width: '100%' }}
                      >
                        <Option value="lisa">王昭君</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem
                    {...formItemLayout}
                    label="好评度"
                  >
                    {getFieldDecorator('rate', {})(
                      <Select
                        onChange={this.handleFormSubmit}
                        placeholder="不限"
                        style={{ maxWidth: 200, width: '100%' }}
                      >
                        <Option value="good">优秀</Option>
                        <Option value="normal">普通</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <Card
          className={styles.listCard}
          bordered={false}
          title="课程作业"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraContent}
        >
          <Button onClick={(e) =>this.handleModalVisible(true,this.handleFormSubmit)} type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus">
            添加
          </Button>
          {cardList}
        </Card>
        <Modal
        title="详情"
        visible={addTasklModalVisible}
        onOk = {onOk || this.handleAddTask}
        onCancel={() => this.handleModalVisible()}
        >
          <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="课程"
          >
            {getFieldDecorator('courseid', {
              rules: [{ required: true, message: '请选择一个课程！！' }],
            })(
            <Select
              // value={}
              // size={size}
              placeholder="选择课程"
              style={{ width: '50%' }}
              onChange={this.handleCurrencyChange}
            >
              {
                course.map(function (item,index) {
                  return (
                    // <TagSelect.Option key={index} value={item._id['$oid']} defaultChecked='true'>{item.name}</TagSelect.Option>
                    <Option value={item._id['$oid']} key={index}>{item.name}</Option>
                  )})
              }
            </Select>
            )}
          </FormItem>
          <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="名称"
          >
            {getFieldDecorator('content', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="输入习题内容" />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="结束时间"
          >
            {getFieldDecorator('endtime', config)(
              <DatePicker />
            )}
          </FormItem>
      </Modal>
    </div>
    );
  }
}
