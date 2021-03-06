import React, { createRef, Fragment, useState } from 'react'
import { Collapse } from 'react-collapse';
import { Button, CardBody, Card, ButtonGroup } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// ES6


interface Props {
  info:any
  id: string
  update: (data:any, i:string) => void
  selected: (compName:string, open:boolean) => void
  world:any
  copy: (data:any, i:string, t:string) => void
  // isMenuOpenFn: (b:boolean) => boolean
  // isMenuOpen?: boolean
}
// "presentround1": {
//     "name": "present_round",
//     "pos": [11.5, 2.0],
//     "bodytype": "static",
//     "density": 0.0,
//     "friction": 0.6,
//     "restitution": 0.1,
//     "texture": "present_round",
//     "space": 1
//   },

const Round : React.FC<Props> = ({info, update, selected, id, copy, world}) => {

  //update is a prop for updating in App the state, passes through ItemDashboard first
  const [isOpen, setIsOpen] = useState(false);
  const {name, pos, friction, restitution, texture, space, bodytype, density} = info

  let nameState = name
  let posState= pos
  let bodytypeState = bodytype
  let densityState = density
  let frictionState = friction
  let restitutionState = restitution
  let textureState = texture
  let spaceState = space

  let gameCoordToPx = (gc:Array<number>) => {
    return [gc[0] * 1000 / world.bounds[0], gc[1] * 600 / world.bounds[1]]
  }
  let convertedPos = gameCoordToPx(pos)
  let updatedState = () => {
    return {
      name:nameState,
      pos:posState,
      bodytype:bodytypeState,
      density:densityState,
      friction:frictionState,
      restitution:restitutionState,
      texture:textureState,
      space:spaceState
    }
  }
  let time = (space:number) => {
    if(space === 1){
      return "present"
    }else if(space === 2){
      return "past"
    }
    return "both"
  }
  const toggle = () => { //for toggling hiding the menu
    setIsOpen(!isOpen);
    selected('world', isOpen);
  };
  return (
    <div >
      <ButtonGroup style = {{width: '100%'}}>
        <Button color="primary" onClick = {toggle} id="world" style={{ backgroundColor: '#ad42f5', marginBottom: '1rem' }}>{id}</Button>
        <Button color="success" onClick = {() => copy(updatedState(), time(spaceState) + "_round",'round')} style = {{marginBottom: '1rem'}}>Copy</Button>
        <Button color="danger" onClick = {() => update('delete', id)} id="delete" style={{ marginBottom: '1rem' }}>X</Button>
      </ButtonGroup>
      <Collapse isOpened={isOpen}>
      <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Name</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{nameState = e.target.value; update(updatedState(), id)}} defaultValue = {name}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Position</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{posState =[+e.target.value,posState[1]]; update(updatedState(), id)}} defaultValue = {info.pos[0]}/>
            <Input onBlur={(e) =>{posState =[posState[0],+e.target.value]; update(updatedState(), id)}} defaultValue = {pos[1]}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Texture</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{textureState = e.target.value; update(updatedState(), id)}} defaultValue = {texture}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Density</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{densityState = +e.target.value; update(updatedState(), id)}} defaultValue = {density}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Body Type</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{bodytypeState = e.target.value; update(updatedState(), id)}} defaultValue = {bodytype}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Friction</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{frictionState = +e.target.value; update(updatedState(), id)}} defaultValue = {friction}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Restitution</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{restitutionState = +e.target.value; update(updatedState(), id)}} defaultValue = {restitution}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Space</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{spaceState = +e.target.value; update(updatedState(), id)}} defaultValue = {space}/>
        </InputGroup>
        <div style = {{display: isOpen ? 'block': 'none',height:'90px', width: '90px', backgroundColor:'yellow', opacity: '50%', position:'absolute', left:convertedPos[0], bottom:convertedPos[1]}}></div>
      </Collapse>
    </div>
  );
}

export default Round;
