import React from 'react'
//step 1
import { useAuth } from '../../contexts/AuthContext' //gives access to currentUser, login, logout. 
//remember to create the hook encessary to access these below
import {Container, Card} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'


export default function Login() {
    //step 2
    const {login} = useAuth();
    const navigate = useNavigate();

    async function handleAuth() {
        //Await keyword to pause any more code from executing until we get a response back from Firebase
        await login();

        //return the user to a specific location using useNavigate hook from react-router-dom
        return navigate("/")
    }

  return (
    //step 3 - create the ui and use login as needed
    <div className='login'>
        <article className='bg-info mb-5 p-5 text-dark'>
            <h1 className='text-center'>Welcome to ResourcePlus!</h1>
        </article>

        <Container>
            <Card className='m-2 border-dark text-center'>
                <Card.Header className='bg-dark text-white'>
                    <h2>Login for full functionality</h2>
                </Card.Header>
                <Card.Body>
                    <button className='btn btn-success' onClick={() => handleAuth()}>
                        Login w/Github
                    </button>
                </Card.Body>
            </Card>
        </Container>
        {/* <button className='btn btn-success' onClick={() => login()}>Login w/Github</button> */}
    </div>
  )
}
