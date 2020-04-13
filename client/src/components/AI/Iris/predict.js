import React, {Component} from 'react';
import axios from 'axios';
//import './Predict.css';

export default class Predict extends Component {

    constructor(props){
        super(props);
        this.onChangeSepal_length = this.onChangeSepal_length.bind(this);
        this.onChangeSepal_width = this.onChangeSepal_width.bind(this);
        this.onChangePetal_length = this.onChangePetal_length.bind(this);
        this.onChangePetal_width = this.onChangePetal_width.bind(this);
        this.onChangeCategory=this.onChangeCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            sepal_length: '5.4',
            sepal_width: '3.9',
            petal_length: '1.7',
            petal_width:'0.4',
            category: 'dont know'
        }
    }

    componentDidMount() {
    }

    onSubmit(e) {
        e.preventDefault();

        const cf= {
            sepal_length:this.state.sepal_length,
            sepal_width:this.state.sepal_width,
            petal_length:this.state.petal_length,
            petal_width:this.state.petal_width,
        };
        const queryParams = `?sepal_length=${cf.sepal_length}`
            + `&sepal_width=${cf.sepal_width}`
            + `&petal_length=${cf.petal_length}`
            + `&petal_width=${cf.petal_width}`
        console.log(cf);
        axios.get('http://localhost:5000/iriss/predict' + queryParams
        )
            .then(res => {
                console.log(res.data);
                this.setState({
                    category:res.data
                });
            });
            
    }

    onChangeSepal_length(e) {
        this.setState({
            sepal_length:e.target.value
        });
    }
    onChangeSepal_width(e) {
        this.setState({
            sepal_width:e.target.value
        });
    }
    onChangePetal_length(e) {
        this.setState({
            petal_length:e.target.value
        });
    }
    onChangePetal_width(e) {
        this.setState({
            petal_width:e.target.value
        });
    }
    onChangeCategory(e) {
        this.setState({
            category:e.target.value
        })
    }
    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="FormFix">
                            <br />
                            <h3>Input Data Of the Iris</h3>
                            <hr></hr>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Sepal Length:</label>
                                    <input type="float"
                                        className="form-control"
                                        min="1.0"
                                        max="10.0"
                                        value={this.state.sepal_length}
                                        onChange={this.onChangeSepal_length}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Sepal Width:</label>
                                    <input type="float"
                                        className="form-control"
                                        min="1.0"
                                        max="10.0"
                                        value={this.state.sepal_width}
                                        onChange={this.onChangeSepal_width}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Petal Length:</label>
                                    <input type="float"
                                        className="form-control"
                                        min="1.0"
                                        max="10.0"
                                        value={this.state.petal_length}
                                        onChange={this.onChangePetal_length}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Petal Width:</label>
                                    <input type="float"
                                        className="form-control"
                                        min="1.0"
                                        max="10.0"
                                        value={this.state.petal_width}
                                        onChange={this.onChangePetal_width}
                                    />
                                </div>
                                
                                <br />
                                <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Query
                            </button>
                            </form>
                            <div className="form-group">
                                <br />
                                    <label>Species:</label>
                                    <input type="text"
                                        className="form-control"
                                        min="1.0"
                                        max="10.0"
                                        value={this.state.category}
                                        onChange={this.onChangeCategory}
                                    />
                                </div>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}