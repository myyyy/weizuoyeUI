import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List } from 'antd';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import AvatarList from '../../components/AvatarList';
import styles from './Task.less';

const { Option } = Select;
const FormItem = Form.Item;
// const routeData = getRouteData('task');

/* eslint react/no-array-index-key: 0 */
@Form.create()
@connect(state => ({
  task: state.task,
  course: state.course,

}))
export default class CoverCardList extends PureComponent {
  // 公共方法

  componentDidMount() {
    this.props.dispatch({
      type: 'course/fetch',
      payload: {
        count: 8,
      },
    });
    console.log(this)
    this.props.dispatch({
      type: 'task/fetch',
      payload: {
        count: 8,
        coursetaskid: this.props.match.params.id
      },
    });

  }

  handleFormSubmit = () => {
    const { form, dispatch } = this.props;
    // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
    setTimeout(() => {
      form.validateFields((err) => {
        if (!err) {
          // eslint-disable-next-line
          dispatch({
            type: 'task/fetch',
            payload: {
              count: 8,
            },
          });
        }
      });
    }, 0);
  }

  render() {
    const { task: { task = [], loading },course:{course=[]}, form } = this.props;
    const { getFieldDecorator } = form;

    const cardList = task ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
        dataSource={task}
        renderItem={item => (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.title} src={item.cover} height={154} />}
            >
              <Card.Meta
                title={<a href="#">{item.title}</a>}
                description={item.subDescription}
              />
              <div className={styles.cardItemContent}>
                <span>{moment(item.updatedAt).fromNow()}</span>
                <div className={styles.avatarList}>
                  <AvatarList size="mini">
                    {
                      item.members.map((member, i) => (
                        <AvatarList.Item
                          key={`${item.id}-avatar-${i}`}
                          src={member.avatar}
                          tips={member.name}
                        />
                      ))
                    }
                  </AvatarList>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    ) : null;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div className={styles.coverCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect onChange={this.handleFormSubmit} expandable>
                  {
                    course.map(function (item,index) {
                      return (
                        <TagSelect.Option key={index} value={item._id['$oid']}>{item.name}</TagSelect.Option>
                        
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
        <div className={styles.cardList}>
          {cardList}
        </div>
      </div>
    );
  }
}
