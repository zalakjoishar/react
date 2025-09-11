import { render , screen } from '@testing-library/react'
import {expect, test} from 'vitest'
import Student from './components/Student'

test("test for student list",()=>{
    render(<Student/>)
    const li=screen.getAllByRole("listitem")
    expect(li).toHaveLength(4)
})