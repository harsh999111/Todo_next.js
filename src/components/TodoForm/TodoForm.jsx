/* eslint-disable react/jsx-no-undef */
import React,{forwardRef,memo} from 'react'
import PropTypes from 'prop-types'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const TodoForm = ({addTodo},ref) => {
    console.log("todoform");
  return (
    <form
    className="flex w-full max-w-sm items-center"
    onSubmit={addTodo}
  >
    <Input ref={ref} className="rounded-r-none" required />
    <Button type="submit" className="rounded-l-none">
      Add
    </Button>
  </form>
  )
}

TodoForm.prototype ={
    addTodo:PropTypes.func.isRequired,
}

export default memo(forwardRef(TodoForm));