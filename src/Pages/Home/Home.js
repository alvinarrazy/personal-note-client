import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Container, Table, Button } from 'react-bootstrap'
import { completingAgenda } from '../../Redux/Actions/agendaActions'
import './Home.css'

export const Home = ({ agendaState, completingAgenda }) => {
  const currentDate = moment().format('LL')

  function handleCompletingAgenda(index) {
    return completingAgenda(index)
  }

  function getLvl(lvl) {
    switch (lvl) {
      case 3:
        return 'danger'
      case 2:
        return 'warning'
      case 1:
        return 'success'
      default:
        return 'warning'
    }
  }
  return (
    <Container fluid className='p-4 home-container'>
      <Container className='mt-4'>
        <h1>Assignment list</h1>
        <p className='text-muted'>Current date: {currentDate}</p>
      </Container>
      <Table >
        <thead className='text-center'>
          <tr>
            <td className='col-4'>Assignment</td>
            <td className='col-3'>Priority</td>
            <td className='col-2'>Due date</td>
            <td className='col-3'>Actions</td>
          </tr>
        </thead>
        {
          agendaState?.agendaLists?.length ?
            <tbody>
              {
                agendaState.agendaLists.map((a, index) => {
                  return (
                    <tr key={index}>
                      <td className='col-4'>{a.title}</td>
                      <td className={`col-3 text-center ${getLvl(a.priority.lvl)}`}>{a.priority.name}</td>
                      <td className='col-2 text-center'>{a.dueDate}</td>
                      <td className='col'>
                        <div className='row'>
                          <div className='col d-flex justify-content-center'>
                            <Button
                              onClick={() => handleCompletingAgenda(index)}
                              variant='success'
                            >Done</Button>
                          </div>
                          {/* <div className='col'>
                        <Button variant='danger'>Delete</Button>
                      </div> */}
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
            :
            <tr className='text-muted text-center'>
              <td colSpan={4}>
              No assigment
              </td>
            </tr>
        }
      </Table>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  agendaState: state.agendaState
})

const mapDispatchToProps = (dispatch) => {
  return {
    completingAgenda: (index) => dispatch(completingAgenda(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)