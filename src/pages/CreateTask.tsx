
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Stack, Typography, Paper } from '@mui/material';

interface TaskFormInputs {
  title: string;
  body: string;
}

export const CreateTask = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<TaskFormInputs>({
      defaultValues: { title: '', body: '' }
    });

    const onSubmit = (data: TaskFormInputs) => {
      alert(JSON.stringify(data, null, 2));
      reset();
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
            <Typography variant='h5' gutterBottom> Create New Task</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: "Required title" }}
                        render={({ field }) => (
                            <TextField 
                                {...field}
                                label="Title"  
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                        )}        
                    />

                    <Controller
                        name='body'
                        control={control}
                        rules={{ required: "Required description" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                multiline
                                rows={4}
                                error={!!errors.body}
                                helperText={errors.body?.message}
                            />
                        )}
                    />

                    <Button variant='contained' type='submit'> Save </Button>
                </Stack>
            </form>
        </Paper>
    );
};