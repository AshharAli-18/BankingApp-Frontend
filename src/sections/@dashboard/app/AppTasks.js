import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  Card,
  Stack,
  Divider,
  Popover,
  Checkbox,
  MenuItem,
  IconButton,
  CardHeader,
  FormControlLabel,
  TextField,
  Button,
} from '@mui/material';
import Iconify from '../../../components/iconify';

AppTasks.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function AppTasks({ title, subheader }) {
  
  const { control } = useForm({
    defaultValues: {
      taskCompleted: [],
    },
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  

  
  const [newTaskInput, setNewTaskInput] = useState('');
  const [isAddTaskPopupOpen, setIsAddTaskPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 4;

  const handleAddTask = () => {
    const newTask = { id: (tasks.length + 1).toString(), label: newTaskInput };
    setTasks([...tasks, newTask]);
    setNewTaskInput('');
    setIsAddTaskPopupOpen(false);
  };

  const handleEditTask = (taskId, newLabel) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, label: newLabel };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, Math.ceil(tasks.length / tasksPerPage)));
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <AddBoxIcon
          className='text-blue-500 mt-2  '
          onClick={() => setIsAddTaskPopupOpen(true)}
          sx={{
            fontSize: '24px',
            width: '40px',
            height: '40px',
            marginRight: '20px',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.5)',
              cursor: 'pointer',
            },
          }}
        />
        
        }
      />
      <Stack p={2}>
        {/* Space above the task list */}
        
        <Controller
          name="taskCompleted"
          control={control}
          render={({ field }) => (
            <>
              {currentTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  checked={field.value.includes(task.id)}
                  onChange={() => {
                    const updatedValue = field.value.includes(task.id)
                      ? field.value.filter(value => value !== task.id)
                      : [...field.value, task.id];
                    field.onChange(updatedValue);
                  }}
                  onEdit={newLabel => handleEditTask(task.id, newLabel)}
                  onDelete={() => handleDeleteTask(task.id)}
                />
              ))}
            </>
          )}
        />
      </Stack>
      <Popover
        open={isAddTaskPopupOpen}
        onClose={() => setIsAddTaskPopupOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Stack p={2} spacing={2}>
          <TextField
            label="New Task"
            variant="outlined"
            value={newTaskInput}
            onChange={e => setNewTaskInput(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddTask} className='bg-blue-500'>Add Task</Button>
        </Stack>
      </Popover>
      <Stack direction="row" justifyContent="space-between" p={2} style={{ marginTop: '-20px', marginLeft: '20px', marginRight: '20px' }}>
  <IconButton onClick={handlePrevPage} disabled={currentPage === 1}>
    <ArrowBackIosIcon />
  </IconButton>
  <IconButton onClick={handleNextPage} disabled={indexOfLastTask >= tasks.length}>
    <ArrowForwardIosIcon/>
  </IconButton>
</Stack>

    </Card>
  );
}



AppTasks.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};

function TaskItem({ task, checked, onChange, onEdit, onDelete }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    const newLabel = prompt('Enter new label for the task:', task.label);
    if (newLabel !== null) {
      onEdit(newLabel);
    }

   

  };

  const handleDelete = () => {
    handleCloseMenu();
    onDelete();
  };

  return (
    <Stack
      direction="row"
      sx={{
        px: 2,
        py: 0.75,
        ...(checked && {
          color: 'text.disabled',
          textDecoration: 'line-through',
        }),
      }}
    >
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} />}
        label={task.label}
        sx={{ flexGrow: 1, m: 0 }}
      />

      <IconButton size="large" color="inherit" sx={{ opacity: 0.48 }} onClick={handleOpenMenu}>
        <Iconify icon={'eva:more-vertical-fill'} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      
    </Stack>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  task: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }),
};
