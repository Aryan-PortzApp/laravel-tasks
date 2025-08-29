import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import Errors from '../Components/Errors';

export default function Tasks({ tasks, elapsed, errors }) {
    const { data, setData, post, delete: destroy, processing } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/task', {
            onSuccess: () => {
                setData({ name: '', description: '' });
            },
        });
    };

    const handleDelete = (taskId) => {
        destroy(`/task/${taskId}`);
    };

    return (
        <AppLayout>
            <Head title="Tasks" />
            
            <div className="container">
                <div className="col-sm-offset-2 col-sm-8">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            New Task
                        </div>

                        <div className="panel-body">
                            <Errors errors={errors} />

                            <form onSubmit={handleSubmit} className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="task-name" className="col-sm-3 control-label">Task</label>
                                    <div className="col-sm-6">
                                        <input
                                            type="text"
                                            id="task-name"
                                            className="form-control"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="task-description" className="col-sm-3 control-label">Description</label>
                                    <div className="col-sm-6">
                                        <textarea
                                            id="task-description"
                                            className="form-control"
                                            rows="3"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-sm-offset-3 col-sm-6">
                                        <button type="submit" className="btn btn-default" disabled={processing}>
                                            <i className="fa fa-btn fa-plus"></i>Add Task
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {tasks && tasks.length > 0 && (
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Current Tasks
                            </div>

                            <div className="panel-body">
                                <table className="table table-striped task-table">
                                    <thead>
                                        <tr>
                                            <th>Task</th>
                                            <th>Description</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map((task) => (
                                            <tr key={task.id}>
                                                <td className="table-text">
                                                    <div>{task.name}</div>
                                                </td>
                                                <td className="table-text">
                                                    <div>{task.description}</div>
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(task.id)}
                                                    >
                                                        <i className="fa fa-btn fa-trash"></i>Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    <div className="panel panel-default">
                        <div className="panel-body">
                            Response time: {elapsed * 1000} milliseconds.
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}