import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        //alert('You Continue!');
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price
        }

        //sending post request to dummy server
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            }).catch(error => {
            console.log(error);
            this.setState({loading: false});
        });

    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (<form>

            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}/>
            ))}
            <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);