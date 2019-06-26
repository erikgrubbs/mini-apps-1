

/*----------Components-----------*/
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      id: null,
    }
    this.sendInfo = this.sendInfo.bind(this);
    this.finish = this.finish.bind(this);
  }

  sendInfo(step, info) {
    axios.post('/api', { step, info, id: this.state.id })
      .then(({ data }) => {
        if (this.state.step === 1) {
          this.setState({
            step: step + 1,
            id: data
          });
        } else {
          this.setState({
            step: step + 1
          });
        }
      })
      .catch(() => console.log('error sending info'));
  }


  finish() {
    this.setState({
      step: 0
    });
  }

  render() {
    if (this.state.step === 0) {
      return (
        <div>
          <button onClick={() => this.setState({ step: 1 })}>Purchase</button>
        </div>
      );
    }
    if (this.state.step === 1) {
      return (
        <StepOne sendInfo={this.sendInfo} id={this.state.id} />
      );
    }
    if (this.state.step === 2) {
      return (
        <StepTwo sendInfo={this.sendInfo} id={this.state.id} />
      );
    }
    if (this.state.step === 3) {
      return (
        <StepThree sendInfo={this.sendInfo} id={this.state.id} />
      );
    }
    if (this.state.step === 4) {
      return (
        <Finished finish={this.finish} id={this.state.id} />
      );
    }
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////

class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;
    this.setState({
      name: '',
      email: '',
      password: ''
    });
    this.props.sendInfo(1, { name, email, password });
  }



  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4> Enter Customer Info</h4>
        <label>Enter Name</label>
        <input type="text" name="name" onChange={this.handleChange} value={this.state.name}></input>
        <label>Enter E-mail</label>
        <input type="text" name="email" onChange={this.handleChange} value={this.state.email}></input>
        <label>Enter Password</label>
        <input type="text" name="password" onChange={this.handleChange} value={this.state.password}></input>
        <button>Next</button>
      </form>
    )
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: null,
      phoneNumber: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const line1 = this.state.line1;
    const line2 = this.state.line2;
    const city = this.state.city;
    const state = this.state.state;
    const zip = this.state.zip;
    const phoneNumber = this.state.phoneNumber;
    this.setState({
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: null,
      phoneNumber: ''
    });
    const address = {
      line1,
      line2,
      city,
      state,
      zip
    };
    this.props.sendInfo(2, { address, phoneNumber });
  }



  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Enter Address</h4>
        <label>Enter Line 1</label>
        <input type="text" name="line1" onChange={this.handleChange} value={this.state.name}></input>
        <label>Enter Line 2</label>
        <input type="text" name="line2" onChange={this.handleChange} value={this.state.email}></input>
        <label>Enter City</label>
        <input type="text" name="city" onChange={this.handleChange} value={this.state.password}></input>
        <label>Enter State</label>
        <input type="text" name="state" onChange={this.handleChange} value={this.state.password}></input>
        <label>Enter Zip</label>
        <input type="text" name="zip" onChange={this.handleChange} value={this.state.password}></input>
        <h5>Contact</h5>
        <label>Enter Phone Number</label>
        <input type="text" name="phoneNumber" onChange={this.handleChange} value={this.state.password}></input>
        <button>Next</button>
      </form>
    )
  }
}




///////////////////////////////////////////////////////////////////////////////////////////////////////

class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ccn: '',
      cvv: null,
      billingZip: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const ccn = this.state.ccn;
    const cvv = this.state.cvv;
    const billingZip = this.state.billingZip;
    this.setState({
      ccn: '',
      cvv: null,
      billingZip: null
    });
    this.props.sendInfo(3, { ccn, cvv, billingZip });
  }



  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4> Purchase Info</h4>
        <label>Enter Credit Card</label>
        <input type="text" name="ccn" onChange={this.handleChange} value={this.state.name}></input>
        <label>Enter Cvv</label>
        <input type="text" name="cvv" onChange={this.handleChange} value={this.state.email}></input>
        <label>Enter Billing Zip</label>
        <input type="text" name="billingZip" onChange={this.handleChange} value={this.state.password}></input>
        <button>Review</button>
      </form>
    )
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////

class Finished extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
      loaded:false
    }
    this.showInfo = this.showInfo.bind(this);
    this.showInfo();
  }
  

  showInfo() {
    axios.get('/api', {params: {id: this.props.id}})
      .then(({ data }) => {
        this.setState({
          customer: data,
          loaded: true
        })
      });
  }



  render() {
    return this.state.loaded ? 
      (
      <div>
        <h4>Customer Info</h4>
        <p>Name: {this.state.customer.name}<br></br>
          Email: {this.state.customer.email}<br></br>
          Address Line 1: {this.state.customer.addressLine1}<br></br>
          Address Line 2: {this.state.customer.addressLine2}<br></br>
          City: {this.state.customer.city}<br></br>
          State: {this.state.customer.state}<br></br>
          Zip: {this.state.customer.zip}<br></br>
          Phone: {this.state.customer.phoneNumber}<br></br>
          Credit Card: {this.state.customer.ccn}<br></br>
          CVV: {this.state.customer.cvv}<br></br>
          Billing Zip: {this.state.customer.billingZip}<br></br>
          <button onClick={this.props.finish}>Confirm Purchase</button>
        </p>
      </div>
    ) : <div>loading</div>
  }
}

/*-------Starting----------*/
ReactDOM.render(<App />, document.getElementById('app'));
