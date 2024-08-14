"use client";
import { useEffect, useState } from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

interface SupportTicket {
    id: number;
    email: string;
    supportType: string;
    description: string;
    createdAt: string;
    status: 'Open' | 'InProgress' | 'Closed';
}

const AdminDashboard = () => {
    const [tickets, setTickets] = useState<SupportTicket[]>([]);

    useEffect(() => {
        const fetchTickets = async () => {
            const res = await fetch('/api/support');
            const data: SupportTicket[] = await res.json();

            // Custom sorting function
            const sortedTickets = data.sort((a, b) => {
                const statusOrder = { Open: 0, InProgress: 1, Closed: 2 };
                const statusDifference = statusOrder[a.status] - statusOrder[b.status];
                
                if (statusDifference !== 0) {
                    return statusDifference;
                } else {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                }
            });

            setTickets(sortedTickets);
        };

        fetchTickets();
    }, []);

    const handleStatusChange = async (id: number, status: 'Open' | 'InProgress' | 'Closed') => {
        await fetch(`/api/support/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
    
        // Refresh tickets after status change
        const updatedTickets = tickets.map(ticket =>
            ticket.id === id ? { ...ticket, status } : ticket
        );
    
        // Re-sort the tickets after status change
        const sortedTickets = updatedTickets.sort((a, b) => {
            const statusOrder = { Open: 0, InProgress: 1, Closed: 2 };
            const statusDifference = statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
            
            if (statusDifference !== 0) {
                return statusDifference;
            } else {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
        });
    
        setTickets(sortedTickets);
    };

    return (
        <main className="bg-zinc-900 min-h-screen text-white">
            <MaxWidthWrapper className="py-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-zinc-800 border border-gray-700 rounded-lg">
                        <thead className="bg-zinc-700 text-left">
                            <tr>
                                <th className="py-3 px-4 border-b">Email</th>
                                <th className="py-3 px-4 border-b">Support Type</th>
                                <th className="py-3 px-4 border-b">Description</th>
                                <th className="py-3 px-4 border-b">Created At</th>
                                <th className="py-3 px-4 border-b">Status</th>
                                <th className="py-3 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(ticket => (
                                <tr key={ticket.id} className="odd:bg-zinc-900 even:bg-zinc-800">
                                    <td className="py-3 px-4 border-b">{ticket.email}</td>
                                    <td className="py-3 px-4 border-b">{ticket.supportType}</td>
                                    <td className="py-3 px-4 border-b">{ticket.description}</td>
                                    <td className="py-3 px-4 border-b">{new Date(ticket.createdAt).toLocaleString()}</td>
                                    <td className="py-3 px-4 border-b">{ticket.status}</td>
                                    <td className="py-3 px-4 border-b">
                                        <select
                                            value={ticket.status}
                                            onChange={(e) => handleStatusChange(ticket.id, e.target.value as 'Open' | 'InProgress' | 'Closed')}
                                            className="border border-gray-600 bg-zinc-700 text-white rounded px-2 py-1"
                                        >
                                            <option value="Open">Open</option>
                                            <option value="InProgress">In Progress</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </MaxWidthWrapper>
        </main>
    );
};

export default AdminDashboard;
