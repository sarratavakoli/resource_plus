import React from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'

//below items are imported to bring in specific test functions
//first are some tools that allow for shallow rendering tests and cleanup of data after tests.
//second are tools used to make the tests function
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

//each test below will begin with it('string name of the test', function to perform)
it('Button renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button/>, div);
})