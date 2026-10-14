import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTodoStore = create(
    persist (
        (set)=> ({
     todos: [],
      filter :"All",
    
    

    addTodo : (text) => set ((state) => ({
        todos : [...state.todos , {id : Date.now() , text , completed : false}]
    })),


toggleTodo : (id) => set((state) => 
    ({todos : state.todos.map ((todo) => todo.id ===id ? {...todo , completed : !todo.completed} : todo)})

),


editTodo : (id , newText)=> set ((state)=>({
    todos: state.todos.map((todo)=> todo.id === id ? {...todo , text:newText} : todo),
})),



deleteTodo : (id) => set ((state) => ({ 
    todos : state.todos.filter ((todo) =>  todo.id !==id ),
})),

setFilter : (newFilter) => set ({filter : newFilter}),

clearCompleted : () => set ((state) => ({
    todos : state.todos.filter ((todo) => !todo.completed),
})),
}),

{
    name : "todo-app-storage",

}
)
);





