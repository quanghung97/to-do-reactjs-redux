import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false
        };
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        //console.log('componentWillMount')
        //khoi tao 1 lan component luc component TaskForm chua co
        if(this.props.itemEditing && this.props.itemEditing.id !== null) {
            this.setState({
                id : this.props.itemEditing.id,
                name : this.props.itemEditing.name,
                status : this.props.itemEditing.status
            });
            //conole.log(this.state);
        } else {
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps) {
        //ReceiveProps when componentWillMount exist
        //console.log(nextProps);
        if(nextProps && nextProps.itemEditing) {
            this.setState({
                id : nextProps.itemEditing.id,
                name : nextProps.itemEditing.name,
                status : nextProps.itemEditing.status
            });
            //conole.log(this.state);
        } else {
            this.onClear();
        }
    }

    onChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name] : value
        });
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name : '',
            status : false
        });
    }

    render() {
        if (!this.props.isDisplayForm) return null;
        var { id } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{id !== '' ? 'Cập Nhật Công Việc' : 'Thêm Công Việc'}
                        <span className="fa fa-times-circle text-right" onClick={ this.onCloseForm }></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange = {this.onChange}/>
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" name="status" value={this.state.status} onChange = {this.onChange}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask : (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
