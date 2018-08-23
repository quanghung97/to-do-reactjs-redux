import React, {Component} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {

    onGeranateData = () => {
        var tasks = [
            {
                id : this.generateID(),
                name : 'Học Lập trình',
                status : true
            },
            {
                id : this.generateID(),
                name : 'WHAT THE FUCK',
                status : false
            },
            {
                id : this.generateID(),
                name : 'MOTHER FUCKER',
                status : true
            },
        ];
        //set state change this other default
        this.setState({
            tasks : tasks
        });
        //storage in local storage ~ 5MB
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // toggle redux
    onToggleForm = () => {
        var { itemEditing } = this.props;
        if(itemEditing && itemEditing.id !== ''){
            this.props.onOpenForm();
        }else{
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            id : '',
            name : '',
            status : false
        });
    }

    render() {
         var { isDisplayForm } = this.props;

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                        <TaskForm></TaskForm>
                    </div>
                    <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button type="button" className="btn btn-primary" onClick={ this.onToggleForm }>
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={this.onGeranateData}>
                            <span className="fa fa-plus mr-5"></span>Gerenate DATA
                        </button>
                        <Control></Control>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList></TaskList>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm : () => {
            dispatch(actions.toggleForm());
        },
        onClearTask : (task) => {
            dispatch(actions.editTask(task));
        },
        onOpenForm : () => {
            dispatch(actions.openForm())
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
