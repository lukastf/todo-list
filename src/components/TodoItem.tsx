import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type Todo } from './types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 'auto',
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`bg-gray-50 rounded-lg p-3 ${isDragging ? 'shadow-lg' : 'shadow'}`}
    >
      <div className="flex items-center">
        <button
          {...attributes}
          {...listeners}
          className="mr-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
          aria-label="Mover item"
        >
          ☰
        </button>
        
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
        />
        
        <span
          className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
        >
          {todo.text}
        </span>
        
        <button
          onClick={() => onDelete(todo.id)}
          className="ml-2 text-red-500 hover:text-red-700"
          aria-label="Remover item"
        >
          ×
        </button>
      </div>
    </li>
  );
};