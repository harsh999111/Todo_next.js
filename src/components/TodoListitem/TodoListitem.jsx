import React from 'react'
import { Checkbox } from '../ui/checkbox'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '../ui/button';
import PropTypes from 'prop-types'


const TodoListitem = ({item,toggleEvent,deleteTodo}) => {
  return (
    <div className="flex px-4 space-x-4" key={item.id}>
    <Checkbox
        checked={item.isDone}
        onCheckedChange={() => toggleEvent(item)}
    />
    <p className="flex-1">{item.text}</p>
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you absolutely sure Delete ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently
                    delete your account and remove your data from our
                    servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    type="button"
                    onClick={() => deleteTodo(item)}
                >
                    Continue
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</div>
  )
}

TodoListitem.prototype ={
    item:PropTypes.shape({
            id:PropTypes.number.isRequired,
            text:PropTypes.string.isRequired,
            isDone:PropTypes.bool
    }).isRequired,
    toggleEvent:PropTypes.func.isRequired,
    deleteTodo:PropTypes.func.isRequired
}

export default TodoListitem