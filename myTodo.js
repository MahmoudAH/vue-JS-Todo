var filters={
		all(todos){
			return todos;

		},
		active(todos){
			return todos.filter(function(todo){
				return !todo.completed;
			});

		},
		completed(todos){
			return todos.filter(function(todo){
				return todo.completed;
			});

		},

	};
	var todos_storage=
	{
		fetchTodos(){
			var todos=JSON.parse(localStorage.getItem('todos') || '[]');
			return todos;
		},
		saveTodos(todos){
			localStorage.setItem('todos',JSON.stringify(todos));

		}
	};
new Vue({
	
	el:".todoapp",
	data:{
		newTodo:'',
		visability:'all',
		editingTodo:null,
		oldValue:'',
		todos:todos_storage.fetchTodos()

	},
	computed:{
		filteredTodos(){
			return filters [this.visability](this.todos);
		},
		remainingItems(){
			return filters.active(this.todos).length;
		},
		remainingText(){
			if( filters.active(this.todos).length > 1 )
				return 'items';
			return 'item';

		},
		markTodos:{
			get(){
			return this.remainingItems === 0;
		},
		    set(value){
             this.todos.forEach(function(todo){
             	todo.completed=value;
             })
		    }
		}
		

	},
	methods:{
  		deleteTodo(todo){
  			this.todos.splice(this.todos.indexOf(todo),1);

		},
		addTodo(){
			this.todos.push({
				title:this.newTodo,
				completed:false
			});
			this.newTodo=''

		},
		clearCompleted(){
           this.todos= filters.active(this.todos);
		},
		editTodo(todo){
			 this.editingTodo=todo;
			 this.oldValue=todo.title;
		},
		finishEditing(){
			if (this.editingTodo.title==''){
				this.deleteTodo(this.editingTodo)
			};
			this.editingTodo=null;
		},
		cancelEditing(){
			this.editingTodo.title=this.oldValue;
			this.editingTodo=null;
		
		},

	},
	watch:{
			todos:{
				handler(todos){
					//console.log(todos);
					todos_storage.saveTodos(todos);
				},
				deep:true
			}
		}
});