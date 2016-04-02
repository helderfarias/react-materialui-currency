# react-materialui-currency
Currency TextField for Material-UI

### Install
```nodejs
npm install --save react react-dom material-ui react-tap-event-plugin
npm install --save git+https://github.com/helderfarias/react-materialui-currency.git
```

### Using
```javascript
import React, { Component } from 'react';
import CurrencyField from 'react-materialui-currency';

class Home extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <CurrencyField style={styles.input} 
                            hintText="Name" 
                            underlineShow={false}
                            precision={2}
                            separator=','
                            delimiter='.'
                            unit='R$'
                            onChange={(raw, display) => {
                                this.setState({});
                            }}/>        
        );
    }
    
}
```
