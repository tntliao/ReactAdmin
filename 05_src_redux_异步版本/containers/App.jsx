import { connect } from 'react-redux'
import Counter from '../components/Counter';
import { increment, delcrement, incrementAsync } from '../redux/actions'
/*
    容器组件：通过connect包装UI组件产生组件
    connect():高阶函数
    connect():返回的函数是一个高阶组件：接受一个UI组件，生成一个容器组件
    容器组件的责任：向UI组件传入一个特定的属性
 */
export default connect(
    state => ({ count: state }),
    { increment, delcrement, incrementAsync }
)(Counter)