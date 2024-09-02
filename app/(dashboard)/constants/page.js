'use client';

import React, { useState, useEffect } from 'react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { deleteData, getData, createData, updateData } from '@/utilities/axios';
import Spinner from '@/components/spinner/Spinner';
import RenderRows from '@/components/dashboard/RenderRows';
import { toast } from 'sonner';

export default function Constants() {
    const [constants, setConstants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingState, setEditingState] = useState({});

    const fetchApiData = async () => {
        const data = await getData('/api/v1/dashboard/constants');

        setConstants(data.data);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);

        fetchApiData();
    }, []);

    const handleEditClick = (id, value) => {
        setEditingState({
            ...editingState,
            [id]: { isEditing: true, value },
        });
    };

    const handleDeleteClick = async (id) => {
        const deletePromise = deleteData('/api/v1/dashboard/constants/', id);

        toast.promise(deletePromise, {
            loading: 'Deleting...',
            success: (result) => {
                // Check if the delete operation was successful
                if (result.success) {
                    return result.message;
                } else {
                    throw new Error(result.message);
                }
            },
            error: 'An error occurred while deleting the item.',
        });

        try {
            const result = await deletePromise;
            if (result.success) {
                await fetchApiData();
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleSaveClick = async (id) => {
        const newValue = editingState[id].value;
        const newName = editingState[id].name; // Assuming you also manage names
        const newDescription = editingState[id].description; // Assuming descriptions are also editable

        const savePromise = updateData(`/api/v1/dashboard/constants/${id}`, {
            value: newValue,
            name: newName,
            description: newDescription,
        });

        toast.promise(savePromise, {
            loading: 'Saving...',
            success: (result) => {
                // Check if the delete operation was successful
                if (result.success) {
                    return result.message;
                } else {
                    throw new Error(result.message);
                }
            },
            error: 'An error occurred while saving the item.',
        });

        try {
            const result = await savePromise;
            if (result.success) {
                await fetchApiData();

                setEditingState({});
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleResetToDefaultClick = async () => {
        const createDefaultPromise = createData(
            `/api/v1/dashboard/constants`,
            {}
        );

        toast.promise(createDefaultPromise, {
            loading: 'Resetting...',
            success: (result) => {
                // Check if the delete operation was successful
                if (result.success) {
                    return result.message;
                } else {
                    throw new Error(result.message);
                }
            },
            error: 'An error occurred while resetting the values.',
        });

        try {
            const result = await createDefaultPromise;
            if (result.success) {
                await fetchApiData();
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleDeleteAllClick = async () => {
        const deletedPromise = deleteData(`/api/v1/dashboard/constants`, '');

        toast.promise(deletedPromise, {
            loading: 'Deleting...',
            success: (result) => {
                // Check if the delete operation was successful
                if (result.success) {
                    return result.message;
                } else {
                    throw new Error(result.message);
                }
            },
            error: 'An error occurred while Deleting the values.',
        });

        try {
            const result = await deletedPromise;
            if (result.success) {
                setConstants([]);

                await fetchApiData();
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleCancelClick = (id) => {
        setEditingState({
            ...editingState,
            [id]: { isEditing: false },
        });
    };

    const handleInputChange = (id, newValue) => {
        setEditingState({
            ...editingState,
            [id]: { ...editingState[id], value: newValue },
        });
    };

    return loading ? (
        <Spinner />
    ) : (
        <div>
            {constants ? (
                <Table>
                    <TableCaption>
                        {constants.length
                            ? 'A list of your used constants variables.'
                            : 'No constants data found.'}
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableCell className="font-medium">Key</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell className="text-right">Action</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <RenderRows
                            constants={constants}
                            editingState={editingState}
                            handleEditClick={handleEditClick}
                            handleDeleteClick={handleDeleteClick}
                            handleSaveClick={handleSaveClick}
                            handleCancelClick={handleCancelClick}
                            handleInputChange={handleInputChange}
                        />
                    </TableBody>
                </Table>
            ) : (
                <p>No data </p>
            )}

            <div className="flex items-center gap-4">
                <Button
                    size="xs"
                    className="text-xs p-1.5 px-2"
                    onClick={() => handleResetToDefaultClick()}
                >
                    Reset to default
                </Button>

                <Button
                    variant="destructive"
                    size="xs"
                    className="text-xs p-1.5 px-2"
                    onClick={() => handleDeleteAllClick()}
                >
                    Delete All
                </Button>
            </div>
        </div>
    );
}
