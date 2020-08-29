import React, { Component } from 'react'
import _ from 'lodash'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux';

// var source = _.times(5, () => ({
//     title: 'casa',
//     description: 'mesa',
//     image: null,
//     price: 44,
//   }))


var source = [];

var initialState = { isLoading: false, results: [], value: '' }

 class TestSearch extends Component {

    constructor(props){
        super(props)
    }

    

    componentDidUpdate(previousProps, previousState){
        if (previousProps.radios !== this.props.radios){
            source = []
            this.props.radios.map(function(radio){
                source.push({
                    title: radio.name,
                    description: radio.city,
                    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/maz/128.jpg',
                    price: 44,
                })
            })

        }   
        
    }

  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={400}>
          <Search
            fluid
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
          />
        </Grid.Column>
        {/* <Grid.Column width={10}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
            <Header>Options</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(source, null, 2)}
            </pre>
          </Segment>
        </Grid.Column> */}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        radios: state.radiosReducer.radios,
        // audios: state.radiosReducer.audios,
        radiosSearched: state.radiosReducer.radiosSearched
    }
}


export default connect(mapStateToProps)(TestSearch)
