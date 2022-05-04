/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Container, Table, Button } from 'react-bootstrap'
import { completingAgenda } from '../../Redux/Actions/agendaActions'
import './Home.css'

export const Home = ({ agendaState, completingAgenda }) => {
  const currentDate = moment().format('LL')

  const [agendas, setAgendas] = useState(null)
  const [sortBy, setSortBy] = useState({ by: 'Priority', ascending: true })

  function handleCompletingAgenda(index) {
    return completingAgenda(index)
  }

  function handleChangeSort(by) {
    setSortBy((prev) => {
      if (by === prev.by) {
        return {
          by,
          ascending: !prev.ascending
        }
      }
      return {
        by,
        ascending: true
      }
    })
  }

  useEffect(() => {
    let sortedAgenda = agendaState.agendaLists.sort((a, b) => {
      switch (sortBy.by) {
        case 'Due date':
          let aTime = new Date(a.dueDate).getTime()
          let bTime = new Date(b.dueDate).getTime()

          if (sortBy.ascending) return aTime - bTime
          else return bTime - aTime

        case 'Assignment':
          let aTitle = a.title.toLowerCase()
          let bTitle = b.title.toLowerCase()
          if (sortBy.ascending) {
            if (aTitle > bTitle) return -1
            else return 1
          }
          else {
            if (aTitle > bTitle) return 1
            else return -1
          }

        case 'Priority':
          if (sortBy.ascending) return a.priority.lvl - b.priority.lvl
          else return b.priority.lvl - a.priority.lvl

        default:
          if (sortBy.ascending) return a - b
          else return b - a
      }
    })
    setAgendas(sortedAgenda)
  }, [agendaState?.agendaLists, sortBy])

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
            <td className='col-4'>
              <a onClick={() => handleChangeSort('Assignment')} className={sortBy.by === 'Assignment' ? 'font-weight-bold' : ''}>
                Assignment ⇅
              </a>
            </td>
            <td className='col-3'>
              <a onClick={() => handleChangeSort('Priority')} className={sortBy.by === 'Priority' ? 'font-weight-bold' : ''}>
                Priority ⇅
              </a>
            </td>
            <td className='col-2'>
              <a onClick={() => handleChangeSort('Due date')} className={sortBy.by === 'Due date' ? 'font-weight-bold' : ''}>
                Due date ⇅
              </a>
            </td>
            <td className='col-3'>
              Actions
            </td>
          </tr>
        </thead>
        {
          !!agendas ?
            <tbody>
              {
                agendas.map((a, index) => {
                  return (
                    <tr key={index}>
                      <td className='col-4'>{a.title}</td>
                      <td className={`col-3 text-center ${getLvl(a.priority.lvl)}`}>{a.priority.name}</td>
                      <td className='col-2 text-center'>{moment(a.dueDate).format('LL')}</td>
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