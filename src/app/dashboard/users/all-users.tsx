'use client';
import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '../table/data-table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import { toast } from 'sonner';

interface User {
  _id: string;
  name: string;
  email: string;
  alias: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt: string;
}
import { ScrollArea } from '@/components/ui/scroll-area';

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string>('');

  // Form states
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    passCode: '',
    alias: '',
    role: 'user' as 'user' | 'admin' | 'moderator',
  });

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    alias: '',
    role: '' as 'user' | 'admin' | 'moderator' | '',
  });

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      const result = await response.json();
      if (result.data) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Create a new user
  const createUser = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('User created successfully');
        fetchUsers();
        // Reset form
        setNewUser({
          name: '',
          email: '',
          passCode: '',
          alias: '',
          role: 'user',
        });
        setIsCreateDialogOpen(false);
        return true;
      } else {
        toast.error(result.message || 'Failed to create user');
        return false;
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
      return false;
    }
  };

  // Update user
  const updateUser = async () => {
    if (!selectedUser) return false;

    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedUser._id,
          ...editForm,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('User updated successfully');
        fetchUsers();
        setIsEditDialogOpen(false);
        return true;
      } else {
        toast.error(result.message || 'Failed to update user');
        return false;
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
      return false;
    }
  };

  // Delete user
  const deleteUser = async (id: string) => {
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        toast.success('User deleted successfully');
        fetchUsers();
        setIsDeleteDialogOpen(false);
      } else {
        const result = await response.json();
        toast.error(result.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  // Handle edit click
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      alias: user.alias,
      role: user.role,
    });
    setIsEditDialogOpen(true);
  };

  // Handle delete click
  const handleDeleteClick = (id: string) => {
    setUserToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Define columns for the data table
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'alias',
      header: 'Alias',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const role = row.original.role;
        let badgeClass = '';

        switch (role) {
          case 'admin':
            badgeClass = 'bg-purple-100 text-purple-800 border border-purple-300';
            break;
          case 'moderator':
            badgeClass = 'bg-blue-100 text-blue-800 border border-blue-300';
            break;
          default:
            badgeClass = 'bg-green-100 text-green-800 border border-green-300';
        }

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center justify-center ${badgeClass}`}
          >
            {role === 'admin' && '👑 '}
            {role === 'moderator' && '🛡️ '}
            {role === 'user' && '👤 '}
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        return new Date(row.original.createdAt).toLocaleDateString();
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-3 justify-center">
          <Button
            variant="outline"
            size="sm"
            className="p-2 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all cursor-pointer"
            onClick={() => handleEditClick(row.original)}
          >
            <FaEdit className="text-sm" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="p-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all cursor-pointer"
            onClick={() => handleDeleteClick(row.original._id)}
          >
            <FaTrash className="text-sm" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>

        <Button
          className="flex cursor-pointer items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md transition-all hover:shadow-lg"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <FaUserPlus className="text-lg" /> Add New User
        </Button>
      </div>

      {loading ? (
        <div className="w-full flex justify-center my-12">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <DataTable columns={columns} data={users} />
      )}

      {/* Create User Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-md mx-auto rounded-lg shadow-xl max-h-[90vh] flex flex-col">
          <DialogHeader className="pb-2 border-b shrink-0">
            <DialogTitle className="text-xl text-center font-bold text-indigo-700">
              Create New User
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[500px] w-full rounded-md p-4">
            <div className="grid gap-5 py-5  px-1">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  className="border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  placeholder="Enter user's full name"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  className="border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  placeholder="user@example.com"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="passCode" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="passCode"
                  type="password"
                  value={newUser.passCode}
                  onChange={e => setNewUser({ ...newUser, passCode: e.target.value })}
                  className="border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  placeholder="Minimum 8 characters"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="alias" className="text-sm font-medium text-gray-700">
                  Username/Alias
                </label>
                <Input
                  id="alias"
                  value={newUser.alias}
                  onChange={e => setNewUser({ ...newUser, alias: e.target.value })}
                  className="border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  placeholder="Choose a username"
                />
              </div>
              <div className="grid gap-2 bg-white">
                <label htmlFor="role" className="text-sm font-medium text-gray-700">
                  User Role
                </label>
                <Select
                  value={newUser.role}
                  onValueChange={(value: 'user' | 'admin' | 'moderator') =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Regular User</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <div className="py-12" />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="border-t pt-4 gap-3 flex shrink-0 mt-auto">
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              className="flex-1 border-gray-300 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={createUser}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer"
            >
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md mx-auto rounded-lg shadow-xl max-h-[90vh] flex flex-col">
          <DialogHeader className="pb-2 border-b shrink-0">
            <DialogTitle className="text-xl text-center font-bold text-indigo-700">
              Edit User
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[500px] w-full rounded-md p-4">
            <div className="grid gap-5 py-5 px-1">
              <div className="grid gap-2">
                <label htmlFor="edit-name" className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  className="border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  id="edit-email"
                  value={editForm.email}
                  onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                  className="border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-alias" className="text-sm font-medium text-gray-700">
                  Username/Alias
                </label>
                <Input
                  id="edit-alias"
                  value={editForm.alias}
                  onChange={e => setEditForm({ ...editForm, alias: e.target.value })}
                  className="border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-role" className="text-sm font-medium text-gray-700">
                  User Role
                </label>
                <Select
                  value={editForm.role}
                  onValueChange={(value: 'user' | 'admin' | 'moderator') =>
                    setEditForm({ ...editForm, role: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Regular User</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <div className="py-12" />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="border-t pt-4 gap-3 flex shrink-0 mt-auto">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="flex-1 border-gray-300 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={updateUser}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md mx-auto rounded-lg shadow-xl max-h-[90vh] flex flex-col">
          <DialogHeader className="pb-2 border-b shrink-0">
            <DialogTitle className="text-xl text-center font-bold text-red-600">
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center overflow-y-auto">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <FaTrash className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-800">Are you sure?</h3>
            <p className="text-gray-500">
              This action cannot be undone. This will permanently delete the user account.
            </p>
          </div>
          <DialogFooter className="border-t pt-4 gap-3 flex shrink-0 mt-auto">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="flex-1 border-gray-300 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={() => deleteUser(userToDelete)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer"
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllUsers;
