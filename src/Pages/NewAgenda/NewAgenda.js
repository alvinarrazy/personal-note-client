import React from 'react'
import { connect } from 'react-redux'
import { Spinner, Container, Card, Button, InputGroup, FormControl, Form, Dropdown, DropdownButton } from 'react-bootstrap'
import moment from 'moment'
import { ModalComp } from '../../Components'
import './NewAgenda.css'
import { addNewAgenda } from '../../Redux/Actions/agendaActions'

export const NewAgenda = ({ addNewAgenda, agendaState }) => {
  const currentDate = moment().format('LL')
  const [input, setInput] = React.useState({
    title: '',
    priority: {
      name: 'How important is this?',
      lvl: -1
    },
    dueDate: new Date()
  })

  const [modalMessage, setModalMessage] = React.useState(null)

  function handleOnChange(target) {
    const { value, name } = target
    setInput({
      ...input,
      [name]: value
    })
  }

  function handleSubmit() {
    if (!!input.title?.length === false) return setModalMessage('Fill all the data!')
    if (input.priority?.lvl <= 0) return setModalMessage('Fill all the data!')

    addNewAgenda(input)
  }

  function getPriority() {
    const priorityLvls = [
      {
        name: 'Important',
        lvl: 3
      },
      {
        name: 'Medium',
        lvl: 2
      },
      {
        name: 'Meh',
        lvl: 1
      }
    ]

    return (
      priorityLvls.map(p => {
        return (
          <Dropdown.Item
            key={p.lvl}
            onClick={() => {
              setInput({
                ...input,
                priority: {
                  name: p.name,
                  lvl: p.lvl
                }
              })
            }}
          >{p.name}</Dropdown.Item>
        )
      })
    )
  }

  console.log(agendaState.agendaLists)

  return (
    <Container className='p-4 new-agenda-container'>
      <ModalComp size={'md'} show={!!modalMessage} handleClose={() => setModalMessage(null)}>
        <p>{modalMessage}</p>
      </ModalComp>

      <Card className="">
        <Card.Header>Add new assignment</Card.Header>
        <Card.Body>
          <Card.Title>Assignment Title</Card.Title>
          <InputGroup className="mb-3">
            <FormControl
              name='title'
              placeholder="Insert your assignment title here!"
              onChange={(e) => handleOnChange(e.target)}
            />
          </InputGroup>

          <Card.Title>Priority</Card.Title>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              title={input.priority.name}
              id="input-group-dropdown-1"
            >
              {getPriority()}
            </DropdownButton>
          </InputGroup>

          <Card.Title>Due date</Card.Title>
          <InputGroup className="mb-3">
            <Form.Control type="date" name='dueDate' onChange={(e) => handleOnChange(e.target)} />
          </InputGroup>

          <Button disabled={agendaState.agendaAdding} className='float-right' variant="primary" onClick={() => handleSubmit()}>Add assignment</Button>
        </Card.Body>
        <Card.Footer className="text-muted">Current date: {currentDate}</Card.Footer>
      </Card>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  agendaState: state.agendaState
})

const mapDispatchToProps = (dispatch) => {
  return {
    addNewAgenda: (agenda) => dispatch(addNewAgenda(agenda))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAgenda)