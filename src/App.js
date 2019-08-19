import React from 'react';
import styled from 'styled-components'
import { DiceRoller, DiceRoll } from 'rpg-dice-roller/lib/esm/bundle';

import EnterIcon from "./img/enter.svg";

const notationRegex = DiceRoll.notationPatterns.get('notation');

const Main = styled.section`
  height: 100vh;
`

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25vh;
  
  input{
    padding: 10px 20px;
    font-size: 40px;
    height:  50px;
    width: 500px;
    min-width: 0;
    border: 1px solid rgb(202, 189, 166);
    border-radius: 5px;
    outline: 0;
    
    &.invalid{
      border-color: rgb(202,3,77);
    }
  }
  
  button{
    appearance: none;
    background: transparent url(${EnterIcon}) no-repeat 50% 50%;
    background-size: 40px;
    opacity: .7;
    border: 0;
    height: 72px;
    width: 100px;
    margin-right: -100px;
    text-indent: -999px;
    overflow: hidden;
    
    &:hover{
      opacity: 1;
    }
  }
  
`
const Results = styled.ul`
  list-style: none;
  overflow: scroll;
  padding: 0;
  height: 75vh;
  margin: 0 auto;
  width: 500px;
  
  li:first-child{
   h3{
    font-size: 60px;
   }
  }
`

const Notation = styled.span`
  opacity: .3;
  font-family: monospace;
`
const Total = styled.h3`
  margin-bottom: 0;
`

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentInput: '3d10 + 5',
      inputValid: true,
      rolls: []
    }
    this.roller = new DiceRoller();
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    this.inputRef.current.select()

  }

  setInput = (e) => {
    this.setState({
      currentInput: e.target.value,
      inputValid: notationRegex.test(e.target.value)
    })
  }

  roll = (e) =>{
    console.log(this.state.rolls)
    e.preventDefault()
      this.roller.roll(this.state.currentInput)
      this.inputRef.current.select()

      // get the latest dice rolls from the log
      let latestRoll = this.roller.log.shift();
      // output the latest roll - it has a toString method for nice output when converted to a string
      this.setState({rolls: [latestRoll, ...this.state.rolls]})
    }

  render = () => (
    <Main>
      <Form onSubmit={this.state.inputValid && this.roll}>
        <input className={this.state.inputValid ? 'valid' : 'invalid'} value={this.state.currentInput} ref={this.inputRef} onChange={this.setInput} />
        <button disabled={!this.state.inputValid}>roll</button>
      </Form>
      <Results>{this.state.rolls.map((roll, i) =>(
          <li key={roll.toString() +i}>
            <Total>{roll.total}</Total>
            <Notation>{roll.output}</Notation>
          </li>
      ))}</Results>
    </Main>
  )
}

export default App;
